import { Request, Response } from 'express';

export const logSleep = (req: Request, res: Response) => {
  // Extract data from the request body
  const { hours, quality, date } = req.body;

  // For now, just send a response back with the received data
  res.status(201).json({
    message: 'Sleep data logged successfully!',
    data: { hours, quality, date },
  });
};