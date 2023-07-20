import { Router } from 'express';
import orderController from '../controller/order.controller';

const orderRouter = Router();

orderRouter.get('/orders', orderController.list);

export default orderRouter;