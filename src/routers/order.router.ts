import { Router } from 'express';
import orderController from '../controller/order.controller';
import tokenValidation from '../midllewares/token.validation';
import userIdValidation from '../midllewares/userId.validation';
import productsIdValidation from '../midllewares/productsId.validation';

const orderRouter = Router();

orderRouter.get('/orders', orderController.list);
orderRouter.post(
  '/orders', 
  tokenValidation,
  userIdValidation,
  productsIdValidation,
  orderController.newOrder,
);

export default orderRouter;