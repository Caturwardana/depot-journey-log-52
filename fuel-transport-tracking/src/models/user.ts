
export interface User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  role: 'driver' | 'supervisor' | 'fuelman' | 'glpama' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  username: string;
  password: string;
  fullname: string;
  role: 'driver' | 'supervisor' | 'fuelman' | 'glpama' | 'admin';
}

export interface UpdateUserData {
  username?: string;
  fullname?: string;
  role?: 'driver' | 'supervisor' | 'fuelman' | 'glpama' | 'admin';
}
