import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Define the Event interface
interface Event {
  _id: string | ObjectId;
  name: string;
  description: string;
  points: number;
  date: string;
  password: string;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ eventId: string }> }
) {
  try {
    // Await the params Promise
    const params = await context.params;
    const eventId = params.eventId;

    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Try to find by string ID first
    const eventsCollection = db.collection<Event>('events');
    let event = await eventsCollection.findOne({ _id: eventId } as any);
    
    // If not found, try with ObjectId (for backward compatibility)
    if (!event) {
      try {
        event = await eventsCollection.findOne({ _id: new ObjectId(eventId) });
      } catch (err) {
        // Invalid ObjectId format, ignore this error
      }
    }

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}