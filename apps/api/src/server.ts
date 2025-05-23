import app from './index.ts';

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});
