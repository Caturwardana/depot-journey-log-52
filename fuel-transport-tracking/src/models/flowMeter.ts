
export interface FlowMeter {
  id: number;
  terminal_id: number;
  meter_id: string;
  reading: number;
  timestamp: Date;
  operator_id: number;
  fuel_type: 'gasoline' | 'diesel' | 'kerosene';
  created_at: Date;
}

export interface CreateFlowMeterData {
  terminal_id: number;
  meter_id: string;
  reading: number;
  timestamp?: Date;
  operator_id: number;
  fuel_type: 'gasoline' | 'diesel' | 'kerosene';
}
