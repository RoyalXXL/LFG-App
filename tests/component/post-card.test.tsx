import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostCard } from '@/features/posts/components/post-card';

it('renders critical matchmaking metadata on card', () => {
  render(
    <PostCard
      post={{
        id: '1',
        title: 'Need one more',
        postType: 'raid',
        platforms: ['PC'],
        party: '5/6',
        startTime: 'Now',
        micRequired: true,
        language: 'English',
        rank: 'Any',
        status: 'open',
        host: 'Hosty',
        score: 10,
        comments: 3,
      }}
    />,
  );

  expect(screen.getByText('Need one more')).toBeInTheDocument();
  expect(screen.getByText('Mic required')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Request to Join' })).toBeVisible();
});
