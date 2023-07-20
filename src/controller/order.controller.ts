import { Request, Response } from 'express';
import orderServices from '../services/order.services';

async function list(req: Request, res: Response): Promise<Response> {
  const listOrders = await orderServices.list();

  return res.status(200).json(listOrders.data);
}

export default {
  list,
};