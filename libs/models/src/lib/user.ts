export const UserRole = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoleType[];
  status: 'active' | 'inactive';
}
export interface UserAuthStore {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive';
}
