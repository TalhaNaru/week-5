import { getConfig } from '@/lib/config';

export type Country = {
  cca3: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  flag: string;
};

export type CountryDetail = Country & {
  languages: string[];
  borders: string[];
};

type ApiCountry = {
  codes: { alpha_3: string };
  names: { common: string };
  capitals?: { name: string }[];
  population: number;
  region: string;
  flag: { url_svg: string };
};

type ApiCountryDetail = ApiCountry & {
  languages?: unknown[];
  borders?: string[];
};

type ApiResponse<T> = {
  data: { objects: T[]; meta: { more: boolean } };
};

const FIELDS =
  'names.common,capitals,population,region,codes.alpha_3,flag.url_svg';
const DETAIL_FIELDS = `${FIELDS},languages,borders`;
const PAGE_SIZE = 100;

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

function languageName(language: unknown): string | null {
  if (typeof language === 'string') return language;
  if (typeof language !== 'object' || language === null) return null;

  const record = language as Record<string, unknown>;
  const name = record.name;
  if (typeof name === 'string') return name;
  if (typeof name === 'object' && name !== null) {
    const english = (name as Record<string, unknown>).english;
    if (typeof english === 'string') return english;
  }

  const english = record.english_name ?? record.english;
  return typeof english === 'string' ? english : null;
}

function toCountryDetail(item: ApiCountryDetail): CountryDetail {
  return {
    ...toCountry(item),
    languages: (item.languages ?? [])
      .map(languageName)
      .filter((name): name is string => name !== null),
    borders: item.borders ?? [],
  };
}

export async function getCountries(): Promise<Country[]> {
  const { apiKey, apiBaseUrl } = getConfig();
  const all: ApiCountry[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const response = await fetch(
      `${apiBaseUrl}?response_fields=${FIELDS}&limit=${PAGE_SIZE}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const json = (await response.json()) as ApiResponse<ApiCountry>;
    all.push(...json.data.objects);
    more = json.data.meta.more;
    offset += PAGE_SIZE;
  }

  return all.map(toCountry);
}

export async function getCountryByCode(
  code: string,
): Promise<CountryDetail | null> {
  const { apiKey, apiBaseUrl } = getConfig();
  const response = await fetch(
    `${apiBaseUrl}/codes.alpha_3/${encodeURIComponent(code)}?response_fields=${DETAIL_FIELDS}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = (await response.json()) as ApiResponse<ApiCountryDetail>;
  const item = json.data.objects[0];
  return item ? toCountryDetail(item) : null;
}
