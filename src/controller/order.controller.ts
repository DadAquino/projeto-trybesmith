import { Request, Response } from 'express';
import orderServices from '../services/order.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function list(req: Request, res: Response): Promise<Response> {
  const listOrders = await orderServices.list();

  return res.status(200).json(listOrders.data);
}

async function newOrder(req: Request, res: Response): Promise<Response> {
  const result = await orderServices.create(req.body.userId, req.body.productIds);

  return res.status(mapStatusHTTP(result.status)).json(result.data);
}

export default {
  list,
  newOrder,
};