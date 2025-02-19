import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, EventCreateInput, Event } from '@prisma/client';

// Instance unique de Prisma (évite les connexions multiples)
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                const events = await prisma.event.findMany({
                    include: { category: true }
                });
                return res.status(200).json(events);

            case 'POST':
                const body = JSON.parse(req.body);
                const { name, date, categoryId, category }: {name: string, date: string, categoryId: number, category: Event} = body;

                // Vérification des données
                if (!name || !date || !categoryId || !category) {
                    return res.status(400).json({ error: 'Données incomplètes' });
                }

                //Conversion de la date en objet Date
                const dateObject = new Date(date);

                console.log(category)

                const newEvent = await prisma.event.create({
                    data: { name, date: dateObject, categoryId, category }
                });


                return res.status(201).json(newEvent);

            case 'DELETE':
                const eventId = req.query.id as string;

                // Vérification de l'ID valide
                if (!eventId || isNaN(parseInt(eventId))) {
                    return res.status(400).json({ error: "ID invalide" });
                }

                const deletedEvent = await prisma.event.delete({
                    where: { id: parseInt(eventId) }
                });

                return res.status(200).json(deletedEvent);

            default:
                return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
        }
    } catch (error: unknown) {
        console.error("Erreur API:", (error as Error).message);
        return res.status(500).json({ error: 'Erreur interne du serveur', details: (error as Error).message });
    }
}
