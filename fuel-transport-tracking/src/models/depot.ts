
export interface Depot {
  id: number;
  name: string;
  location: string;
  capacity: number;
  current_stock: number;
  manager_id?: number;
  latitude?: number;
  longitude?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDepotData {
  name: string;
  location: string;
  capacity: number;
  current_stock?: number;
  manager_id?: number;
  latitude?: number;
  longitude?: number;
}
