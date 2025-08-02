import { User } from '@admin-dashboard-nx-monorepo/models';
import { getNextResetMs } from '@app-info';
import { Hono } from 'hono';
import { users as usersData } from '../data/users';

const usersRoute = new Hono();

let users: User[] = [...usersData];
const initialUsers: User[] = JSON.parse(JSON.stringify(usersData));

usersRoute.get('/', c => {
  try {
    return c.json({
      data: users,
      message: null,
      code: null,
    });
  } catch (err) {
    return c.json(
      {
        data: null,
        message: 'Failed to fetch users',
        code: 500,
      },
      500
    );
  }
});

usersRoute.post('/', async c => {
  try {
    const body = await c.req.json();
    const newUser = { id: crypto.randomUUID(), ...body };
    users.unshift(newUser);
    return c.json(newUser, 201);
  } catch (err) {
    return c.json({ error: 'Failed to add user' }, 500);
  }
});

usersRoute.put('/:id', async c => {
  try {
    const id = c.req.param('id');
    const updatedUser = await c.req.json();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return c.json({ error: 'User not found' }, 404);
    }
    users[index] = { ...users[index], ...updatedUser };
    return c.json(users[index]);
  } catch (err) {
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

usersRoute.delete('/:id', c => {
  try {
    const id = c.req.param('id');
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return c.json({ error: 'User not found' }, 404);
    }
    users.splice(index, 1);
    return c.json({ deleted: true });
  } catch (err) {
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

usersRoute.post('/reset', c => {
  try {
    users = JSON.parse(JSON.stringify(initialUsers));
    return c.json({ reset: true, users });
  } catch (err) {
    return c.json({ error: 'Failed to reset users' }, 500);
  }
});
// Optional: auto-reset every hour
const intervalMs = 1000 * 60 * 60;

setTimeout(function scheduleReset() {
  users = JSON.parse(JSON.stringify(initialUsers));
  setTimeout(scheduleReset, intervalMs);
}, getNextResetMs());

export default usersRoute;
