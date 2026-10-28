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

export async function getCountries(): Promise<Country[]> {
  const Apikey = process.env.RESTCOUNTRIES_KEY;
  if (!Apikey) {
    throw new Error('Missing API key: set RESTCOUNTRIES_KEY in .env.local');
  }

  const All: ApiCountry[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const response = await fetch(
      `${BASE_URL}?response_fields=${FIELDS}&limit=${PAGE_SIZE}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${Apikey}` },
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }
    const json = (await response.json()) as ApiResponse;
    All.push(...json.data.objects);
    more = json.data.meta.more;
    offset += PAGE_SIZE;
  }
  return All.map((item) => ({
    cca3: item.codes.alpha_3,
    name: item.names.common,
    capital: item.capitals?.[0]?.name ?? 'N/A',
    population: item.population ?? 0,
    region: item.region,
    flag: item.flag.url_svg,
  }));
}
