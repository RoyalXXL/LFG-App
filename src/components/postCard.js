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

export function renderPostCard(post, { game, author }) {
  return `
    <article class="post-card">
      <header>
        <div class="user-block">
          <span class="avatar">${author.avatar}</span>
          <div>
            <strong>${author.displayName}</strong>
            <small>${game.name} • ${formatRelativeDate(post.createdAt)}</small>
          </div>
        </div>
        <span class="slot-pill">Need ${post.neededPlayers}</span>
      </header>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <ul class="tags">
        ${post.tags.map((tag) => `<li>#${tag}</li>`).join('')}
      </ul>
      <footer>
        <strong>Platform IDs</strong>
        <ul class="platform-list">
          ${renderPlatformLinks(author.platforms)}
        </ul>
      </footer>
    </article>
  `;
}
