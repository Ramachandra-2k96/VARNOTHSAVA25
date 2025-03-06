import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params
  try {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ firebaseUid: userId })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params
  try {
    const { db } = await connectToDatabase()
    const userData = await request.json()
    
    const result = await db.collection('users').updateOne(
      { firebaseUid: userId },
      { $set: { ...userData, firebaseUid: userId } },
      { upsert: true }
    )
    
    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    )
  }
}