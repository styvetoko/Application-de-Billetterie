import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import Joi from 'joi';

// Initialisation de Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Définition du schéma de validation pour les paiements
const paymentSchema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    ticketId: Joi.number().required()
});

// Fonction pour gérer les requêtes POST
export async function POST(req) {
    // Validation des données de la requête
    const { error, value } = paymentSchema.validate(await req.json());
    if (error) {
        // Retourne une réponse d'erreur si la validation échoue
        return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    const { amount, currency, ticketId } = value;

    try {
        // Création d'une intention de paiement avec Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        // Retourne le client secret de l'intention de paiement
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        // Gestion des erreurs de paiement
        console.error("Payment error:", error);
        return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
    }
}