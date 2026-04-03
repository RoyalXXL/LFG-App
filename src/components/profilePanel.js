export function renderProfilePanel(user, isCurrentUser, profileDraft) {
  return `
    <section>
      <h2>${isCurrentUser ? 'Your profile' : 'Player profile'}</h2>
      <div class="profile-card">
        <div class="profile-head">
          <span class="avatar large">${user.avatar}</span>
          <div>
            <strong>${user.displayName}</strong>
            <small>${user.timezone} • ⭐ ${user.reputation.toFixed(1)}</small>
          </div>
        </div>
        <p>${user.bio}</p>
        <small>${user.completedSquads} squads completed</small>
      </div>
      ${
        isCurrentUser
          ? `
      <form id="profile-form" class="profile-form">
        <label>Display name<input name="displayName" value="${profileDraft.displayName}" maxlength="30" /></label>
        <label>Bio<textarea name="bio" rows="3" maxlength="160">${profileDraft.bio}</textarea></label>
        <div class="form-row">
          <label>Timezone<input name="timezone" value="${profileDraft.timezone}" /></label>
          <label>Steam<input name="steam" value="${profileDraft.steam}" /></label>
        </div>
        <label>Discord<input name="discord" value="${profileDraft.discord}" /></label>
        <button type="submit">Save profile</button>
      </form>`
          : ''
      }
    </section>
  `;
}
