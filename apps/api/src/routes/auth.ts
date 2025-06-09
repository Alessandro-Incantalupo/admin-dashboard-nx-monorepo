import { Hono } from 'hono';
import { sign } from 'hono/jwt';

const auth = new Hono();

const fakeUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'user@example.com', password: 'user123', role: 'user' },
];

auth.post('/login', async c => {
  const { email, password } = await c.req.json();

  const user = fakeUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const jwtSecret = Bun.env['JWT_SECRET'];
  if (!jwtSecret) {
    console.error('❌ JWT_SECRET is not defined');
    return c.json({ error: 'Server misconfiguration' }, 500);
  }

  // Sign with default algorithm (HS256) and no expiry
  const token = await sign(
    {
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    },
    jwtSecret
  );

  return c.json({ token });
});

export default auth;
