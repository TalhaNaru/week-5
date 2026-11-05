import Link from 'next/link';

export default function CountryNotFound() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Country not found</h2>
      <p>No country matches that code.</p>
      <Link href="/" className="underline">
        Back to all countries
      </Link>
    </div>
  );
}
