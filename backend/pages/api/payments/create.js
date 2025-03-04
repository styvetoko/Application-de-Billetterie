import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount, currency, ticketId } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}