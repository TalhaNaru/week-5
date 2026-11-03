export function getConfig() {
  const apiKey = process.env.RESTCOUNTRIES_KEY;
  if (!apiKey) {
    throw new Error('Missing API key: set RESTCOUNTRIES_KEY in .env.local');
  }
  return {
    apiKey,
    apiBaseUrl:
      process.env.RESTCOUNTRIES_API_URL ??
      'https://api.restcountries.com/countries/v5',
  };
}
