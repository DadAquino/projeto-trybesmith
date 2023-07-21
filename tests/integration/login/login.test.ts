import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';

describe('POST /login', function () {
  it('teste a aplicação caso: NAME inválido', async function () {
    // Arrange
    const httpRequestBody = loginMock.noUsernameLoginBody;

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
});

it('teste a aplicação caso: PASSWORD inválido', async function () {

  // Arrange
  const httpRequestBody = loginMock.noPasswordLoginBody;

  // Act
  const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

  // Assert
  expect(httpResponse.status).to.equal(400);
  expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
});

it('teste a aplicação caso: NAME não exista', async function () {
  // Arrange
  const httpRequestBody = loginMock.notExistingUserBody;
  sinon.stub(UserModel, 'findOne').resolves(null);

  // Act
  const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

  // Assert
  expect(httpResponse.status).to.equal(401);
  expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
});

it('teste a aplicação caso: PASSWORD não exista', async function () {
  // Arrange
  const httpRequestBody = loginMock.existingUserWithWrongPasswordBody;
  const mockFindOneReturn = UserModel.build(loginMock.existingUser);

  sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

  // Act
  const httpResponse = await chai.request(app).post('/login')
    .send(httpRequestBody);

  // Assert
  expect(httpResponse.status).to.equal(401);
  expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
});

it('testa a aplicação caso: estiver tudo ok', async function () {
  // Arrange
  const httpRequestBody = loginMock.validLoginBody;
  const mockFindOneReturn = UserModel.build(loginMock.existingUser);

  sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

  // Act
  const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

  // Assert
  expect(httpResponse.status).to.equal(200);
  expect(httpResponse.body).to.have.key('token');
});

it('testa a aplicação caso: erro', async function () {
  // Arrange
  const httpRequestBody = loginMock.invalidLoginBody;
  const mockFindOneReturn = UserModel.build(loginMock.nonExistingUser);

  sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

  // Act
  const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

  // Assert
  expect(httpResponse.status).to.equal(401);
});

  beforeEach(function () { sinon.restore(); });

});