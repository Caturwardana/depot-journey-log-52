
export interface Terminal {
  id: number;
  name: string;
  location: string;
  type: 'loading' | 'unloading' | 'both';
  capacity: number;
  operator_id?: number;
  latitude?: number;
  longitude?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTerminalData {
  name: string;
  location: string;
  type: 'loading' | 'unloading' | 'both';
  capacity: number;
  operator_id?: number;
  latitude?: number;
  longitude?: number;
}
