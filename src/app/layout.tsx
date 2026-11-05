import { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'Country Explorer';

export const metadata: Metadata = {
  title: appName,
  description: 'Country Explorer, Next.js edition',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-500/40">
          <nav className="mx-auto flex max-w-6xl items-center gap-4 p-4 font-medium">
            <span className="font-bold">{appName}</span>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
