import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCountries } from '@/lib/countries';

export async function GET(request: NextRequest) {
  const region = request.nextUrl.searchParams.get('region');

  try {
    const countries = await getCountries();
    const result = region
      ? countries.filter(
          (country) => country.region.toLowerCase() === region.toLowerCase(),
        )
      : countries;

    return NextResponse.json({ count: result.length, countries: result });
  } catch (error) {
    console.error('GET /api/countries failed:', error);
    return NextResponse.json(
      { error: 'Failed to load countries' },
      { status: 500 },
    );
  }
}
