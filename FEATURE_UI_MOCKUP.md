# GitHub Profile Feature - UI Mockup

## Page Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: GitHub Profile                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                               │   │
│  │  GitHub Profile Lookup                                        │   │
│  │                                                               │   │
│  │  GitHub Username                                              │   │
│  │  ┌──────────────────────────────────────┐  ┌──────────┐     │   │
│  │  │ Enter GitHub username...              │  │ Search   │     │   │
│  │  └──────────────────────────────────────┘  └──────────┘     │   │
│  │                                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## After Searching for a User (e.g., "octocat")

```
┌─────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: GitHub Profile                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                               │   │
│  │  GitHub Profile Lookup                                        │   │
│  │                                                               │   │
│  │  GitHub Username                                              │   │
│  │  ┌──────────────────────────────────────┐  ┌──────────┐     │   │
│  │  │ octocat                               │  │ Search   │     │   │
│  │  └──────────────────────────────────────┘  └──────────┘     │   │
│  │                                                               │   │
│  │  ┌───────────────────────────────────────────────────────┐  │   │
│  │  │                                                         │  │   │
│  │  │  ┌────────┐                                            │  │   │
│  │  │  │ [IMG]  │  The Octocat                               │  │   │
│  │  │  │        │  @octocat                                  │  │   │
│  │  │  │        │  GitHub's mascot                           │  │   │
│  │  │  └────────┘                                            │  │   │
│  │  │                                                         │  │   │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │  │   │
│  │  │  │      8      │ │   10,000    │ │      0      │     │  │   │
│  │  │  │ Repositories│ │  Followers  │ │  Following  │     │  │   │
│  │  │  └─────────────┘ └─────────────┘ └─────────────┘     │  │   │
│  │  │                                                         │  │   │
│  │  │  Company: @github                                      │  │   │
│  │  │  Location: San Francisco                               │  │   │
│  │  │  Website: https://github.blog                          │  │   │
│  │  │                                                         │  │   │
│  │  │  ┌───────────────────────────────────────────────┐    │  │   │
│  │  │  │        View on GitHub                         │    │  │   │
│  │  │  └───────────────────────────────────────────────┘    │  │   │
│  │  │                                                         │  │   │
│  │  └───────────────────────────────────────────────────────┘  │   │
│  │                                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Error State (User Not Found)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                               │   │
│  │  GitHub Profile Lookup                                        │   │
│  │                                                               │   │
│  │  GitHub Username                                              │   │
│  │  ┌──────────────────────────────────────┐  ┌──────────┐     │   │
│  │  │ nonexistentuser123                    │  │ Search   │     │   │
│  │  └──────────────────────────────────────┘  └──────────┘     │   │
│  │                                                               │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │  ⚠️  GitHub user not found                           │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │                                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Loading State

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                               │   │
│  │  GitHub Profile Lookup                                        │   │
│  │                                                               │   │
│  │  GitHub Username                                              │   │
│  │  ┌──────────────────────────────────────┐  ┌──────────┐     │   │
│  │  │ octocat                               │  │Loading...│     │   │
│  │  └──────────────────────────────────────┘  └──────────┘     │   │
│  │                                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Light Mode
- Background: White (#FFFFFF)
- Text: Gray-900 (#111827)
- Primary Button: Blue-600 (#2563EB)
- Stats Cards: White with subtle shadow
- Error Message: Red background with red text

### Dark Mode
- Background: Gray-800 (#1F2937)
- Text: White (#FFFFFF)
- Primary Button: Blue-600 (#2563EB)
- Stats Cards: Gray-800 with border
- Error Message: Red background with lighter red text

## Interactive Elements

1. **Search Input**
   - Text input with placeholder
   - Supports Enter key for quick search
   - Focus state with blue border

2. **Search Button**
   - Primary blue button
   - Disabled state during loading
   - Shows "Loading..." text when fetching

3. **Profile Avatar**
   - Circular image (96x96px)
   - White border with shadow
   - Loads from GitHub's CDN

4. **Stats Cards**
   - Three cards showing repositories, followers, following
   - Color-coded numbers (blue, green, purple)
   - Hover effects on desktop

5. **View on GitHub Button**
   - Full-width dark button
   - Opens profile in new tab
   - External link icon

## Responsive Design

- **Desktop (>768px)**: Three-column grid for stats
- **Tablet (768px)**: Two-column grid for stats
- **Mobile (<768px)**: Single column layout, full-width buttons

## Accessibility Features

- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure
- Alt text for images
