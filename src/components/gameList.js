export function renderGameList(games, selectedGameId, searchValue, favorites, onlyFavorites) {
  return `
    <section>
      <h2>Steam game forums</h2>
      <p class="subtle">Search games, pin favorites, and focus your LFG feeds.</p>
      <label class="search-wrap">
        <span>Search game</span>
        <input id="game-search" placeholder="Counter-Strike, Helldivers, Monster Hunter..." value="${searchValue}" />
      </label>
      <button class="secondary" id="toggle-favorites-view" type="button">
        ${onlyFavorites ? 'Show all games' : 'Show favorites only'}
      </button>
      <div class="game-list">
        ${games
          .map(
            (game) => `
              <div class="game-row">
                <button class="game-chip ${game.id === selectedGameId ? 'active' : ''}" data-game-id="${game.id}">
                  <span>${game.name}</span>
                  <small>${game.genres.join(' • ')}</small>
                </button>
                <button class="chip-btn favorite-toggle ${favorites.includes(game.id) ? 'active' : ''}" type="button" data-favorite-game="${game.id}">
                  ${favorites.includes(game.id) ? '★' : '☆'}
                </button>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}
