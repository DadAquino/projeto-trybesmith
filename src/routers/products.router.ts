import { Router } from 'express';
import productsController from '../controller/products.controller';
import nameValidations from '../midllewares/name.validation';
import priceValidations from '../midllewares/price.validation';

const productsRouter = Router();

productsRouter.post(
  '/products',
  nameValidations,
  priceValidations,
  productsController.newProduct,
);

productsRouter.get('/products', productsController.listAll);

export default productsRouter;