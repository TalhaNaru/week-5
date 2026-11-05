import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCountries, getCountryByCode } from '@/lib/countries';

type CountryPageProps = {
  params: Promise<{ code: string }>;
};

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;

  if (!/^[A-Za-z]{3}$/.test(code)) {
    notFound();
  }

  const country = await getCountryByCode(code);
  if (!country) {
    notFound();
  }

  const all = country.borders.length > 0 ? await getCountries() : [];
  const nameByCode = new Map(all.map((item) => [item.cca3, item.name]));

  return (
    <article className="space-y-4">
      {country.flag && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          className="h-40 rounded border border-gray-500/40"
        />
      )}
      <h1 className="text-3xl font-bold">{country.name}</h1>
      <dl className="space-y-1">
        <p>
          <dt className="inline font-semibold">Capital: </dt>
          <dd className="inline">{country.capital}</dd>
        </p>
        <p>
          <dt className="inline font-semibold">Population: </dt>
          <dd className="inline">
            {country.population.toLocaleString('en-US')}
          </dd>
        </p>
        <p>
          <dt className="inline font-semibold">Region: </dt>
          <dd className="inline">{country.region}</dd>
        </p>
        <p>
          <dt className="inline font-semibold">Languages: </dt>
          <dd className="inline">
            {country.languages.length > 0
              ? country.languages.join(', ')
              : 'Not listed'}
          </dd>
        </p>
      </dl>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Border countries</h2>
        {country.borders.length === 0 ? (
          <p className="text-gray-500">No land borders.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {country.borders.map((border) => (
              <li key={border}>
                <Link
                  href={`/country/${border}`}
                  className="inline-block rounded-md border border-gray-500/40 px-3 py-1 hover:bg-gray-500/20"
                >
                  {nameByCode.get(border) ?? border}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
