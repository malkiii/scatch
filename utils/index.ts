import { SignUpFormData } from '@/types';
import { ImageAPIRequestQuery } from '@/types';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export function getImageFetchURL(requestQuery: ImageAPIRequestQuery): URL {
  const { API_ENDPOINT } = process.env;
  const { endpoint, query, orientation, page, per_page } = requestQuery;

  const endpointName = '/v1' + endpoint;
  const endpointURL = new URL(endpointName, API_ENDPOINT);
  if (endpointName.includes('/photos')) return endpointURL;

  endpointURL.searchParams.set('page', (page || 1).toString());
  endpointURL.searchParams.set('per_page', (per_page || 24).toString());

  if (query && endpointName.includes('/search')) endpointURL.searchParams.set('query', query);
  if (orientation && orientation != 'all') endpointURL.searchParams.set('orientation', orientation);

  return endpointURL;
}

type CachedData = { user?: any; message: string; error?: string };
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

export function createUsernameParam(username: string): string {
  return '@' + username.trim().replace(/\W+/g, '-');
}
