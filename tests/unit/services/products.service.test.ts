import { expect } from 'chai';
import sinon from 'sinon';

import productsService from '../../../src/services/product.services';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/products.mock';

describe('ProductsService', function () {

  describe('/product create', function () {
    it('cria um produto com sucesso', async function () {
      // Arrange
      const mockCreateReturn = ProductModel.build(productMock.productValidFromDB);
      sinon.stub(ProductModel, 'create')
        .resolves(mockCreateReturn);

      // Act
      const serviceResponse = await productsService.create(productMock.productValidFromDB);

      // Assert
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.eq(productMock.productValidFromDB);

    });

    it('caso não tenha o parâmetro name', async function () {
      // Arrange
      const mockCreateReturn = ProductModel.build(productMock.productValidFromDB);
      sinon.stub(ProductModel, 'create')
        .resolves(mockCreateReturn);

      // Act
      const serviceResponse = await productsService.create(productMock.productNameEmpty);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "Name is required"});

    });

    it('caso não tenha o parâmetro price', async function () {
      // Arrange
      const mockCreateReturn = ProductModel.build(productMock.productValidFromDB);
      sinon.stub(ProductModel, 'create')
        .resolves(mockCreateReturn);

      // Act
      const serviceResponse = await productsService.create(productMock.productPriceEmpty);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "Price is required"});

    });

    it('caso não tenha o parâmetro OrderId', async function () {
      // Arrange
      const mockCreateReturn = ProductModel.build(productMock.productValidFromDB);
      sinon.stub(ProductModel, 'create')
        .resolves(mockCreateReturn);

      // Act
      const serviceResponse = await productsService.create(productMock.productOrderIdEmpty);

      // Assert
      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "OrderId is required"});

    });
  });

  beforeEach(function () { sinon.restore(); });
});