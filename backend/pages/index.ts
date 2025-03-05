import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import Joi from 'joi';
import { format, isValid, parseISO } from 'date-fns';
// Instance unique de Prisma (évite les connexions multiples)
const prisma = new PrismaClient();

const eventSchema = Joi.object({
    name: Joi.string().required(),
    date: Joi.string().required(), // Accepter la date comme une chaîne
    categoryId: Joi.number().required(),
    description: Joi.string().optional(),
    location: Joi.string().optional()
});

type EventData = {
    name: string;
    date: string;
    categoryId: number;
    description?: string;
    location?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                const events = await prisma.event.findMany({
                    include: { eventCategory: true },
                });

                // Sérialiser les dates au format ISO 8601
                const serializedEvents = events.map(event => ({
                    ...event,
                    date: format(event.date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") // Convertir en chaîne ISO
                }));

                return res.status(200).json(serializedEvents);

            case 'POST':
                const body: EventData = JSON.parse(req.body);
                const { error, value } = eventSchema.validate(body);

                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }

                const { name, date, categoryId, description, location } = value;

                // Validation et conversion de la date avec date-fns
                const parsedDate = parseISO(date);
                if (!isValid(parsedDate)) {
                    return res.status(400).json({ error: "Format de date invalide" });
                }

                // Données de création d'événement
                const eventData = {
                    name,
                    date: parsedDate,
                    categoryId,
                    description: description || '', // description optionnelle
                    location: location || '' // location optionnelle
                };

                console.log("eventData", eventData);

                const newEvent = await prisma.event.create({
                    data: eventData
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
        if (error instanceof PrismaClientKnownRequestError) {
            return res.status(400).json({ error: 'Erreur de requête Prisma', details: error.message });
        }
        console.error("Erreur API:", (error as Error).message);
        return res.status(500).json({ error: 'Erreur interne du serveur', details: (error as Error).message });
    }
}
