import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function getCurrentSession({ req, res }: any) {
  return await getServerSession(req, res, authOptions);
}
