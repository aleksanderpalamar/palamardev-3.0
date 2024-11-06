import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const templatePath = path.join(process.cwd(), 'public', 'templates', 'template.zip');
    const templateBuffer = fs.readFileSync(templatePath);

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="template.zip"`);
    headers.set('Content-Type', 'application/zip');

    return new NextResponse(templateBuffer, {
      status: 200,
      headers,
    })    
  } catch (error) {
    console.error('Error downloading template:', error)
    return NextResponse.json({ error: 'Failed to download template' }, { status: 500 })    
  }
}