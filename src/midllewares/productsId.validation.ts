import { NextFunction, Request, Response } from 'express';

function productsIdValidation(req: Request, res: Response, next: NextFunction):
Response | undefined {
  const { productsId } = req.body;
  
  if (!productsId) {
    return res.status(400).json({ message: '"productsId" is required' });
  }
  
  if (typeof productsId !== 'number') {
    return res.status(422).json({ message: '"productsId" must be a number' });
  }

  next();
}

export default productsIdValidation;