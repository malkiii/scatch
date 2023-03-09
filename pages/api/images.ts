import { NextApiRequest, NextApiResponse } from 'next';

function getFetchURL({ e, q, p }: any) {
  const endpointName = e;
  const { API_ENDPOINT } = process.env;
  const searchParams = new URLSearchParams({
    page: p || '1',
    per_page: '24'
  });
  if (endpointName == 'search') searchParams.append('query', q);
  return `${API_ENDPOINT}/${endpointName}?${searchParams}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_KEY = process.env.API_KEY as string;
  const fetchURL = getFetchURL(req.query);

  try {
    const response = await fetch(fetchURL, {
      headers: {
        Authorization: API_KEY
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
