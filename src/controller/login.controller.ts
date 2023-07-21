import { Request, Response } from 'express';
import loginServices from '../services/login.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function login(req: Request, res: Response): Promise<Response> {
  const result = await loginServices.loginVerfication(req.body);

  if (result.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(result.status)).json(result.data);
  }

  return res.status(200).json(result.data);
}

export default {
  login,
};