import { games } from '../data/games.js';
import { initialPosts } from '../data/mockPosts.js';
import { currentUser, users } from '../data/mockUsers.js';

export const state = {
  selectedGameId: games[0].id,
  timeline: 'forum',
  posts: [...initialPosts],
  filters: {
    query: '',
    mic: 'any',
    playstyle: 'any',
    language: 'any',
    openOnly: false,
  },
  ui: {
    compactMode: false,
    highContrast: false,
  },
  reports: [],
};

const listeners = [];

export function subscribe(listener) {
  listeners.push(listener);
}

export function notify() {
  listeners.forEach((listener) => listener(state));
}

export function setGame(gameId) {
  state.selectedGameId = gameId;
  notify();
}

export function setTimeline(view) {
  state.timeline = view;
  notify();
}

export function setFilters(patch) {
  state.filters = {
    ...state.filters,
    ...patch,
  };
  notify();
}

export function resetFilters() {
  state.filters = {
    query: '',
    mic: 'any',
    playstyle: 'any',
    language: 'any',
    openOnly: false,
  };
  notify();
}

export function setUiPreferences(patch) {
  state.ui = {
    ...state.ui,
    ...patch,
  };
  notify();
}

export function requestToJoin(postId) {
  const target = state.posts.find((post) => post.id === postId);

  if (!target || target.neededPlayers <= 0) {
    return;
  }

  target.neededPlayers -= 1;
  notify();
}

export function reportPost(postId) {
  state.reports.push({
    postId,
    reporterId: currentUser.id,
    createdAt: new Date().toISOString(),
  });
  notify();
}

export function createPost(postPayload) {
  state.posts.unshift({
    id: `p${Date.now()}`,
    authorId: currentUser.id,
    createdAt: new Date().toISOString(),
    ...postPayload,
  });
  notify();
}

export const entities = { games, users, currentUser };
