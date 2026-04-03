import { formatRelativeDate } from '../utils/date.js';

function renderPlatformLinks(platforms) {
  return Object.entries(platforms)
    .map(
      ([platform, username]) => `
        <li>
          <span>${platform}</span>
          <a href="#" aria-label="Message on ${platform}">${username}</a>
        </li>
      `,
    )
    .join('');
}

export function renderPostCard(post, { game, author, reacted }) {
  return `
    <article class="post-card">
      <header>
        <button class="user-block button-reset" data-profile-id="${author.id}">
          <span class="avatar">${author.avatar}</span>
          <div>
            <strong>${author.displayName}</strong>
            <small>${game.name} • ${formatRelativeDate(post.createdAt)}</small>
          </div>
        </button>
        <span class="slot-pill">Need ${post.neededPlayers}</span>
      </header>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <ul class="tags">
        ${post.tags.map((tag) => `<li>#${tag}</li>`).join('')}
      </ul>
      <div class="post-actions">
        <button class="chip-btn ${reacted ? 'active' : ''}" data-react-post="${post.id}">▲ ${post.votes}</button>
        <button class="chip-btn">💬 ${post.comments}</button>
        <button class="chip-btn">🔁 ${post.reposts}</button>
        <button class="chip-btn">🎯 Join</button>
      </div>
      <footer>
        <strong>Platform IDs</strong>
        <ul class="platform-list">
          ${renderPlatformLinks(author.platforms)}
        </ul>
      </footer>
    </article>
  `;
}
