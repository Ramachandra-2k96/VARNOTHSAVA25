"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // State to hold user details
  
  // Function to get user ID from cookies
  const getUserIdFromCookie = () => {
    const cookies = document.cookie.split('; ');
    const userInfoCookie = cookies.find(cookie => cookie.startsWith('user_info='));
    if (userInfoCookie) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userInfoCookie.split('=')[1]));
        return userInfo.uid;
      } catch (error) {
        console.error('Error parsing user_info cookie:', error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    // Verify the session on the client side
    async function verifySession() {
      try {
        console.log('Verifying session...');
        const response = await fetch('/api/auth/verify-session');
        console.log('Session verification response:', response);
        
        if (!response.ok) {
          console.log('Session verification failed, redirecting to login');
          router.push('/login');
        } else {
          // Fetch user ID from cookie
          const userId = getUserIdFromCookie();
          console.log('User ID from cookie:', userId);
          
          if (userId) {
            // Fetch user details if authenticated
            console.log('Fetching user details for ID:', userId);
            const userResponse = await fetch(`/api/users/${userId}`);
            console.log('User details response:', userResponse);
            
            if (userResponse.ok) {
              const userData = await userResponse.json();
              console.log('User data received:', userData);
              setUser(userData); // Set user details
            } else {
              console.log('Failed to fetch user details');
            }
          } else {
            console.log('No user ID found in cookie');
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in verifySession:', error);
        router.push('/login');
      }
    }
    
    verifySession();
  }, [router]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.firstname || 'No name available'}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>No user details available.</p>
      )}
      {/* Your dashboard content */}
    </div>
  );
} 