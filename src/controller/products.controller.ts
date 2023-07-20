import { Request, Response } from 'express';
import productServices from '../services/product.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function newProduct(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;

  const serviceResponse = await productServices.create({ name, price, orderId });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(201).json(serviceResponse.data);
}

export default {
  newProduct,
};