import packageJson from '@root/package.json';

export const APP_INFO = {
  name: 'admin-dashboard',
  version: packageJson.version,
  license: packageJson.license,
  author: 'Alessandro Incantalupo',
};

export function getNextResetMs(intervalMs = 1000 * 60 * 60) {
  const now = Date.now();
  const next = Math.ceil(now / intervalMs) * intervalMs;
  return next - now;
}
