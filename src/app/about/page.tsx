import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="space-y-2">
      <h1 className="text-3xl font-bold">About</h1>
      <p>This page is the route /about</p>
      <Link href="/about/team" className="underline">
        Go to the team page
      </Link>
    </section>
  );
}
