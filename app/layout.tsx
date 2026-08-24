import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rent4You Utility — Day, Month-to-Month & Rent-to-Own',
  description: 'Rent4You Utility connects you with everyday essentials — starting with washers & dryers — on flexible terms. No warehouse, no long contracts, no pressure to buy until you\'re ready.',
  openGraph: {
    title: 'Rent4You Utility',
    description: 'Flexible rental options: day rentals, month-to-month, and rent-to-own',
    url: 'https://rent4youutility.com',
    siteName: 'Rent4You Utility',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
