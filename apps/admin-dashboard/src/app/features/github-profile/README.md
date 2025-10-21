# GitHub Profile Feature

This feature allows users to retrieve and display GitHub profile information for any GitHub user.

## Features

- Search for GitHub users by username
- Display profile information including:
  - Avatar
  - Name and username
  - Bio
  - Company and location
  - Public repositories count
  - Followers and following counts
  - Website and social links
- Direct link to view the profile on GitHub

## Backend API

### Endpoint

`GET /github/profile/:username`

### Example Request

```bash
curl http://localhost:3100/github/profile/octocat
```

### Example Response

```json
{
  "login": "octocat",
  "name": "The Octocat",
  "avatar_url": "https://avatars.githubusercontent.com/u/583231",
  "bio": "GitHub's mascot",
  "public_repos": 8,
  "followers": 10000,
  "following": 0,
  "company": "@github",
  "location": "San Francisco",
  "email": null,
  "blog": "https://github.blog",
  "twitter_username": null
}
```

## Frontend Usage

Navigate to `/github-profile` in the application and enter a GitHub username to search.

## Configuration

### Optional: GitHub API Token

For higher rate limits, you can set a GitHub API token in the backend environment:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

Without a token, the GitHub API has a rate limit of 60 requests per hour per IP address.
With a token, the rate limit increases to 5000 requests per hour.

## Development

### Running the Feature

1. Start the backend API:
   ```bash
   pnpm nx serve api
   ```

2. Start the frontend:
   ```bash
   pnpm nx serve admin-dashboard
   ```

3. Navigate to `http://localhost:4300/github-profile`

## Technical Implementation

- **Backend**: Hono.js route handler that fetches data from GitHub's REST API
- **Frontend**: Angular standalone component using signals for reactive state management
- **Shared Model**: TypeScript interface for type-safe data transfer between frontend and backend
