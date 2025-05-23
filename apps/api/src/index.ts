// apps/api/src/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import usersRoute from './routes/users';

const app = new Hono();

app.use('*', cors()); // Enable CORS for all routes
app.get('/', c => c.text('🟢 API is alive'));
app.route('/users', usersRoute);

export default app;
