import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json(
      {isValid: false, message: 'Session ID is required'},
      { status: 400 }
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const isValid = session.payment_status === 'paid'

    return NextResponse.json({
      isValid,
      session: {
        payment_status: session.payment_status,
        customer_email: session.customer_email
      }
    })
  } catch (error) {
    console.error('Error verifying session:', error)
    return NextResponse.json(
      {isValid: false, message: 'Failed to verify session'},
      { status: 500 }
    )
  }
}