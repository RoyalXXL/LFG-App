export function renderPostComposer(selectedGame) {
  return `
    <section class="composer">
      <h2>Create LFG post</h2>
      <p class="subtle">Posting in <strong>${selectedGame.name}</strong> forum.</p>
      <form id="post-form">
        <label>
          Title
          <input name="title" required placeholder="Looking for 2 players to run cryo archive" maxlength="90" />
        </label>
        <label>
          Description
          <textarea name="description" rows="3" required placeholder="What kind of run, voice chat expectations, and skill level"></textarea>
        </label>
        <div class="form-row">
          <label>
            Needed players
            <input type="number" name="neededPlayers" min="1" max="8" value="2" required />
          </label>
          <label>
            Tags (comma separated)
            <input name="tags" placeholder="chill, pve, no-tilt" required />
          </label>
        </div>
        <button type="submit">Post to forum</button>
      </form>
    </section>
  `;
}