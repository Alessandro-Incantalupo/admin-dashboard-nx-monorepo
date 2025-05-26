import { User } from '@models';

export const users: User[] = [
  {
    id: '1',
    name: 'Alice Developer',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Bob Designer',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
  },
];
