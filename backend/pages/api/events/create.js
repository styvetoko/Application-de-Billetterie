import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { parseISO, isValid } from 'date-fns'; // Pour une analyse de date robuste

const prisma = new PrismaClient();

// Définir un schéma pour la validation des données d'événement
const eventSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères." }),
  description: z.string().optional(),
  date: z.string(),
  location: z.string().optional(),
  categoryId: z.number().int().positive() // S'assurer que categoryId est un entier positif
});

export async function POST(req) {
  try {
    const body = await req.json();

    // Valider le corps de la requête par rapport au schéma
    const validationResult = eventSchema.safeParse(body);

    if (!validationResult.success) {
      // Renvoyer les erreurs de validation
      return NextResponse.json({ error: "Entrée invalide", details: validationResult.error.issues }, { status: 400 });
    }

    const { name, description, date, location, categoryId } = validationResult.data;

    // Analyser la chaîne de date en un objet Date en utilisant date-fns
    const parsedDate = parseISO(date);

    if (!isValid(parsedDate)) {
      return NextResponse.json({ error: "Format de date invalide" }, { status: 400 });
    }

    // Vérification de l'existence de la catégorie
    const category = await prisma.eventCategory.findUnique({ where: { id: categoryId } });
    if (!category) {
      return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 });
    }

    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: parsedDate,
        location,
        categoryId
      },
    });

    return NextResponse.json(event, { status: 201 });

  } catch (error) {
    console.error("Erreur de création d'événement:", error);
    return NextResponse.json({ error: 'Échec de la création de l\'événement', details: error.message }, { status: 500 }); // Inclure les détails de l'erreur
  }
}