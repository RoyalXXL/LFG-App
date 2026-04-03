import { renderGameList } from './components/gameList.js';
import { appShell } from './components/layout.js';
import { renderPostCard } from './components/postCard.js';
import { renderPostComposer } from './components/postComposer.js';
import { renderProfilePanel } from './components/profilePanel.js';
import { renderTimelineTabs } from './components/timelineTabs.js';
import {
  createPost,
  entities,
  setActiveProfile,
  setGame,
  setGameSearch,
  setTimeline,
  state,
  subscribe,
  toggleReaction,
  updateProfile,
} from './state/store.js';

const app = document.querySelector('#app');

function getSelectedGame() {
  return entities.games.find((game) => game.id === state.selectedGameId) ?? entities.games[0];
}

function getVisibleGames() {
  const query = state.gameSearch.trim().toLowerCase();

  if (!query) {
    return entities.games;
  }

  return entities.games.filter(
    (game) =>
      game.name.toLowerCase().includes(query) || game.genres.some((genre) => genre.toLowerCase().includes(query)),
  );
}

function getTimelinePosts() {
  const sameGamePosts = state.posts.filter((post) => post.gameId === state.selectedGameId);

  if (state.timeline === 'forum') {
    return sameGamePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (state.timeline === 'friends') {
    return sameGamePosts
      .filter((post) => entities.currentUser.friends.includes(post.authorId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return [...sameGamePosts].sort(
    (a, b) => b.votes + b.comments * 2 + b.reposts * 3 - (a.votes + a.comments * 2 + a.reposts * 3),
  );
}

function renderFeed(posts) {
  if (!posts.length) {
    return '<p class="empty">No posts in this forum yet. Create one and be the first squad leader.</p>';
  }

  return posts
    .map((post) => {
      const game = entities.games.find((item) => item.id === post.gameId);
      const author = entities.users.find((user) => user.id === post.authorId) ?? entities.currentUser;
      return renderPostCard(post, {
        game,
        author,
        reacted: Boolean(state.reactions[post.id]),
      });
    })
    .join('');
}

function renderRightRail() {
  const activeProfile = entities.users.find((user) => user.id === state.activeProfileId) ?? entities.currentUser;

  return `
    ${renderProfilePanel(activeProfile, activeProfile.id === entities.currentUser.id, state.profileDraft)}
    <section>
      <h2>Squad circle</h2>
      <div class="friends-list">
        ${entities.users
          .filter((user) => entities.currentUser.friends.includes(user.id))
          .map(
            (friend) => `
              <button class="friend-pill button-reset" data-profile-id="${friend.id}">
                <span class="avatar">${friend.avatar}</span>
                <div>
                  <strong>${friend.displayName}</strong>
                  <small>${friend.bio}</small>
                </div>
              </button>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function mount() {
  const selectedGame = getSelectedGame();
  const visibleGames = getVisibleGames();
  const posts = getTimelinePosts();

  const sidebar = renderGameList(visibleGames, state.selectedGameId, state.gameSearch);
  const content = `
    ${renderPostComposer(selectedGame, entities.games)}
    ${renderTimelineTabs(state.timeline)}
    <section class="feed">
      ${renderFeed(posts)}
    </section>
  `;

  app.innerHTML = appShell({
    sidebar,
    content,
    rightRail: renderRightRail(),
  });

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-game-id]').forEach((button) => {
    button.addEventListener('click', () => setGame(button.dataset.gameId));
  });

  document.querySelector('#game-search')?.addEventListener('input', (event) => {
    setGameSearch(event.target.value);
  });

  document.querySelectorAll('[data-timeline]').forEach((button) => {
    button.addEventListener('click', () => setTimeline(button.dataset.timeline));
  });

  document.querySelectorAll('[data-profile-id]').forEach((button) => {
    button.addEventListener('click', () => setActiveProfile(button.dataset.profileId));
  });

  document.querySelectorAll('[data-react-post]').forEach((button) => {
    button.addEventListener('click', () => toggleReaction(button.dataset.reactPost));
  });

  const form = document.querySelector('#post-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const tags = String(formData.get('tags'))
      .split(',')
      .map((tag) => tag.trim().replace(/^#/, ''))
      .filter(Boolean);

    createPost({
      gameId: String(formData.get('gameId')),
      title: String(formData.get('title')).trim(),
      description: String(formData.get('description')).trim(),
      neededPlayers: Number(formData.get('neededPlayers')),
      tags,
    });

    form.reset();
  });

  const profileForm = document.querySelector('#profile-form');
  profileForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(profileForm);
    updateProfile({
      displayName: String(formData.get('displayName')).trim(),
      bio: String(formData.get('bio')).trim(),
      timezone: String(formData.get('timezone')).trim(),
      steam: String(formData.get('steam')).trim(),
      discord: String(formData.get('discord')).trim(),
    });
  });
}

subscribe(mount);
mount();
mount();
