import axios from 'axios';

// Configuração base do Baserow
const BASEROW_BASE_URL = 'https://api.baserow.io/api/database/rows/table';
const BASEROW_TOKEN = import.meta.env.VITE_BASEROW_TOKEN;
const DATABASE_ID = import.meta.env.VITE_BASEROW_DATABASE_ID || 178;

// IDs das tabelas
export const TABLE_IDS = {
  USERS: 718,
  INVENTORY_ITEMS: 719,
  REQUESTS: 720,
  REQUEST_ITEMS: 721,
  COST_CENTERS: 722,
  SUPPLIERS: 723,
  TRAININGS: 724,
  DELIVERY_RECORDS: 725,
};

// Configuração do axios
const baserowApi = BASEROW_TOKEN ? axios.create({
  baseURL: BASEROW_BASE_URL,
  headers: {
    'Authorization': `Token ${BASEROW_TOKEN}`,
    'Content-Type': 'application/json',
  },
}) : null;

// Tipos para respostas da API
export interface BaserowResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Funções utilitárias para interagir com o Baserow
export const baserowService = {
  // GET - Buscar dados de uma tabela
  async get<T>(tableId: number, params?: Record<string, any>): Promise<BaserowResponse<T>> {
    if (!baserowApi) {
      // Return mock data when API is not available
      return { count: 0, next: null, previous: null, results: [] };
    }
    try {
      const response = await baserowApi.get(`/${tableId}/?user_field_names=true`, { params });
      return response.data;
    } catch (error) {
      console.warn('Baserow API error, using mock data:', error);
      return { count: 0, next: null, previous: null, results: [] };
    }
  },

  // GET - Buscar um item específico
  async getById<T>(tableId: number, id: string | number): Promise<T> {
    if (!baserowApi) {
      throw new Error('Baserow API not configured');
    }
    try {
      const response = await baserowApi.get(`/${tableId}/${id}/?user_field_names=true`);
      return response.data;
    } catch (error) {
      console.warn('Baserow API error:', error);
      throw error;
    }
  },

  // POST - Criar novo item
  async create<T>(tableId: number, data: Partial<T>): Promise<T> {
    if (!baserowApi) {
      throw new Error('Baserow API not configured');
    }
    try {
      const response = await baserowApi.post(`/${tableId}/?user_field_names=true`, data);
      return response.data;
    } catch (error) {
      console.warn('Baserow API error:', error);
      throw error;
    }
  },

  // PATCH - Atualizar item existente
  async update<T>(tableId: number, id: string | number, data: Partial<T>): Promise<T> {
    if (!baserowApi) {
      throw new Error('Baserow API not configured');
    }
    try {
      const response = await baserowApi.patch(`/${tableId}/${id}/?user_field_names=true`, data);
      return response.data;
    } catch (error) {
      console.warn('Baserow API error:', error);
      throw error;
    }
  },

  // DELETE - Deletar item
  async delete(tableId: number, id: string | number): Promise<void> {
    if (!baserowApi) {
      throw new Error('Baserow API not configured');
    }
    try {
      await baserowApi.delete(`/${tableId}/${id}/`);
    } catch (error) {
      console.warn('Baserow API error:', error);
      throw error;
    }
  },
};
    const response = await baserowApi.get(`/${tableId}/?user_field_names=true`, { params });
    return response.data;
  },

  // GET - Buscar um item específico
  async getById<T>(tableId: number, id: string | number): Promise<T> {
    const response = await baserowApi.get(`/${tableId}/${id}/?user_field_names=true`);
    return response.data;
  },

  // POST - Criar novo item
  async create<T>(tableId: number, data: Partial<T>): Promise<T> {
    const response = await baserowApi.post(`/${tableId}/?user_field_names=true`, data);
    return response.data;
  },

  // PATCH - Atualizar item existente
  async update<T>(tableId: number, id: string | number, data: Partial<T>): Promise<T> {
    const response = await baserowApi.patch(`/${tableId}/${id}/?user_field_names=true`, data);
    return response.data;
  },

  // DELETE - Deletar item
  async delete(tableId: number, id: string | number): Promise<void> {
    await baserowApi.delete(`/${tableId}/${id}/`);
  },
};

// Funções específicas para cada entidade
export const inventoryService = {
  async getAll() {
    return baserowService.get(TABLE_IDS.INVENTORY_ITEMS);
  },

  async create(item: any) {
    return baserowService.create(TABLE_IDS.INVENTORY_ITEMS, item);
  },

  async update(id: string | number, item: any) {
    return baserowService.update(TABLE_IDS.INVENTORY_ITEMS, id, item);
  },

  async delete(id: string | number) {
    return baserowService.delete(TABLE_IDS.INVENTORY_ITEMS, id);
  },
};

export const requestsService = {
  async getAll() {
    return baserowService.get(TABLE_IDS.REQUESTS);
  },

  async getRequestItems(requestId?: string) {
    const params = requestId ? { filter__request_id: requestId } : {};
    return baserowService.get(TABLE_IDS.REQUEST_ITEMS, params);
  },

  async create(request: any) {
    return baserowService.create(TABLE_IDS.REQUESTS, request);
  },

  async update(id: string | number, request: any) {
    return baserowService.update(TABLE_IDS.REQUESTS, id, request);
  },

  async createRequestItem(item: any) {
    return baserowService.create(TABLE_IDS.REQUEST_ITEMS, item);
  },
};

export const trainingsService = {
  async getAll() {
    return baserowService.get(TABLE_IDS.TRAININGS);
  },

  async create(training: any) {
    return baserowService.create(TABLE_IDS.TRAININGS, training);
  },

  async update(id: string | number, training: any) {
    return baserowService.update(TABLE_IDS.TRAININGS, id, training);
  },
};

export const suppliersService = {
  async getAll() {
    return baserowService.get(TABLE_IDS.SUPPLIERS);
  },

  async create(supplier: any) {
    return baserowService.create(TABLE_IDS.SUPPLIERS, supplier);
  },

  async update(id: string | number, supplier: any) {
    return baserowService.update(TABLE_IDS.SUPPLIERS, id, supplier);
  },
};

export const usersService = {
  async getAll() {
    return baserowService.get(TABLE_IDS.USERS);
  },

  async create(user: any) {
    return baserowService.create(TABLE_IDS.USERS, user);
  },

  async update(id: string | number, user: any) {
    return baserowService.update(TABLE_IDS.USERS, id, user);
  },
};

export const costCentersService = {
  async getAll() {
    return baserowService.get(TABLE_IDS.COST_CENTERS);
  },

  async create(costCenter: any) {
    return baserowService.create(TABLE_IDS.COST_CENTERS, costCenter);
  },

  async update(id: string | number, costCenter: any) {
    return baserowService.update(TABLE_IDS.COST_CENTERS, id, costCenter);
  },
};

export const deliveryService = {
  async getAll() {
    return baserowService.get(TABLE_IDS.DELIVERY_RECORDS);
  },

  async create(delivery: any) {
    return baserowService.create(TABLE_IDS.DELIVERY_RECORDS, delivery);
  },
};