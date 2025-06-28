
export interface ActivityLog {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  details?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export interface CreateActivityLogData {
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  details?: string;
  ip_address?: string;
  user_agent?: string;
}
