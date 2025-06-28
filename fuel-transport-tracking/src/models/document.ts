
export interface Document {
  id: number;
  transport_id: number;
  type: 'invoice' | 'receipt' | 'permit' | 'inspection' | 'other';
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_by: number;
  created_at: Date;
}

export interface CreateDocumentData {
  transport_id: number;
  type: 'invoice' | 'receipt' | 'permit' | 'inspection' | 'other';
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_by: number;
}
