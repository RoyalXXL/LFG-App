# LFG Hub Foundation

A modular, mobile-friendly starter app for finding gaming squads (LFG).

## Core features in this foundation

- Game-specific forums (Marathon, Destiny 2, Apex examples)
- Post composer for title, description, tags, and number of players needed
- Platform contact handles shown on every post (Steam / Xbox / PlayStation)
- Two feed modes:
  - **Forum feed** (all posts for selected game)
  - **Friends feed** (posts from people you follow/friend)
- Responsive layout optimized for phone and desktop

## Project structure

```text
index.html
src/
  main.js                # App composition and event binding
  data/                  # Static game/user/post seed data
  state/store.js         # Shared state + actions (setGame, setTimeline, createPost)
  components/            # UI pieces rendered as modular functions
  styles/global.css      # Global styles and responsive behavior
  utils/date.js          # Date formatting helpers
```

## Run locally

Because this project uses browser ES modules, serve it with any local static web server.

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Next suggested modules

- Auth module (sign in + profile editing)
- Real API module (persist posts/users)
- Direct messaging module
- Notifications module (post replies, friend requests)
- Search/filter module (tags, mic/no mic, platform)
