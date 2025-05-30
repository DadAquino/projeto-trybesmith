import ProductModel, { ProductInputtableTypes,
  ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServicesReponse';

function validateParams({ name, price, orderId }: ProductInputtableTypes): string | null {
  if (!name) return 'Name is required';
  if (!price) return 'Price is required';
  if (!orderId) return 'OrderId is required';
  
  return null;
}

async function create(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;

  const error = validateParams(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };

  return responseService;
}

async function list(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const listOfProducts = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: listOfProducts };
}

export default {
  create,
  list,
};