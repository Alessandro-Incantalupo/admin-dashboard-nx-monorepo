import { Hono } from 'hono';
import { users } from '../data/users';

const usersRoute = new Hono();

// Note: we're mutating the array from import, which works for now
usersRoute.get('/', c => {
  return c.json({
    data: users,
    message: null,
    code: null,
  });
});

usersRoute.post('/', async c => {
  const body = await c.req.json();
  const newUser = {
    id: crypto.randomUUID(),
    ...body,
  };
  users.push(newUser);
  return c.json(newUser, 201);
});

usersRoute.put('/:id', async c => {
  const id = c.req.param('id');
  const updatedUser = await c.req.json();

  const index = users.findIndex(u => u.id === id);
  if (index === -1) return c.notFound();

  users[index] = { ...users[index], ...updatedUser };
  return c.json(users[index]);
});

usersRoute.delete('/:id', c => {
  const id = c.req.param('id');
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return c.notFound();

  users.splice(index, 1);
  return c.json({ deleted: true });
});

export default usersRoute;
