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
    console.log('Retrieving session:', sessionId)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    })

    const email = session.customer_details?.email

    const isValid = session.payment_status === 'paid'

    if (!email) {
      console.error('No customer email found in session:', sessionId)
      return NextResponse.json({
        isValid: false,
        message: 'Costumer email not found in session'
      })
    }

    const response = {
      isValid,
      session: {
        payment_status: session.payment_status,
        customer_email: email
      }
    }

    console.log('Sending response to client:', response)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Error verifying session:', error)
    return NextResponse.json(
      {isValid: false, message: 'Failed to verify session'},
      { status: 500 }
    )
  }
}