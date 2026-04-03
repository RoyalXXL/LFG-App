import { renderGameList } from './components/gameList.js';
import { appShell } from './components/layout.js';
import { renderPostCard } from './components/postCard.js';
import { renderPostComposer } from './components/postComposer.js';
import { renderTimelineTabs } from './components/timelineTabs.js';
import {
  createPost,
  entities,
  setGame,
  setTimeline,
  state,
  subscribe,
} from './state/store.js';

const app = document.querySelector('#app');

function getSelectedGame() {
  return entities.games.find((game) => game.id === state.selectedGameId);
}

function getTimelinePosts() {
  const filtered = state.posts.filter((post) => post.gameId === state.selectedGameId);

  if (state.timeline === 'forum') {
    return filtered;
  }

  return filtered.filter((post) => entities.currentUser.friends.includes(post.authorId));
}

function renderFeed(posts) {
  if (!posts.length) {
    return '<p class="empty">No posts here yet. Try creating one for your squad.</p>';
  }

  return posts
    .map((post) => {
      const game = entities.games.find((item) => item.id === post.gameId);
      const author = entities.users.find((user) => user.id === post.authorId);
      return renderPostCard(post, { game, author });
    })
    .join('');
}

function renderRightRail() {
  return `
    <section>
      <h2>Your profile links</h2>
      <ul class="platform-list">
        ${Object.entries(entities.currentUser.platforms)
          .map(
            ([platform, username]) => `
              <li>
                <span>${platform}</span>
                <a href="#">${username}</a>
              </li>
            `,
          )
          .join('')}
      </ul>
    </section>
    <section>
      <h2>Friends</h2>
      <div class="friends-list">
        ${entities.users
          .filter((user) => entities.currentUser.friends.includes(user.id))
          .map(
            (friend) => `
              <div class="friend-pill">
                <span class="avatar">${friend.avatar}</span>
                <div>
                  <strong>${friend.displayName}</strong>
                  <small>Tap to open profile</small>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function mount() {
  const selectedGame = getSelectedGame();
  const posts = getTimelinePosts();

  const sidebar = renderGameList(entities.games, state.selectedGameId);
  const content = `
    ${renderPostComposer(selectedGame)}
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

  document.querySelectorAll('[data-timeline]').forEach((button) => {
    button.addEventListener('click', () => setTimeline(button.dataset.timeline));
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
      gameId: state.selectedGameId,
      title: String(formData.get('title')).trim(),
      description: String(formData.get('description')).trim(),
      neededPlayers: Number(formData.get('neededPlayers')),
      tags,
    });

    form.reset();
  });
}

subscribe(mount);
mount();
