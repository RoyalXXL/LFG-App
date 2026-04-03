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
        <span class="slot-pill ${post.neededPlayers === 0 ? 'full' : ''}">Need ${post.neededPlayers}</span>
      </header>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <ul class="meta-pills">
        <li>${post.playstyle}</li>
        <li>${post.micPolicy}</li>
        <li>${post.language}</li>
      </ul>
      <ul class="tags">
        ${post.tags.map((tag) => `<li>#${tag}</li>`).join('')}
      </ul>
      <footer>
        <strong>Platform IDs</strong>
        <ul class="platform-list">
          ${renderPlatformLinks(author.platforms)}
        </ul>
        <div class="post-actions">
          <button class="secondary" data-join-post="${post.id}" ${post.neededPlayers === 0 ? 'disabled' : ''}>Request to join</button>
          <button class="ghost" data-report-post="${post.id}">Report</button>
        </div>
      </footer>
    </article>
  `;
}
