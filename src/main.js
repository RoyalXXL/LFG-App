import { renderGameList } from './components/gameList.js';
import { appShell } from './components/layout.js';
import { renderPostCard } from './components/postCard.js';
import { renderPostComposer } from './components/postComposer.js';
import { renderTimelineTabs } from './components/timelineTabs.js';
import {
  createPost,
  entities,
  reportPost,
  requestToJoin,
  resetFilters,
  setFilters,
  setGame,
  setTimeline,
  setUiPreferences,
  state,
  subscribe,
} from './state/store.js';

const app = document.querySelector('#app');

function getSelectedGame() {
  return entities.games.find((game) => game.id === state.selectedGameId);
}

function applyPostFilters(posts) {
  const { query, mic, playstyle, language, openOnly } = state.filters;

  return posts.filter((post) => {
    const haystack = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase();
    const matchesQuery = query ? haystack.includes(query.toLowerCase()) : true;
    const matchesMic = mic === 'any' ? true : post.micPolicy.toLowerCase().includes(mic);
    const matchesPlaystyle = playstyle === 'any' ? true : post.playstyle.toLowerCase() === playstyle;
    const matchesLanguage = language === 'any' ? true : post.language.toLowerCase() === language;
    const matchesOpen = openOnly ? post.neededPlayers > 0 : true;

    return matchesQuery && matchesMic && matchesPlaystyle && matchesLanguage && matchesOpen;
  });
}

function getTimelinePosts() {
  const filtered = state.posts.filter((post) => post.gameId === state.selectedGameId);
  const timelinePosts =
    state.timeline === 'forum'
      ? filtered
      : filtered.filter((post) => entities.currentUser.friends.includes(post.authorId));

  return applyPostFilters(timelinePosts);
}

function renderFeed(posts) {
  if (!posts.length) {
    return '<p class="empty">No posts match these filters. Try widening your search.</p>';
  }

  return posts
    .map((post) => {
      const game = entities.games.find((item) => item.id === post.gameId);
      const author = entities.users.find((user) => user.id === post.authorId);
      return renderPostCard(post, { game, author });
    })
    .join('');
}

function renderDiscoveryFilters() {
  const { query, mic, playstyle, language, openOnly } = state.filters;

  return `
    <section class="filters" aria-label="LFG discovery filters">
      <h2>Smart matchmaking filters</h2>
      <div class="filter-grid">
        <label>
          Search
          <input name="query" value="${query}" placeholder="raid, no-tilt, beginner" />
        </label>
        <label>
          Mic
          <select name="mic">
            <option value="any" ${mic === 'any' ? 'selected' : ''}>Any</option>
            <option value="required" ${mic === 'required' ? 'selected' : ''}>Required</option>
            <option value="preferred" ${mic === 'preferred' ? 'selected' : ''}>Preferred</option>
            <option value="optional" ${mic === 'optional' ? 'selected' : ''}>Optional</option>
          </select>
        </label>
        <label>
          Playstyle
          <select name="playstyle">
            <option value="any" ${playstyle === 'any' ? 'selected' : ''}>Any</option>
            <option value="chill" ${playstyle === 'chill' ? 'selected' : ''}>Chill</option>
            <option value="competitive" ${playstyle === 'competitive' ? 'selected' : ''}>Competitive</option>
            <option value="teaching" ${playstyle === 'teaching' ? 'selected' : ''}>Teaching</option>
          </select>
        </label>
        <label>
          Language
          <select name="language">
            <option value="any" ${language === 'any' ? 'selected' : ''}>Any</option>
            <option value="english" ${language === 'english' ? 'selected' : ''}>English</option>
          </select>
        </label>
      </div>
      <div class="toggle-row">
        <label class="check">
          <input type="checkbox" name="openOnly" ${openOnly ? 'checked' : ''} />
          Open squads only
        </label>
        <button class="ghost" data-reset-filters="true" type="button">Reset filters</button>
      </div>
    </section>
  `;
}

function renderRightRail() {
  return `
    <section>
      <h2>Your trust profile</h2>
      <div class="trust-card">
        <strong>${entities.currentUser.trustScore}% reliability</strong>
        <small>${entities.currentUser.endorsements} positive teammate endorsements</small>
      </div>
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
      <h2>Accessibility</h2>
      <div class="friends-list">
        <label class="check">
          <input type="checkbox" name="compactMode" ${state.ui.compactMode ? 'checked' : ''} />
          Compact density
        </label>
        <label class="check">
          <input type="checkbox" name="highContrast" ${state.ui.highContrast ? 'checked' : ''} />
          High contrast
        </label>
      </div>
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
                  <small>${friend.trustScore}% reliable</small>
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
    ${renderDiscoveryFilters()}
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

  document.body.classList.toggle('compact', state.ui.compactMode);
  document.body.classList.toggle('hc', state.ui.highContrast);

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-game-id]').forEach((button) => {
    button.addEventListener('click', () => setGame(button.dataset.gameId));
  });

  document.querySelectorAll('[data-timeline]').forEach((button) => {
    button.addEventListener('click', () => setTimeline(button.dataset.timeline));
  });

  document.querySelectorAll('[data-join-post]').forEach((button) => {
    button.addEventListener('click', () => requestToJoin(button.dataset.joinPost));
  });

  document.querySelectorAll('[data-report-post]').forEach((button) => {
    button.addEventListener('click', () => reportPost(button.dataset.reportPost));
  });

  document.querySelector('[data-reset-filters]')?.addEventListener('click', () => resetFilters());

  document.querySelectorAll('.filters [name]').forEach((input) => {
    input.addEventListener('input', () => {
      setFilters({
        query: document.querySelector('.filters [name="query"]').value.trim(),
        mic: document.querySelector('.filters [name="mic"]').value,
        playstyle: document.querySelector('.filters [name="playstyle"]').value,
        language: document.querySelector('.filters [name="language"]').value,
        openOnly: document.querySelector('.filters [name="openOnly"]').checked,
      });
    });
  });

  document.querySelectorAll('.rail [name="compactMode"], .rail [name="highContrast"]').forEach((input) => {
    input.addEventListener('change', () => {
      setUiPreferences({
        compactMode: document.querySelector('.rail [name="compactMode"]').checked,
        highContrast: document.querySelector('.rail [name="highContrast"]').checked,
      });
    });
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
      micPolicy: String(formData.get('micPolicy')),
      playstyle: String(formData.get('playstyle')),
      language: String(formData.get('language') || 'English').trim() || 'English',
      tags,
    });

    form.reset();
  });
}

subscribe(mount);
mount();
