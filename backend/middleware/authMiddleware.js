import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export function authenticate(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.error('No token provided'); // Log pour les erreurs
    throw new Error('Authentication required');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token successfully decoded', decoded); // Log pour les succès
    return decoded.userId;
  } catch (error) {
    console.error('Invalid token', error); // Log pour les erreurs
    throw new Error('Authentication failed');
  }
}
