import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

import productMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';

describe('POST /products', function () {
  describe('Teste da aplicação', function () {
    it('Testa se o produto é criado corretamente', async function () {
      // arrange
      const mockCreateReturn = ProductModel.build(productMock.productValid);
      sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

      // act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(productMock.productValid)

      // assert
      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.be.deep.equal(productMock.productValid);
    });
  });

  describe('Testa os casos de erro', function () {
    it('se o parâmetro Name estiver vazio', async function () {

      // arrange
      const mockFindOneReturn = ProductModel.build(productMock.productNameEmpty);
      sinon.stub(ProductModel, 'findOne').resolves(mockFindOneReturn);

      // act
      const httpResponse = await chai
      .request(app)
      .post('/products')
      .send(productMock.productNameEmpty)

      // assert
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: '"name" is required'});
    });

    it('se o parâmetro Price estiver vazio', async function () {
      // arrange
      const mockFindOneReturn = ProductModel.build(productMock.productPriceEmpty);
      sinon.stub(ProductModel, 'findOne').resolves(mockFindOneReturn);

      // act
      const httpResponse = await chai
      .request(app)
      .post('/products')
      .send(productMock.productPriceEmpty)

      // assert
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: '"price" is required'});
    });

    it('se o parâmetro OrderID estiver vazio', async function () {
      // arrange
      const mockFindOneReturn = ProductModel.build(productMock.productOrderIdEmpty);
      sinon.stub(ProductModel, 'findOne').resolves(mockFindOneReturn);

      // act
      const httpResponse = await chai
      .request(app)
      .post('/products')
      .send(productMock.productOrderIdEmpty)

      // assert
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: 'OrderId is required'});
    });
  });

  beforeEach(function () { sinon.restore(); });
});