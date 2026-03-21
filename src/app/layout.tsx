import './globals.css';
import type { Metadata } from 'next';

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