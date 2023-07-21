import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwtGenerator';

export default (req: Request, res: Response, next: NextFunction): Response | undefined => {
  try {
    const { authorization } = req.headers;
    if (!authorization) { 
      return res.status(401).json({ message: 'Token not found' }); 
    }
    const arrayWithToken = authorization.split(' ');
    const decoded = jwt.verify(arrayWithToken[arrayWithToken.length - 1] as string);
    res.locals = { ...res.locals, user: decoded };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};