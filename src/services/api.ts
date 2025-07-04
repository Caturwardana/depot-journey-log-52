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

  private static getFormDataHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {};
    
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
      console.log(`[API REQUEST] ${config.method || 'GET'} ${url}`, {
        body: config.body,
        headers: config.headers
      });

      const response = await fetch(url, config);
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        // Handle non-JSON responses
        data = { success: false, message: 'Invalid response format' };
      }

      console.log(`[API RESPONSE] ${config.method || 'GET'} ${url} - Status: ${response.status}`, data);

      if (!response.ok) {
        const error = new Error(data.message || `HTTP error! status: ${response.status}`);
        (error as any).response = { data, status: response.status };
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error(`[API ERROR] ${config.method || 'GET'} ${url}`, error);
      
      // Enhance error with response data if available
      if (error.response) {
        throw error;
      }
      
      // Network or other errors
      const enhancedError = new Error(error.message || 'Network error occurred');
      (enhancedError as any).response = { 
        data: { message: error.message || 'Network error occurred' },
        status: 0 
      };
      throw enhancedError;
    }
  }

  private static async uploadRequest<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getFormDataHeaders(),
        body: formData,
      });

      const data = await response.json();

      console.log(`[📤 UPLOAD SUCCESS] POST ${url}`);
      console.log('→ Response:', data);

      if (!response.ok) {
        console.warn(`[❌ UPLOAD WARN] ${url} - Status: ${response.status}`);
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`[🔥 UPLOAD ERROR] POST ${url}`);
      console.error('→ Error:', error);
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

  // Transport Operations - Fixed payload structure
  static async createTransport(transportData: any) {
    // Ensure payload matches backend schema
    const payload = {
      unit_number: transportData.unit_number,
      driver_id: transportData.driver_id,
      depot_id: transportData.depot_id || null,
      terminal_id: transportData.terminal_id || null,
      destination: transportData.destination,
      fuel_type: transportData.fuel_type,
      volume: transportData.volume,
      status: transportData.status || 'pending',
      notes: transportData.notes || null,
      latitude: transportData.latitude || null,
      longitude: transportData.longitude || null
    };

    return this.request<any>('/transports', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static async getTransports() {
    return this.request<any[]>('/transports');
  }

  static async getTransport(id: string) {
    return this.request<any>(`/transports/${id}`);
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

  // Terminals
  static async getTerminals() {
    return this.request<any[]>('/terminals');
  }

  static async getTerminal(id: string) {
    return this.request<any>(`/terminals/${id}`);
  }

  static async createTerminal(terminalData: any) {
    return this.request<any>('/terminals', {
      method: 'POST',
      body: JSON.stringify(terminalData),
    });
  }

  static async updateTerminal(id: string, terminalData: any) {
    return this.request<any>(`/terminals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(terminalData),
    });
  }

  static async deleteTerminal(id: string) {
    return this.request<any>(`/terminals/${id}`, {
      method: 'DELETE',
    });
  }

  // Documents
  static async getDocuments() {
    return this.request<any[]>('/documents');
  }

  static async getDocument(id: string) {
    return this.request<any>(`/documents/${id}`);
  }

  static async uploadDocument(formData: FormData) {
    return this.uploadRequest<any>('/documents/upload', formData);
  }

  static async createDocument(documentData: any) {
    return this.request<any>('/documents', {
      method: 'POST',
      body: JSON.stringify(documentData),
    });
  }

  static async updateDocument(id: string, documentData: any) {
    return this.request<any>(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(documentData),
    });
  }

  static async deleteDocument(id: string) {
    return this.request<any>(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // Flow Meter
  static async getFlowMeters() {
    return this.request<any[]>('/flowmeter');
  }

  static async getFlowMeter(id: string) {
    return this.request<any>(`/flowmeter/${id}`);
  }

  static async createFlowMeter(flowMeterData: any) {
    return this.request<any>('/flowmeter', {
      method: 'POST',
      body: JSON.stringify(flowMeterData),
    });
  }

  static async updateFlowMeter(id: string, flowMeterData: any) {
    return this.request<any>(`/flowmeter/${id}`, {
      method: 'PUT',
      body: JSON.stringify(flowMeterData),
    });
  }

  static async deleteFlowMeter(id: string) {
    return this.request<any>(`/flowmeter/${id}`, {
      method: 'DELETE',
    });
  }

  // Fuel Quality
  static async getFuelQuality() {
    return this.request<any[]>('/fuelquality');
  }

  static async getFuelQualityById(id: string) {
    return this.request<any>(`/fuelquality/${id}`);
  }

  static async createFuelQuality(fuelQualityData: any) {
    return this.request<any>('/fuelquality', {
      method: 'POST',
      body: JSON.stringify(fuelQualityData),
    });
  }

  static async updateFuelQuality(id: string, fuelQualityData: any) {
    return this.request<any>(`/fuelquality/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fuelQualityData),
    });
  }

  static async deleteFuelQuality(id: string) {
    return this.request<any>(`/fuelquality/${id}`, {
      method: 'DELETE',
    });
  }

  // Activity Logs
  static async getActivityLogs() {
    return this.request<any[]>('/activitylogs');
  }

  static async createActivityLog(logData: any) {
    return this.request<any>('/activitylogs', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  }

  // Checkpoints
  static async getCheckpoints() {
    return this.request<any[]>('/checkpoints');
  }

  static async getCheckpoint(id: string) {
    return this.request<any>(`/checkpoints/${id}`);
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

  // Photo/File Upload
  static async uploadPhoto(file: File, transportId: string, type: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('transportId', transportId);
    formData.append('type', type);
    
    return this.uploadRequest<any>('/documents/upload', formData);
  }
}

export default ApiService;
