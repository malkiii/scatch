import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const withApiMiddleware =
  (next: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const API_TOKEN = process.env.API_TOKEN as string;

    const isAuthorized = req.headers.token === API_TOKEN;
    if (!isAuthorized) {
      res.status(401).json({ error: 'Unauthorized' });
      return null;
    }

    return next(req, res);
  };

export default withApiMiddleware;
