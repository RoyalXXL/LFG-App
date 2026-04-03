export function renderTimelineTabs(activeTimeline) {
  const tabs = [
    { id: 'forum', label: 'Forum feed' },
    { id: 'friends', label: 'Friends feed' },
  ];

  return `
    <nav class="tabs" aria-label="Timeline selector">
      ${tabs
        .map(
          (tab) => `
            <button class="tab ${activeTimeline === tab.id ? 'active' : ''}" data-timeline="${tab.id}">${tab.label}</button>
          `,
        )
        .join('')}
    </nav>
  `;
}