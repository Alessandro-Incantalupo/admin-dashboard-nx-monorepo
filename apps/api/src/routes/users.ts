import { Hono } from 'hono';
import { users } from '../data/users';

const usersRoute = new Hono();

usersRoute.get('/', c => {
  return c.json({
    data: users,
    message: null,
    code: null,
  });
});

export default usersRoute;
