export type Country = {
  cca3: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  flag: string;
};

type ApiCountry = {
  codes: { alpha_3: string };
  names: { common: string };
  capitals?: { name: string }[];
  population: number;
  region: string;
  flag: { url_svg: string };
};

type ApiResponse = {
  data: { objects: ApiCountry[]; meta: { more: boolean } };
};

const BASE_URL = 'https://api.restcountries.com/countries/v5';
const FIELDS =
  'names.common,capitals,population,region,codes.alpha_3,flag.url_svg';
const PAGE_SIZE = 100;

function GetApiKey(): string {
  const apikey = process.env.RESTCOUNTRIES_KEY;
  if (!apikey) {
    throw new Error('Missing API key: set RESTCOUNTRIES_KEY in .env.local');
  }
  return apikey;
}

function toCountry(item: ApiCountry): Country {
  return {
    cca3: item.codes.alpha_3,
    name: item.names.common,
    capital: item.capitals?.[0]?.name ?? 'N/A',
    population: item.population ?? 0,
    region: item.region,
    flag: item.flag.url_svg,
  };
}
export async function getCountries(): Promise<Country[]> {
  const apiKey = GetApiKey();
  const all: ApiCountry[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const response = await fetch(
      `${BASE_URL}?response_fields=${FIELDS}&limit=${PAGE_SIZE}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const json = (await response.json()) as ApiResponse;
    all.push(...json.data.objects);
    more = json.data.meta.more;
    offset += PAGE_SIZE;
  }
  return all.map(toCountry);
}
export async function getCountryByCode(code: string): Promise<Country> {
  //await new Promise((resolve) => setTimeout(resolve, 5000)); just to see the loading that we add
  const response = await fetch(
    `${BASE_URL}/codes.alpha_3/${encodeURIComponent(code)}?response_fields=${FIELDS}`,
    {
      headers: { Authorization: `Bearer ${GetApiKey()}` },
      cache: 'no-store',
    },
  );
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const json = (await response.json()) as ApiResponse;
  const item = json.data.objects[0];
  if (!item) {
    throw new Error(`No country found for code "${code}"`);
  }
  return toCountry(item);
}
