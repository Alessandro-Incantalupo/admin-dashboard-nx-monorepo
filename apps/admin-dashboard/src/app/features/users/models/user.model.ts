export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive';
}

export interface UsersResponse {
  data: User[];
  message: string | null;
  code: string | null;
}
