
export interface Checkpoint {
  id: number;
  transport_id: number;
  location: string;
  timestamp: Date;
  status: 'passed' | 'delayed' | 'stopped';
  notes?: string;
  latitude?: number;
  longitude?: number;
  created_at: Date;
}

export interface CreateCheckpointData {
  transport_id: number;
  location: string;
  timestamp?: Date;
  status: 'passed' | 'delayed' | 'stopped';
  notes?: string;
  latitude?: number;
  longitude?: number;
}
