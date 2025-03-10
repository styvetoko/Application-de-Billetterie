import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

// Schéma de validation pour l'email et le mot de passe
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), // Exigence d'un mot de passe d'au moins 8 caractères
});

export async function POST(req) {
  try {
    const body = await req.json();

    // Validation des entrées
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ error: "Invalid input", details: validationResult.error.issues }, { status: 400 });
    }

    const { email, password } = validationResult.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Comparaison du mot de passe haché
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return NextResponse.json({ token });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function hashPassword(password) {
  const saltRounds = 10; // Ajuste ce nombre pour la sécurité (plus c'est élevé, plus c'est sûr, mais plus lent)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Exemple d'utilisation lors de la création d'un utilisateur :
async function createUser(email, plainTextPassword) {
  const hashedPassword = await hashPassword(plainTextPassword);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword, // Stocke le mot de passe HACHÉ
    },
  });
  return user;
}