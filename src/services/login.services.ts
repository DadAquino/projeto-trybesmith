import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServicesReponse';
import { Token } from '../types/Token';
import jwtGenerator from '../utils/jwtGenerator';

async function loginVerfication(login: Login): Promise<ServiceResponse<Token>> {
  console.log(login);
  if (!login.username || !login.password) {
    return { 
      status: 'INVALID_DATA', 
      data: { message: '"username" and "password" are required' } };
  }

  const verify = await UserModel.findOne({ where: { username: login.username } });

  if (!verify || !bcrypt.compareSync(login.password, verify.dataValues.password)) {
    return { 
      status: 'UNAUTHORIZED', 
      data: { message: 'Username or password invalid' } };
  }

  const { id, username } = verify.dataValues;

  const token = jwtGenerator.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  loginVerfication,
};