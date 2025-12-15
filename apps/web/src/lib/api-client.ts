import axios from 'axios';
import { ApiResponse, ChatMessage, Account, SpendingPattern, VisualizationData } from '@bank-app/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiClient = {
  // Authentication
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(email: string, password: string, name: string) {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },

  // Conversation
  async sendMessage(message: string): Promise<ApiResponse<ChatMessage>> {
    const response = await api.post('/conversation/message', { message });
    return response.data;
  },

  async getConversationHistory(): Promise<ApiResponse<ChatMessage[]>> {
    const response = await api.get('/conversation/history');
    return response.data;
  },

  async clearConversation(): Promise<ApiResponse> {
    const response = await api.delete('/conversation/clear');
    return response.data;
  },

  // Accounts
  async getAccounts(): Promise<ApiResponse<Account[]>> {
    const response = await api.get('/accounts');
    return response.data;
  },

  async getAccount(id: string): Promise<ApiResponse<Account>> {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  // Insights
  async getSpendingInsights(
    period: string
  ): Promise<ApiResponse<{ patterns: SpendingPattern[]; visualization: VisualizationData }>> {
    const response = await api.get('/insights/spending', { params: { period } });
    return response.data;
  },

  async getFinancialHealth(): Promise<ApiResponse> {
    const response = await api.get('/insights/financial-health');
    return response.data;
  },
};
