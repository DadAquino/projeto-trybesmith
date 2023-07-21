import express from 'express';

// importações
import productsRouter from './routers/products.router';
import orderRouter from './routers/order.router';
import loginRouter from './routers/login.router';
// importações
const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(orderRouter);
app.use(loginRouter);

export default app;