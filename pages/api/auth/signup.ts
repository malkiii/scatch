import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db/client';
import { hash } from 'bcryptjs';

export default async function signUpRequest(req: NextApiRequest, res: NextApiResponse) {
  const errorResposne = (type: 'Method' | 'Email' | 'Server', message: string, status: number) => {
    res.status(status).json({ error: type, message });
  };

  if (req.method !== 'POST') return errorResposne('Method', 'Method Not Allowed', 405);

  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) return errorResposne('Email', 'User already exists', 409);

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Create the new user
    const newUser = await db.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return errorResposne('Server', 'Internal Server Error', 500);
  }
}
