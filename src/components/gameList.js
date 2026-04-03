export function renderGameList(games, selectedGameId) {
  return `
    <section>
      <h2>Game forums</h2>
      <p class="subtle">Pick a game forum and browse open squads.</p>
      <div class="game-list">
        ${games
          .map(
            (game) => `
              <button class="game-chip ${game.id === selectedGameId ? 'active' : ''}" data-game-id="${game.id}">
                <span>${game.name}</span>
                <small>${game.genres.join(' • ')}</small>
              </button>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}
