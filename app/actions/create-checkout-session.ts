'use server';

import { cookies } from "next/headers";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export default async function createCheckoutSession() {
  const sessionId = crypto.randomUUID();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Templates",
            description: "You buy template for your projects.",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      }
    ],
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/store/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/store?canceled=true`,
    metadata: {
      sessionId: sessionId
    }
  })

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  cookies().set('paymentSessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  })

  return session.url
}