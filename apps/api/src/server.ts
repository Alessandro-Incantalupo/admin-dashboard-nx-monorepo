import app from './index';

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});
