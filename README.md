# LFG Nexus (Next.js + TypeScript)

Production-minded, cross-platform LFG (Looking For Group) application scaffold with Reddit-inspired game hubs and structured matchmaking metadata.

## A) Architecture plan

### Core architecture
- **App Router composition layer** (`src/app/**`): thin pages for route-level layout, data loading, and orchestration.
- **Feature/domain modules** (`src/features/**`): each feature has `components`, `hooks`, `schemas`, `services`, `repositories`, and `types`.
- **Shared layer** (`src/shared/**`): reusable UI primitives, utility libs, config, and common types.
- **Backend service layer**: Next.js API routes call domain services, which depend on repository interfaces (dependency inversion).
- **Data**: PostgreSQL via Prisma.

### Extension points
- `AuthProvider` interface (`src/features/auth/services/auth.service.ts`) for swapping NextAuth/Clerk.
- `MessagingTransport` interface (`src/features/messages/services/messaging.service.ts`) for WebSocket/SSE providers.
- `NotificationChannel` interface (`src/features/notifications/services/notification.service.ts`) for push/email providers.
- `IRankingService` interface (`src/features/matchmaking/services/ranking.service.ts`) for recommendation engine upgrades.
- TODO: premium tiers, verified clans, AI moderation hooks, calendar sync.

## B) Folder structure

```text
  app/
    api/
    auth/
    onboarding/
    games/
    posts/
    join-requests/
    messages/
    notifications/
    profile/
    settings/
    moderation/
    admin-seed/
  features/
    auth/
    games/
    posts/
    comments/
    tags/
    search/
    matchmaking/
    messages/
    notifications/
    moderation/
    profile/
    reputation/
  shared/
    ui/
    lib/
    types/
    config/
prisma/
tests/
```

## C) Prisma schema
- Full schema in `prisma/schema.prisma` includes all requested entities:
  - `User`, `Profile`, `Game`, `GameAlias`, `Platform`, `GameHub`, `FollowedGame`
  - `LFGPost`, `LFGPostRequirement`, `LFGPostTag`, `LFGPostPlatform`
  - `Comment`, `Vote`, `JoinRequest`, `PartyMember`
  - `DirectMessageThread`, `DirectMessage`, `Notification`
  - `Report`, `ModerationAction`, `ReputationEvent`
  - `AvailabilityWindow`, `BlockedUser`, `SavedPost`, `RecentSearch`, `DeviceSession`, `AuditLog`
- Includes enums for post lifecycle, join mode, moderation state, report flow, and notifications.

## D) Key UI components
- `PostCard`: high-scan card with badges and persistent join CTA.
- `GameSearchBar`: sticky-style searchable input.
- `FilterChipRow`: horizontal chip filters for mobile-first discoverability.
- `LayoutShell`: desktop side nav + optional right rail.
- Shared primitives: `Button`, `Badge`, `Card`.

## E) Main pages
- Landing page (`/`)
- Auth (`/auth`)
- Onboarding (`/onboarding`)
- Global game search/feed (`/games`)
- Game hub (`/games/[slug]`)
- Create post (`/posts/new`)
- Post detail (`/posts/[id]`)
- Join requests (`/join-requests`)
- Messages inbox + thread (`/messages`, `/messages/[threadId]`)
- Notifications (`/notifications`)
- Profile (`/profile/[username]`)
- Settings (`/settings`)
- Moderation queue (`/moderation`)
- Admin seed/demo (`/admin-seed`)

## F) API routes / backend service layer
- `GET /api/games`: trending or query-based search.
- `GET /api/posts?game=`: game hub posts.
- `POST /api/posts`: create LFG post with schema validation.
- `GET /api/search`: global search contract placeholder.
- `POST /api/join-requests`: join request creation contract.
- `GET /api/moderation`: moderation queue contract.
- `GET /api/notifications`: notification center contract.

## G) Initial implementation notes
- TypeScript-first across frontend and backend layers.
- Domain services isolate business logic from page code.
- Repository pattern for Prisma interaction and easier future migration.
- Dark mode ready, mobile-first, accessible semantic markup.

## H) Tests
- **Unit (Vitest)**: ranking engine behavior (`tests/unit/ranking.service.test.ts`).
- **Component (RTL)**: Post card critical metadata/CTA visibility (`tests/component/post-card.test.tsx`).
- **E2E (Playwright)**: landing CTA smoke flow (`tests/e2e/landing.spec.ts`).

## I) Seed scripts
- `prisma/seed.ts` seeds:
  - Platforms (PC/PS5/Xbox)
  - Game archetypes (FPS ranked, MMO raid, extraction shooter, co-op dungeon, sports club)
  - User profile + representative posts + tags.

## J) Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Environment

Create `.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lfg"
NEXTAUTH_SECRET="replace-me"
```

## Future extension roadmap
- OAuth with Xbox/PSN/Steam/Battle.net.
- Push notifications.
- Recommendation/reranking service (ML-backed).
- Verified communities and subscriptions.
- Event scheduling + calendar sync.
- AI-assisted drafting/moderation with safe fallback controls.
