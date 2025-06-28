
export interface Transport {
  id: number;
  unit_number: string;
  driver_id: number;
  depot_id?: number;
  terminal_id?: number;
  destination: string;
  fuel_type: 'gasoline' | 'diesel' | 'kerosene';
  volume: number;
  status: 'pending' | 'in_transit' | 'arrived' | 'unloading' | 'completed' | 'cancelled';
  notes?: string;
  latitude?: number;
  longitude?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTransportData {
  unit_number: string;
  driver_id: number;
  depot_id?: number;
  terminal_id?: number;
  destination: string;
  fuel_type: 'gasoline' | 'diesel' | 'kerosene';
  volume: number;
  status?: 'pending' | 'in_transit' | 'arrived' | 'unloading' | 'completed' | 'cancelled';
  notes?: string;
  latitude?: number;
  longitude?: number;
}
