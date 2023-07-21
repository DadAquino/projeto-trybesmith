import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app'
import { orderToAdd, orderUserIdAsString, orderUserIdWithANumberAsString, orderWithProductIdsDifferentOfNumber, orderWithoutProductIds, orderWithoutUserId} from '../../mocks/order.mock';
import ProductModel from '../../../src/database/models/order.model';
import jwt from '../../../src/utils/jwtGenerator';
import UserModel, { UserSequelizeModel } from '../../../src/database/models/user.model';
import OrderModel from '../../../src/database/models/order.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('teste sem o userID', async function () {
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderWithoutUserId).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" is required' });
  });

  it('teste se o  userId é uma string', async function () {
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderUserIdAsString).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" must be a number' });
  });

  it('testa se userID for em um formato inválido', async function () {
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderUserIdWithANumberAsString).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" must be a number' });
  });

  it('teste sem productIds', async function () {
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderWithoutProductIds).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"productIds" is required' });
  });

  it('teste com productIds em formato inválido', async function () {
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    const httpResponse = await chai.request(app).post('/orders').send(orderWithProductIdsDifferentOfNumber).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: '"productIds" must include only numbers' });
  });

  it('teste sem u userID', async function () {
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    sinon.stub(UserModel, 'findByPk').resolves(null);
    const httpResponse = await chai.request(app).post('/orders').send(orderToAdd).set({ authorization: 'token' });
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: '"userId" not found' });
  });

  it('internal server error', async function () {
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    sinon.stub(UserModel, 'findByPk').throws();
    const httpResponse = await chai.request(app).post('/orders').send(orderToAdd).set({ authorization: 'token' });
    expect(httpResponse).to.have.property('status', 500);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
  });

  it('successful add', async function () {
    const { userId } = orderToAdd;
    const order = OrderModel.build({ userId, id: 1 });
    sinon.stub(jwt, 'verify').returns({ id: 1, username: 'teste' });
    sinon.stub(UserModel, 'findByPk').resolves({} as UserSequelizeModel);
    sinon.stub(ProductModel, 'update').resolves([2]);
    sinon.stub(OrderModel, 'create').resolves(order)
    const httpResponse = await chai.request(app).post('/orders').send(orderToAdd).set({ authorization: 'token' });

    expect(httpResponse).to.have.property('status', 201);
    expect(httpResponse.body).to.be.deep.equal(orderToAdd);
  });
});