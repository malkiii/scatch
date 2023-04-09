export default async function translateToEnglish(
  text: string
): Promise<string> {
  const { HOSTNAME } = process.env;
  const API_TOKEN = process.env.API_TOKEN as string;

  const fetchURL = `${HOSTNAME}/api/translate?text=${text}`;
  const headers = { token: API_TOKEN };

  const response = await fetch(fetchURL, { headers });
  const { translation } = await response.json();

  return translation;
}
