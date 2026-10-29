import Link from 'next/link';
import { getCountries } from '@/lib/countries';
import { ClickCounter } from '@/components/ClickCounter';

export default async function HomePage() {
  const countries = await getCountries();

  return (
    <section className="space-y-2">
      <h1 className="text-3xl font-bold">Country Explorer</h1>
      <p>Countries loaded on the server{countries.length}</p>
      <ClickCounter />
      <ul className="columns-2 gap-6 text-sm md:columns-3">
        {countries.map((country) => (
          <li key={country.cca3 || country.name}>
            {country.cca3 ? (
              <Link
                href={`/country/${country.cca3}`}
                className="hover:underline"
              >
                {' '}
                {country.name}
              </Link>
            ) : (
              country.name
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
