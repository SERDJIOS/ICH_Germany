export interface User {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: 'user' | 'admin';
} 