import { getCountries } from '@/lib/countries';
import { ClickCounter } from '@/components/ClickCounter';

export default async function HomePage() {
  const Countries = await getCountries();
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Country Explorer</h1>
      <p>Countires loaded on the server{Countries.length}</p>
      <ClickCounter />
      <ul className="columns-2 gap-6 text-sm md:columns-3">
        {Countries.map((country) => (
          <li key={country.cca3 || country.name}>{country.name}</li>
        ))}
      </ul>
    </section>
  );
}
