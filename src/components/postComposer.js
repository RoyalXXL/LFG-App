const QUICK_TAGS = ['chill', 'ranked', 'beginner-friendly', 'mic-on', 'late-night', 'teaching'];

export function renderPostComposer(selectedGame, games, draft) {
  return `
    <section class="composer">
      <h2>Create LFG post</h2>
      <p class="subtle">Posting in <strong>${selectedGame.name}</strong>. Draft autosaves while you type.</p>
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
          <input id="composer-title" name="title" required placeholder="Need 2 for ranked + comms" maxlength="90" value="${draft.title}" />
          <small id="title-counter">${draft.title.length}/90</small>
        </label>
        <label>
          Description
          <textarea id="composer-description" name="description" rows="3" required placeholder="Goals, required role, platform, voice expectations">${draft.description}</textarea>
          <small id="description-counter">${draft.description.length}/280</small>
        </label>
        <div class="form-row">
          <label>
            Needed players
            <input type="number" name="neededPlayers" min="1" max="8" value="${draft.neededPlayers}" required />
          </label>
          <label>
            Tags (comma separated)
            <input name="tags" id="composer-tags" placeholder="chill, ranked, beginner-friendly" required value="${draft.tags}" />
          </label>
        </div>
        <div class="quick-tags">
          ${QUICK_TAGS.map((tag) => `<button type="button" class="chip-btn" data-quick-tag="${tag}">#${tag}</button>`).join('')}
        </div>
        <button type="submit">Publish squad request</button>
      </form>
    </section>
  `;
}