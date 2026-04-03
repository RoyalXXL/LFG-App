export function renderTimelineTabs(activeTimeline) {
  const tabs = [
    { id: 'forum', label: 'Game feed' },
    { id: 'friends', label: 'Following' },
    { id: 'trending', label: 'Trending' },
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