import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  try {
    const sessionCookie = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('session='))?.split('=')[1];
    
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    // Verify the session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie);
    
    // The session is valid
    return NextResponse.json({ 
      authenticated: true,
      user: {
        uid: decodedClaims.uid,
        email: decodedClaims.email
      }
    });
  } catch (error) {
    // The session is invalid
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
} 