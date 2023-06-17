import { authOptions } from './auth';
import { getServerSession } from 'next-auth';

export async function getCurrentSession({ req, res }: any) {
  return await getServerSession(req, res, authOptions);
}
