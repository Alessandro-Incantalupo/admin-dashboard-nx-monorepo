// apps/api/src/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import usersRoute from './routes/users';

const app = new Hono();
// Enable CORS for all routes Required so Angular (port 4200) can call API (port 3000)
app.use('*', cors());
app.get('/', c => c.text('🟢 API is alive'));
app.route('/users', usersRoute);

export default app;
