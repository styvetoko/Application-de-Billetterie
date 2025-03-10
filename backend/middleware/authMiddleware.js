import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'; // Importation de NextResponse pour gérer les réponses HTTP

const SECRET_KEY = process.env.JWT_SECRET; // Récupération de la clé secrète JWT à partir des variables d'environnement

// Vérification que la clé secrète est définie
if (!SECRET_KEY) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export function authenticate(req) {
  // Extraction du token JWT de l'en-tête Authorization
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.error('No token provided'); // Log pour les erreurs
    return NextResponse.json({ error: 'Authentication required: No token provided' }, { status: 401 });
  }

  try {
    // Vérification et décodage du token JWT
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token successfully decoded', decoded); // Log pour les succès
    return decoded.userId; // Retourne l'ID utilisateur extrait du token
  } catch (error) {
    console.error('Invalid token', error); // Log pour les erreurs
    return NextResponse.json({ error: 'Authentication failed: Invalid token' }, { status: 401 });
  }
}
