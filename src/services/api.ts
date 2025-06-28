
const API_BASE_URL = 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // User Authentication
  static async login(username: string, password: string) {
    return this.request<{ user: any; token: string }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  static async getUsers() {
    return this.request<any[]>('/users');
  }

  static async createUser(userData: any) {
    return this.request<any>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Transport Operations
  static async getTransports() {
    return this.request<any[]>('/transports');
  }

  static async getTransport(id: string) {
    return this.request<any>(`/transports/${id}`);
  }

  static async createTransport(transportData: any) {
    return this.request<any>('/transports', {
      method: 'POST',
      body: JSON.stringify(transportData),
    });
  }

  static async updateTransport(id: string, transportData: any) {
    return this.request<any>(`/transports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transportData),
    });
  }

  static async updateTransportStatus(id: string, status: string) {
    return this.request<any>(`/transports/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  static async deleteTransport(id: string) {
    return this.request<any>(`/transports/${id}`, {
      method: 'DELETE',
    });
  }
}

export default ApiService;
