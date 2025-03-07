import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// Define event interface with string ID
interface Event {
  _id: string;
  name: string;
  description: string;
  points: number;
  date: string;
  password: string;
}

export async function POST() {
  try {
    const { db } = await connectToDatabase();
    
    // Clear existing events
    await db.collection('events').deleteMany({});
    
    // Insert sample events with string IDs
    const eventsCollection = db.collection<Event>('events');
    const result = await eventsCollection.insertMany([
      {
        _id: 'event1',
        name: 'Coding Competition',
        description: 'Competitive programming challenge',
        points: 50,
        date: '2024-03-15',
        password: 'code123'
      },
      {
        _id: 'event2',
        name: 'Hackathon',
        description: '24-hour coding marathon',
        points: 100,
        date: '2024-03-20',
        password: 'hack456'
      },
      {
        _id: 'event3',
        name: 'Tech Talk',
        description: 'Industry experts sharing knowledge',
        points: 30,
        date: '2024-03-25',
        password: 'tech789'
      }
    ] as Event[]);

    return NextResponse.json({ 
      success: true, 
      message: 'Events initialized successfully',
      insertedCount: result.insertedCount
    });
  } catch (error) {
    console.error('Error initializing events:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initialize events',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 