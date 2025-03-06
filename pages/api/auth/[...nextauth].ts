import { auth } from '@/lib/firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { token } = req.body
    
    // Verify the Firebase token
    const decodedToken = await auth.verifyIdToken(token)
    
    // Set session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await auth.createSessionCookie(token, { expiresIn })
    
    res.setHeader(
      'Set-Cookie',
      `session=${sessionCookie}; Max-Age=${expiresIn}; Path=/; HttpOnly; Secure; SameSite=Lax`
    )
    
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
} 