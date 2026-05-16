# chatter-fe

React frontend for the Chatter messaging app.

## What it does

A real-time chat UI. Users can log in, browse other users, and open or start conversations. New messages appear instantly via WebSocket. Unread conversations are visually flagged and cleared when the user opens them. Users can update their profile avatar in settings.

## Stack

- **Framework**: React 19, TypeScript
- **Build**: Vite 7
- **Routing**: React Router 7
- **HTTP**: Axios with an auth interceptor (`src/services/AuthInterceptor.ts`)
- **Real-time**: `react-use-websocket`
- **Validation**: Yup
- **Tests**: Cypress E2E

## Commands

```bash
npm run dev          # dev server (proxies /api → backend)
npm run build        # tsc + vite build
npm run test:local   # cypress against local env
npm run test:live    # cypress against live env
```

## Structure

```
src/
  components/
    App.tsx                  # router root
    layout/
      ProtectedRoutes.tsx    # guards /settings, /chatroom
      StandardRoutes.tsx     # wraps /, /register
    conversations/           # main chat UI
    pages/                   # Login, Register, Settings, ErrorPage
  services/
    requesters/              # AuthService, ChatService, SettingsService
    AuthInterceptor.ts       # attaches credentials, handles 401s
    LocalStorageService.ts   # persists userId, username, avatar
  models/                    # TypeScript types (Chat, Message, etc.)
  validators/                # Yup schemas for forms
```

## Testing

Cypress E2E only — no unit or component tests. Two suites:

- `cypress/e2e/local/` — runs against the local dev environment (`npm run test:local`)
- `cypress/e2e/live/` — runs against the deployed production environment (`npm run test:live`)

## Key details

- API types are imported directly from `chatter-be/openapi/schema.ts` — don't duplicate them here
- Vite proxies `/api` to the backend in dev; in production nginx handles routing
- Path alias: `@src/`
