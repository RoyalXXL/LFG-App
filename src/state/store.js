import { games } from '../data/games.js';
import { initialPosts } from '../data/mockPosts.js';
import { currentUser, users } from '../data/mockUsers.js';

const STORAGE_KEY = 'lfg-hub-v2';

function sanitizePosts(posts) {
  return posts
    .filter((post) => typeof post?.gameId === 'string' && games.some((game) => game.id === post.gameId))
    .map((post) => ({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags : [],
      votes: Number(post.votes ?? 0),
      comments: Number(post.comments ?? 0),
      reposts: Number(post.reposts ?? 0),
    }));
}

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    return {
      selectedGameId: games.some((game) => game.id === parsed.selectedGameId)
        ? parsed.selectedGameId
        : games[0].id,
      timeline: ['forum', 'friends', 'trending'].includes(parsed.timeline) ? parsed.timeline : 'forum',
      posts: sanitizePosts(parsed.posts ?? initialPosts),
      gameSearch: typeof parsed.gameSearch === 'string' ? parsed.gameSearch : '',
      profileDraft:
        typeof parsed.profileDraft === 'object' && parsed.profileDraft
          ? {
              displayName: parsed.profileDraft.displayName ?? currentUser.displayName,
              bio: parsed.profileDraft.bio ?? currentUser.bio,
              timezone: parsed.profileDraft.timezone ?? currentUser.timezone,
              steam: parsed.profileDraft.steam ?? currentUser.platforms.steam,
              discord: parsed.profileDraft.discord ?? currentUser.platforms.discord,
            }
          : {
              displayName: currentUser.displayName,
              bio: currentUser.bio,
              timezone: currentUser.timezone,
              steam: currentUser.platforms.steam,
              discord: currentUser.platforms.discord,
            },
      activeProfileId: users.some((user) => user.id === parsed.activeProfileId)
        ? parsed.activeProfileId
        : currentUser.id,
      reactions: typeof parsed.reactions === 'object' && parsed.reactions ? parsed.reactions : {},
    };
  } catch {
    return null;
  }
}

const defaultState = {
  selectedGameId: games[0].id,
  timeline: 'forum',
  posts: [...initialPosts],
  gameSearch: '',
  profileDraft: {
    displayName: currentUser.displayName,
    bio: currentUser.bio,
    timezone: currentUser.timezone,
    steam: currentUser.platforms.steam,
    discord: currentUser.platforms.discord,
  },
  activeProfileId: currentUser.id,
  reactions: {},
};

export const state = loadPersistedState() ?? defaultState;

const listeners = [];

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      selectedGameId: state.selectedGameId,
      timeline: state.timeline,
      posts: state.posts,
      gameSearch: state.gameSearch,
      profileDraft: state.profileDraft,
      activeProfileId: state.activeProfileId,
      reactions: state.reactions,
    }),
  );
}

export function subscribe(listener) {
  listeners.push(listener);
}

export function notify() {
  persist();
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

export function setGameSearch(query) {
  state.gameSearch = query;
  notify();
}

export function setActiveProfile(profileId) {
  state.activeProfileId = profileId;
  notify();
}

export function updateProfile(payload) {
  state.profileDraft = {
    ...state.profileDraft,
    ...payload,
  };

  if (state.activeProfileId === currentUser.id) {
    currentUser.displayName = state.profileDraft.displayName;
    currentUser.bio = state.profileDraft.bio;
    currentUser.timezone = state.profileDraft.timezone;
    currentUser.platforms.steam = state.profileDraft.steam;
    currentUser.platforms.discord = state.profileDraft.discord;
  }

  notify();
}

export function toggleReaction(postId) {
  state.reactions[postId] = !state.reactions[postId];
  state.posts = state.posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    return {
      ...post,
      votes: state.reactions[postId] ? post.votes + 1 : Math.max(0, post.votes - 1),
    };
  });

  notify();
}

export function createPost(postPayload) {
  state.posts.unshift({
    id: `p${Date.now()}`,
    authorId: currentUser.id,
    createdAt: new Date().toISOString(),
    votes: 1,
    comments: 0,
    reposts: 0,
    ...postPayload,
  });
  notify();
}

export const entities = { games, users, currentUser };
