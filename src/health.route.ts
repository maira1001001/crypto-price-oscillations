import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ server: 'up' });
});

export default router;
