import Link from 'next/link';
import type { Country } from '@/lib/countries';

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-500/40 bg-gray-500/10 transition-colors hover:bg-gray-500/20">
      {country.flag && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          loading="lazy"
          className="h-36 w-full bg-gray-500/20 object-contain"
        />
      )}
      <div className="space-y-1 p-4">
        <h2 className="text-lg font-semibold">
          {country.cca3 ? (
            <Link href={`/country/${country.cca3}`} className="hover:underline">
              {country.name}
            </Link>
          ) : (
            country.name
          )}
        </h2>
        <p className="text-sm text-gray-500">Capital: {country.capital}</p>
        <p className="text-sm text-gray-500">
          Population: {country.population.toLocaleString('en-US')}
        </p>
        <p className="text-sm text-gray-500">Region: {country.region}</p>
      </div>
    </article>
  );
}
