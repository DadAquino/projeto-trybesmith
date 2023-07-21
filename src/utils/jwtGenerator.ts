import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

const jwtConfig = {
  expiresIn: '7d',
};

type TokenPayload = {
  id: number,
  username: string,
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
}

function verify(token: string): TokenPayload { 
  const data = jwt.verify(token, secret) as TokenPayload; 
  return data; 
}

export default {
  sign,
  verify,
};