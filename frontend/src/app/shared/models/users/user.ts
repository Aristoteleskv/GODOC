
export interface Role {
  id: number;
  name: string;
  uid: string;
  extend?: number | null;
}

export interface User {
  id?: number;
  user_id: number;
  username: string;
  email: string;
  password: string;
  full_name: string
  img?: string;
  telefone: number;
  role: string;
  active: boolean;
  token?: string[];
}
