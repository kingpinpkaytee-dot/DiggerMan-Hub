# DiggerMan Hub — Social War Room

Command-center dashboard for posting / scheduling across platforms (via Buffer), unified comments + DMs inbox, and multi-channel management.

**Branding:** DiggerMan Hub  
**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui-style components · Prisma + SQLite

---

## Features (starter)

- Dark command-center UI with sidebar navigation
- Buffer API integration layer (`src/lib/buffer/client.ts`)
- OAuth provider stubs for Meta, X, LinkedIn, TikTok
- Prisma schema: Users, SocialAccounts, Posts, Conversations, Messages
- Pages: Command Center, Compose, Inbox, Schedule, Channels, Settings

## Quick start

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env
# Edit .env — at minimum set DATABASE_URL (already set for SQLite)

# 3. Database
npx prisma db push
npx prisma generate

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Buffer setup

1. Create / use a Buffer account → [buffer.com/developers](https://buffer.com/developers/api)
2. Generate an access token
3. Add to `.env`:

```
BUFFER_ACCESS_TOKEN=your_token_here
```

The client in `src/lib/buffer/client.ts` exposes:

- `getProfiles()`
- `createUpdate({ profile_ids, text, scheduled_at?, now? })`
- `getUpdates(profileId, status)`
- `isBufferConfigured()`

## Native OAuth (later)

Create developer apps and fill the corresponding keys in `.env`:

| Platform  | Console |
|-----------|---------|
| Meta      | https://developers.facebook.com |
| X         | https://developer.x.com |
| LinkedIn  | https://www.linkedin.com/developers |
| TikTok    | https://developers.tiktok.com |

Helpers live in `src/lib/oauth/providers.ts` (`buildAuthUrl`, `isProviderConfigured`, etc.).

## Project structure

```
src/
  app/                 # App Router pages
  components/
    layout/            # Sidebar, shell
    ui/                # Button, Card, …
  lib/
    buffer/            # Buffer API client
    oauth/             # Provider configs & auth URL builders
    prisma.ts          # Prisma client singleton
    utils.ts           # cn() + helpers
prisma/
  schema.prisma        # SQLite models (switchable to Postgres)
```

## Next steps

1. Wire Compose → Buffer `createUpdate`
2. Implement OAuth callback routes under `app/api/oauth/[provider]/callback`
3. Sync Buffer profiles into `SocialAccount`
4. Build real Inbox with Conversation / Message queries
5. Optional: Supabase Realtime or Pusher for live updates
6. Switch Prisma provider to `postgresql` when you move off local SQLite

## License

Private — DiggerMan Hub / The Kingpin Entertainment Pty Ltd
