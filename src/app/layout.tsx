import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Country Explorer',
  description: 'Week 5 Next.js App Router',
};
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'Country Explorer';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-500/40">
          <nav className="mx-auto flex max-w-5xl gap-4 p-4 font-medium">
            <span className="font-bold">{appName}</span>
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/about/team" className="hover:underline">
              Team
            </Link>
            <Link href="/feedback" className="hover:underline">
              Feedback
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}
