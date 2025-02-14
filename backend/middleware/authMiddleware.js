import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export function authenticate(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
}