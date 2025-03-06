import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("varnothsava") // Replace with your database name
    const userData = await request.json()

    // Insert the user data into MongoDB
    const result = await db.collection('users').insertOne({
      ...userData,
      createdAt: new Date(),
    })

    return NextResponse.json({ 
      success: true, 
      userId: result.insertedId 
    })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
} 