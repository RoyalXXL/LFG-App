export function appShell({ sidebar, content, rightRail }) {
  return `
    <div class="shell">
      <aside class="panel sidebar">${sidebar}</aside>
      <main class="panel content">${content}</main>
      <aside class="panel rail">${rightRail}</aside>
    </div>
  `;
}
