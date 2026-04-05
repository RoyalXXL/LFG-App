import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LFG Nexus',
  description: 'Production-minded cross-platform LFG app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}