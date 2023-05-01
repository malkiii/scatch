import { siteInfos } from '@/data/constants';

export default async function translateToEnglish(
  text: string
): Promise<string> {
  const API_TOKEN = process.env.API_TOKEN as string;

  const endpointURL = new URL('/api/translate', siteInfos.url);
  endpointURL.searchParams.set('text', text);

  const headers = { token: API_TOKEN };

  const response = await fetch(endpointURL, { headers });
  const { translation } = await response.json();

  return translation;
}
