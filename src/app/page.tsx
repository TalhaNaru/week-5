import { getCountries } from '@/lib/countries';
import { CountryExplorer } from '@/components/CountryExplorer';

export default async function HomePage() {
  const countries = await getCountries();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Country Explorer</h1>
      <CountryExplorer countries={countries} />
    </section>
  );
}
