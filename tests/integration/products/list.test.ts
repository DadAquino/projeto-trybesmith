import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

import productMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';

describe('GET /products', function () { 
  describe('Teste de aplicação', function () {
    it('Testa o retorno se tudo está ok', async function () {
      // arrange
      const mockListReturn = ProductModel.build(productMock.productList[0]);
      sinon.stub(ProductModel, 'findAll').resolves([mockListReturn]);

      // act
      const httpResponse = await chai
        .request(app)
        .get('/products')

      // assert
      expect(httpResponse.status).to.equal(200);
    });
  });

  beforeEach(function () { sinon.restore(); });
});