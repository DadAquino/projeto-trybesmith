import { NextFunction, Request, Response } from 'express';

function productsIdValidation(req: Request, res: Response, next: NextFunction):
Response | undefined {
  const { productIds } = req.body;
  
  if (!productIds) {
    return res.status(400).json({ message: '"productIds" is required' });
  }
  
  if (typeof productIds !== 'object') {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }

  if (productIds.length === 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }

  next();
}

export default productsIdValidation;