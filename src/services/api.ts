
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

class ApiService {
  private static getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // User Authentication & Management
  static async login(username: string, password: string) {
    return this.request<{ user: any; token: string }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  static async getUsers() {
    return this.request<any[]>('/users');
  }

  static async getUserById(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  static async createUser(userData: any) {
    return this.request<any>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static async updateUser(id: string, userData: any) {
    return this.request<any>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  static async deleteUser(id: string) {
    return this.request<any>(`/users/${id}`, {
      method: 'DELETE',
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

  // Depots
  static async getDepots() {
    return this.request<any[]>('/depots');
  }

  static async getDepot(id: string) {
    return this.request<any>(`/depots/${id}`);
  }

  static async createDepot(depotData: any) {
    return this.request<any>('/depots', {
      method: 'POST',
      body: JSON.stringify(depotData),
    });
  }

  static async updateDepot(id: string, depotData: any) {
    return this.request<any>(`/depots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(depotData),
    });
  }

  static async deleteDepot(id: string) {
    return this.request<any>(`/depots/${id}`, {
      method: 'DELETE',
    });
  }

  // Activity Logs
  static async getActivityLogs() {
    return this.request<any[]>('/activityLogs');
  }

  static async createActivityLog(logData: any) {
    return this.request<any>('/activityLogs', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  }

  // Checkpoints
  static async getCheckpoints() {
    return this.request<any[]>('/checkpoints');
  }

  static async createCheckpoint(checkpointData: any) {
    return this.request<any>('/checkpoints', {
      method: 'POST',
      body: JSON.stringify(checkpointData),
    });
  }

  static async updateCheckpoint(id: string, checkpointData: any) {
    return this.request<any>(`/checkpoints/${id}`, {
      method: 'PUT',
      body: JSON.stringify(checkpointData),
    });
  }

  static async deleteCheckpoint(id: string) {
    return this.request<any>(`/checkpoints/${id}`, {
      method: 'DELETE',
    });
  }
}

export default ApiService;
