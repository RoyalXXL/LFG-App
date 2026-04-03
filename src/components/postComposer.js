export function renderPostComposer(selectedGame, games) {
  return `
    <section class="composer">
      <h2>Create LFG post</h2>
      <p class="subtle">Posting in <strong>${selectedGame.name}</strong> forum. You can switch to any Steam title.</p>
      <form id="post-form">
        <label>
          Game
          <select name="gameId" required>
            ${games
              .map(
                (game) => 
                  `<option value="${game.id}" ${game.id === selectedGame.id ? 'selected' : ''}>${game.name}</option>`,
              )
              .join('')}
          </select>
        </label>
        <label>
          Title
          <input name="title" required placeholder="Need 2 for ranked + comms" maxlength="90" />
        </label>
        <label>
          Description
          <textarea name="description" rows="3" required placeholder="Goals, required role, platform, voice expectations"></textarea>
        </label>
        <div class="form-row">
          <label>
            Needed players
            <input type="number" name="neededPlayers" min="1" max="8" value="2" required />
          </label>
          <label>
            Tags (comma separated)
            <input name="tags" placeholder="chill, ranked, beginner-friendly" required />
          </label>
        </div>
        <button type="submit">Publish squad request</button>
      </form>
    </section>
  `;
}