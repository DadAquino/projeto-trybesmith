import express from 'express';

// importações
import productsController from './controller/products.controller';
import productsRouter from './routers/products.router';
// importações
const app = express();

app.use(express.json());
app.use(productsRouter);

export default app;

app.get('/products', productsController.newProduct);