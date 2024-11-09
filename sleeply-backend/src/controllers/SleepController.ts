import { Request, Response } from 'express';

export const logSleep = (req: Request, res: Response) => {
  const { sleepDuration, sleepQuality } = req.body;
  // Here, you would handle saving sleep data to the database
  res.status(201).json({ message: 'Sleep data logged successfully' });
};
