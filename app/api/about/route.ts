import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/utils/authOptions'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const about = await prisma.about.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(about)
  } catch (error) {
    console.error('Error fetching about:', error)
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 })    
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, description, imageUrl, content } = await req.json()

    const userId = session.user?.id

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 })
    }

    const about = await prisma.about.create({
      data: {
        title,
        description,
        imageUrl,
        content,
        userId
      }
    })

    return NextResponse.json(about, { status: 201 })
  } catch (error) {
    console.error('Error creating about:', error)
    return NextResponse.json({ error: 'Failed to create about' }, { status: 500 })    
  }
}