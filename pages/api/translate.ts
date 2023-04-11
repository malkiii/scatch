import { NextApiRequest, NextApiResponse } from 'next';
import withApiMiddleware from '../../utils/middlewares/withApiMiddleware';

const translateEndpointURL =
  'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=en&api-version=3.0&profanityAction=NoAction&textType=plain';

export default withApiMiddleware(
  async (request: NextApiRequest, response: NextApiResponse) => {
    const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY as string;
    const requestText = request.query.text;

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': TRANSLATE_API_KEY,
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: JSON.stringify([{ Text: requestText }])
    };

    try {
      const res = await fetch(translateEndpointURL, options);
      const data = await res.json();
      const { text } = data[0].translations[0];

      response.status(200).json({ translation: text });
    } catch (error) {
      response.status(500).json({ error, translation: requestText });
    }
  }
);
