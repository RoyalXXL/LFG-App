# LFG Hub Foundation

A modular, mobile-friendly LFG social app inspired by Reddit/Twitter interaction loops, focused on finding squads quickly.

## Core features

- Persistent local data layer (posts, profile edits, reactions, selected timeline)
- Searchable Steam-popular game forum directory
- Multi-feed timeline modes:
  - **Game feed** (latest posts in selected game)
  - **Following** (friend-only posts)
  - **Trending** (engagement-ranked posts)
- LFG post composer with game picker, tags, and slot count
- Profile system with editable identity + contact handles
- Engagement primitives (upvote/react, comments/repost counters, join CTA)

## Project structure

```text
index.html
src/
  main.js                # App composition, filtering logic, event binding
  data/                  # Seed games/users/posts
  state/store.js         # Shared state, persistence, and actions
  components/            # Modular UI rendering units
  styles/global.css      # Global styles and responsive behavior
  utils/date.js          # Date formatting helpers
```

## Run locally

Because this project uses browser ES modules, serve it with any local static web server.

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Next suggested modules for release readiness

- Real auth + role-based moderation
- API backend (PostgreSQL + Redis + queue)
- Real-time chat + notifications
- Trust/safety workflows (reporting, blocklists, abuse heuristics)
- Full-text search service + ranking model
