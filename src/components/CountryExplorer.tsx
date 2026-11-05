'use client';
import { CountryCard } from './CountryCards';
import { useState } from 'react';
import type { Country } from '@/lib/countries';

const REGIONS = [
  'All',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
] as const;
type Region = (typeof REGIONS)[number];

type CountryExplorerProps = {
  countries: Country[];
};

export function CountryExplorer({ countries }: CountryExplorerProps) {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All');

  const term = search.trim().toLowerCase();
  const visible = countries.filter((country) => {
    const matchesName = country.name.toLowerCase().includes(term);
    const matchesRegion = region === 'All' || country.region === region;
    return matchesName && matchesRegion;
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search countries by name..."
          className="flex-1 rounded-md border border-gray-400 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={region}
          onChange={(event) => setRegion(event.target.value as Region)}
          className="shrink-0 rounded-md border border-gray-400 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {REGIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-500">
        Showing {visible.length} of {countries.length}
      </p>

      {visible.length === 0 ? (
        <p className="text-gray-500">No countries match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((country) => (
            <CountryCard key={country.cca3 || country.name} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
