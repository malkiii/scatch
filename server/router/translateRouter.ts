import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const translateRouter = router({
  translateToEnglish: publicProcedure
    .input(z.object({ text: z.string() }))
    .output(z.string())
    .query(async ({ input }) => {
      const TRANSLATE_API_ENDPOINT = process.env.TRANSLATE_API_ENDPOINT as string;
      const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY as string;

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': TRANSLATE_API_KEY,
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([{ Text: input.text }])
      };

      try {
        const res = await fetch(TRANSLATE_API_ENDPOINT, options);
        const data = await res.json();
        const { text } = data[0].translations[0];

        return text;
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    })
});
