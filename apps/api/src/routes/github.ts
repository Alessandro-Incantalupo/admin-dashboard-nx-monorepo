import { Hono } from 'hono';
import type { GitHubProfile } from '@admin-dashboard-nx-monorepo/models';

const github = new Hono();

github.get('/profile/:username', async c => {
  const username = c.req.param('username');

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'admin-dashboard-nx-monorepo',
        ...(process.env['GITHUB_TOKEN']
          ? { Authorization: `Bearer ${process.env['GITHUB_TOKEN']}` }
          : {}),
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return c.json({ error: 'GitHub user not found' }, 404);
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const profile: GitHubProfile = await response.json();
    return c.json(profile);
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return c.json(
      { error: 'Failed to fetch GitHub profile' },
      500
    );
  }
});

github.get('/profile', async c => {
  return c.json({
    message: 'Please provide a GitHub username: /github/profile/:username',
  });
});

export default github;
