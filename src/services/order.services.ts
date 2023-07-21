import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServicesReponse';
import UserModel from '../database/models/user.model';

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

type NewOrderReturn = {
  userId: number,
  productIds: number[],
};

async function create(
  userId: number,
  productIds: number[],
): Promise<ServiceResponse<NewOrderReturn>> {
  const user = await UserModel.findByPk(userId);
  if (!user) {
    return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  }
  const { dataValues: { id } } = await OrderModel.create({ userId });
  await ProductModel.update({ orderId: id }, { where: { id: productIds } });
  return { status: 'SUCCESSFUL', data: { userId, productIds } };
}

export default {
  list,
  create,
};