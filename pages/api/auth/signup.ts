import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db/client';
import { getHashedPassword } from '@/utils';

export default async function signUpRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed!' });

  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) return res.status(409).json({ error: 'This email is already exists!' });

    // Hash the password
    const hashedPassword = await getHashedPassword(password);

    // Create the new user
    const newUser = await db.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
