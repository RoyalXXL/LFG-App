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

export function renderPostCard(post, { game, author, reacted, bookmarked, joined }) {
  const safeGameName = game?.name ?? 'Unknown game';
  const safeAuthorName = author?.displayName ?? 'Unknown player';
  const safeAuthorAvatar = author?.avatar ?? '??';
  const safeAuthorReputation = Number(author?.reputation ?? 0).toFixed(1);

  return `
    <article class="post-card ${post.neededPlayers === 0 ? 'full' : ''}">
      <header>
        <button class="user-block button-reset" data-profile-id="${author?.id ?? 'u001'}">
          <span class="avatar">${safeAuthorAvatar}</span>
          <div>
            <strong>${safeAuthorName}</strong>
            <small>${safeGameName} • ${formatRelativeDate(post.createdAt)} • ⭐ ${safeAuthorReputation}</small>
          </div>
        </button>
        <span class="slot-pill ${post.neededPlayers === 0 ? 'full' : ''}">${post.neededPlayers === 0 ? 'Full squad' : `Need ${post.neededPlayers}`}</span>
      </header>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <ul class="tags">
        ${post.tags
          .map(
            (tag) => `<li><button type="button" class="button-reset inline-tag" data-tag-filter="${tag}">#${tag}</button></li>`,
          )
          .join('')}
      </ul>
      <div class="post-actions">
        <button class="chip-btn ${reacted ? 'active' : ''}" data-react-post="${post.id}" type="button">▲ ${post.votes}</button>
        <button class="chip-btn" data-comment-post="${post.id}" type="button">💬 ${post.comments}</button>
        <button class="chip-btn" data-repost-post="${post.id}" type="button">🔁 ${post.reposts}</button>
        <button class="chip-btn ${bookmarked ? 'active' : ''}" data-bookmark-post="${post.id}" type="button">🔖</button>
        <button class="chip-btn ${joined ? 'active' : ''}" data-join-post="${post.id}" type="button">${joined ? '✅ Joined' : '🎯 Join'}</button>
        <button class="chip-btn" data-report-post="${post.id}" type="button">🚩 ${post.reports ?? 0}</button>
      </div>
      <footer>
        <strong>Platform IDs</strong>
        <ul class="platform-list">
          ${renderPlatformLinks(author?.platforms ?? {})}
        </ul>
      </footer>
    </article>
  `;
}
