import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const phoneNumber = '5541987938328';
    const messageBody = `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`;
    
    const WhatsAppUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(messageBody)}`;

    return NextResponse.json({ whatsappUrl: WhatsAppUrl }, { status: 200 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}