export function renderGameList(games, selectedGameId, searchValue) {
  return `
    <section>
      <h2>Steam game forums</h2>
      <p class="subtle">Search popular games, then open that game feed instantly.</p>
      <label class="search-wrap">
        <span>Search game</span>
        <input id="game-search" placeholder="Counter-Strike, Helldivers, Monster Hunter..." value="${searchValue}" />
      </label>
      <div class="game-list">
        ${games
          .map(
            (game) => `
              <button class="game-chip ${game.id === selectedGameId ? 'active' : ''}" data-game-id="${game.id}">
                <span>${game.name}</span>
                <small>${Array.isArray(game.genres) ? game.genres.join(' | ') : ''}</small>
              </button>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}
