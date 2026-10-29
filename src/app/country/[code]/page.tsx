import { getCountryByCode } from '@/lib/countries';

type CountryPageProps = {
  params: Promise<{ code: string }>;
};

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;
  const country = await getCountryByCode(code);

  return (
    <article className="space-y-2">
      <h1 className="text-3xl font-bold">{country.name}</h1>
      <p>Code from the URL:{code.toUpperCase()}</p>
      <p>Capital : {country.capital}</p>
      <p>Region:{country.region}</p>
      <p>Population: {country.population.toLocaleString(`en-US`)}</p>
    </article>
  );
}
