import { NextApiRequest, NextApiResponse } from 'next';

function getFetchURL({ e, q, p, o }: any) {
  const endpointName = e;
  const orientation = o == 'all' ? '' : o;
  const { API_ENDPOINT } = process.env;
  const searchParams = new URLSearchParams({
    page: p || '1',
    per_page: '24'
  });
  if (endpointName == 'search') searchParams.append('query', q);
  if (orientation) searchParams.append('orientation', orientation);

  return `${API_ENDPOINT}/${endpointName}?${searchParams}`;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const API_TOKEN = process.env.API_TOKEN as string;
  const isAuthorized = request.headers.token === API_TOKEN;
  if (!isAuthorized) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const fetchURL = getFetchURL(request.query);
  const options = {
    method: 'GET',
    headers: {
      Authorization: API_TOKEN
    }
  };

  try {
    const res = await fetch(fetchURL, options);
    const data = await res.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json(error);
  }
}
