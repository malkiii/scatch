import { z } from 'zod';
import { SignUpFormData } from '@/types';
import { ImageAPIRequestQuerySchema } from '@/types/zod';

export function getImageFetchURL(requestQuery: z.infer<typeof ImageAPIRequestQuerySchema>): URL {
  const { API_ENDPOINT } = process.env;
  const endpointName = '/v1/' + requestQuery.endpoint;

  const endpointURL = new URL(endpointName, API_ENDPOINT);
  if (endpointName.includes('/photos')) return endpointURL;

  endpointURL.searchParams.set('page', (requestQuery.page || 1).toString());
  endpointURL.searchParams.set('per_page', (requestQuery.per_page || 24).toString());

  const orientation = requestQuery.orientation || 'all';

  if (endpointName.includes('/search')) endpointURL.searchParams.set('query', endpointName);

  if (orientation != 'all') endpointURL.searchParams.set('orientation', orientation);

  return endpointURL;
}

type CachedData = { user?: any; message: string; error?: string };

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export async function signUp(data: SignUpFormData): Promise<CachedData> {
  const endpointURL = new URL('/api/auth/signup', NEXT_PUBLIC_APP_URL);

  const { firstName, lastName, email, password } = data;
  const name = (firstName.trim() + ' ' + lastName.trim()).trim();

  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  return await response.json();
}

export async function translateToEnglish(text: string): Promise<string> {
  const API_TOKEN = process.env.API_TOKEN as string;

  const endpointURL = new URL('/api/translate', NEXT_PUBLIC_APP_URL);
  endpointURL.searchParams.set('text', text);

  const headers = { token: API_TOKEN };

  const response = await fetch(endpointURL, { headers });
  const { translation } = await response.json();

  return translation;
}

export function createUsernameParam(username: string): string {
  return '@' + username.trim().replace(/\W+/g, '-');
}
