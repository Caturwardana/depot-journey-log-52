
export interface FuelQuality {
  id: number;
  transport_id: number;
  octane_rating?: number;
  density: number;
  temperature: number;
  water_content: number;
  sulfur_content: number;
  test_date: Date;
  tested_by: number;
  status: 'passed' | 'failed' | 'pending';
  notes?: string;
  created_at: Date;
}

export interface CreateFuelQualityData {
  transport_id: number;
  octane_rating?: number;
  density: number;
  temperature: number;
  water_content: number;
  sulfur_content: number;
  test_date?: Date;
  tested_by: number;
  status?: 'passed' | 'failed' | 'pending';
  notes?: string;
}
