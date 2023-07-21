import { NextFunction, Request, Response } from 'express';

function userIdValidation(req: Request, res: Response, next: NextFunction): Response | undefined {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }

  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  next();
}

export default userIdValidation;