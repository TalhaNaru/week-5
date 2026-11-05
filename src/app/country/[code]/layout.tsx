import Link from 'next/link';

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <Link href="/" className="inline-block text-sm underline">
        ← Back to all countries
      </Link>
      <div className="rounded-md border border-gray-500/40 p-4">{children}</div>
    </section>
  );
}
