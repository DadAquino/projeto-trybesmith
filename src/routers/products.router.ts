import { Router } from 'express';
import productsController from '../controller/products.controller';

const productsRouter = Router();

productsRouter.post('/products', productsController.newProduct);
productsRouter.get('/products', productsController.listAll);

export default productsRouter;