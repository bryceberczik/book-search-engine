import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

export const authenticateToken = ({ req }: any) => {
  
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) token = token.split(' ').pop().trim();
  if (!token) return req;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    req.user = decodedToken;
  } catch (err) {
    console.log(err);
    console.log('Invalid token');
  }

  return req;
};

export const signToken = (username: string, email: string, _id: string) => {
  const payload: JwtPayload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};