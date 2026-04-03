import { games } from '../data/games.js';
import { initialPosts } from '../data/mockPosts.js';
import { currentUser, users } from '../data/mockUsers.js';

export const state = {
  selectedGameId: games[0].id,
  timeline: 'forum',
  posts: [...initialPosts],
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
