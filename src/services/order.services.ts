import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServicesReponse';

async function list(): Promise<ServiceResponse<OrderSequelizeModel[]>> {
  const orders = await OrderModel.findAll({
    include: 
      [{ model: ProductModel, as: 'productIds', attributes: [] }],
    attributes:
      ['id', 'userId', [literal('JSON_ARRAYAGG(productIds.id)'), 'productIds']],
    group: ['Order.id'],
    raw: true,
  });
  
  return { status: 'SUCCESSFUL', data: orders };
}

export default {
  list,
};