import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

chai.use(sinonChai);

import productsService from '../../../src/services/product.services';
import productsController from '../../../src/controller/products.controller';
import productMock from '../../mocks/products.mock';

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('/products create', function () {
    it('Se tudo estiver ok', async function () {
      // Arrange
      req.body = productMock.productValid
      sinon.stub(productsService, 'create').resolves({
        status: 'SUCCESSFUL',
        data: productMock.productValidFromDB
      });

      // Act
      await productsController.newProduct(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(201)
      expect(res.json).to.have.been.calledWith(productMock.productValidFromDB)
    });

    it('Se o paraâmetro NAME estiver vaizo', async function () {
      // Arrange
      req.body = productMock.productNameEmpty
      sinon.stub(productsService, 'create').resolves({
        status: 'INVALID_DATA',
        data: { message: 'Name is required'}
      });

      // Act
      await productsController.newProduct(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(400)
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' })
    });

    it('Se o paraâmetro PRICE estiver vaizo', async function () {
      // Arrange
      req.body = productMock.productPriceEmpty
      sinon.stub(productsService, 'create').resolves({
        status: 'INVALID_DATA',
        data: { message: 'Price is required'}
      });

      // Act
      await productsController.newProduct(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(400)
      expect(res.json).to.have.been.calledWith({ message: 'Price is required' })
    });

    it('Se o paraâmetro DATE estiver vaizo', async function () {
      // Arrange
      req.body = productMock.productOrderIdEmpty
      sinon.stub(productsService, 'create').resolves({
        status: 'INVALID_DATA',
        data: { message: 'OrderId is required'}
      });

      // Act
      await productsController.newProduct(req, res)

      // Assert
      expect(res.status).to.have.been.calledWith(400)
      expect(res.json).to.have.been.calledWith({ message: 'OrderId is required' })
    });
  });
});