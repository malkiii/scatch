import { siteInfos } from '@/data/constants';
import { SignUpFormData } from '@/types';

type CachedData = { user?: any; message: string; error?: string };

export default async function signUp(data: SignUpFormData): Promise<CachedData> {
  const endpointURL = new URL('/api/auth/signup', siteInfos.url);

  const { firstName, lastName, email, password } = data;
  const name = firstName + ' ' + lastName;

  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  return await response.json();
}
