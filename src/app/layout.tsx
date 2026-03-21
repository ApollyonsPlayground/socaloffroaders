'use client';

import './globals.css';
import type { Metadata } from 'next';

// Ensure the correct path for Tailwind CSS import
// The base CSS file is typically in src/app/globals.css for the App Router setup

export const metadata: Metadata = {
  title: 'SoCal Off-Roaders v3',
  description: 'A Next.js rebuild for SoCal Off-Roaders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
