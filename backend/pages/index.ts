import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, EventInclude } from '@prisma/client';
import { Event } from '@prisma/client';

// Créez une instance de PrismaClient
const prisma = new PrismaClient();

// Gestionnaire pour la route `/api/events` (GET)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const events = await prisma.event.findMany({
                include: {
                    category: true,
                    artist: { select: { name: true } }
                },  // Ajoutez des options de requête supplémentaires ici
            });
            console.log(event);
            await prisma.$disconnect(); // Important: Déconnectez-vous de Prisma après utilisation

            res.status(200).json(events);
        } catch (error: unknown) {
            console.error("Error fetching events:", (error as Error).message);
            res.status(500).json({
                error: 'Failed to fetch events',
                details: error.message // Ajoutez des détails pour le débogage
            });
        }
    } else {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
