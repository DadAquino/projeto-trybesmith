import express from 'express';

// importações
import productsRouter from './routers/products.router';
import orderRouter from './routers/order.router';
// importações
const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(orderRouter);

export default app;