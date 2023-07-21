import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

import orderMock from '../../mocks/order.mock';
import OrderModel from '../../../src/database/models/order.model';

describe('GET /orders', function () {
  describe('teste de aplicação', function () {
    it('teste de retorno da lista de Orders', async function () {
      // arrange
      const mockListReturn = OrderModel.build(orderMock.orderList[0]);
      sinon.stub(OrderModel, 'findAll').resolves([mockListReturn]);

      // act
      const httpResponse = await chai
        .request(app)
        .get('/orders')

      // assert
      expect(httpResponse.status).to.equal(200);
    });
  });

  beforeEach(function () { sinon.restore(); });
});