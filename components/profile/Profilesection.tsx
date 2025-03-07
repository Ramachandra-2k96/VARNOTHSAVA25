"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import { User, School, Star, Trophy, ChevronRight, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Adjust the import path as necessary

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  college?: string;
  points: number;
}

export default function ProfileSection() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [animatePoints, setAnimatePoints] = useState<boolean>(false);
  const [cachedQR, setCachedQR] = useState<string | null>(null);
  
  // Function to get user ID from cookies
  const getUserIdFromCookie = (): string | null => {
    const cookies = document.cookie.split('; ');
    
    // Try user_info first as it directly contains the uid
    const userInfoCookie = cookies.find(cookie => cookie.startsWith('user_info='));
    if (userInfoCookie) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userInfoCookie.split('=')[1]));
        if (userInfo && userInfo.uid) {
          return userInfo.uid;
        }
      } catch (error) {
        console.error('Error parsing user_info cookie:', error);
      }
    }
    
    // If no user_info cookie with valid uid, return null to trigger server verification
    return null;
  };

  // Handle QR code caching
  useEffect(() => {
    if (!user?._id) return;
    
    // Try to get from localStorage first
    const storedQR = localStorage.getItem(`qr_code_${user._id}`);
    
    if (storedQR) {
      setCachedQR(storedQR);
    } else {
      // If not in cache, create and store it
      localStorage.setItem(`qr_code_${user._id}`, user._id);
      setCachedQR(user._id);
    }
  }, [user]);

  useEffect(() => {
    // Verify the session on the client side
    async function verifySession() {
      try {
        // First, try to get user ID from cookie
        const userId = getUserIdFromCookie();
        
        if (!userId) {
          // If no user ID in cookie, try to verify session with API
          const response = await fetch('/api/auth/verify-session');
          
          if (!response.ok) {
            console.error('Session verification failed');
            router.push('/login');
            return;
          }
          
          // If session verification succeeded but no user ID in cookie,
          // get user ID from response
          const data = await response.json();
          const uid = data.user?.uid;
          
          if (!uid) {
            console.error('No user ID in session response');
            router.push('/login');
            return;
          }
          
          // Fetch user details with the UID from session verification
          const userResponse = await fetch(`/api/users/${uid}`);
          
          if (userResponse.ok) {
            const userData: User = await userResponse.json();
            setUser(userData);
            
            // Trigger points animation when data loads
            setTimeout(() => {
              setAnimatePoints(true);
            }, 500);
          } else {
            console.error('Failed to fetch user data');
            router.push('/login');
          }
        } else {
          // If user ID is in cookie, fetch user details directly
          const userResponse = await fetch(`/api/users/${userId}`);
          
          if (userResponse.ok) {
            const userData: User = await userResponse.json();
            setUser(userData);
            
            // Trigger points animation when data loads
            setTimeout(() => {
              setAnimatePoints(true);
            }, 500);
          } else {
            console.error('Failed to fetch user data');
            router.push('/login');
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in verifySession:', error);
        router.push('/login');
      }
    }
    
    verifySession();
  }, [router]);
  
  const toggleQRCode = () => {
    setShowQR(!showQR);
  };
  
  const navigateToLeaderboard = () => {
    router.push('/leaderboard');
  };

  // Add this function to handle logout
  const handleLogout = async () => {
    // Clear all authentication cookies
    document.cookie = 'auth-token=; path=/; max-age=0; SameSite=Strict';
    document.cookie = 'user_info=; path=/; max-age=0; SameSite=Strict';
    document.cookie = 'session=; path=/; max-age=0; SameSite=Strict';
    
    // Clear any localStorage items if needed
    localStorage.removeItem(`qr_code_${user?._id}`);
    
    // Logout from Firebase
    const firebaseAuth = getAuth();
    await firebaseAuth.signOut().then(() => {
      // Show success message
      toast.success("Successfully logged out!");
      // Redirect to login page
      router.push('/login');
    }).catch((error) => {
      console.error('Error logging out from Firebase:', error);
      toast.error("Logout failed. Please try again.");
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 p-4">
      <div className="max-w-md mx-auto">
        {/* Profile Section - Exactly as drawn in the mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-4"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Profile</h2>
              <div className="bg-white/20 p-2 rounded-full">
                <User size={22} className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                {user?.firstname?.[0]}{user?.lastname?.[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{user?.firstname} {user?.lastname}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <School size={14} className="mr-1" />
                  <p>{user?.college || 'No college available'}</p>
                </div>
              </div>
            </div>
            
            {/* Dedicated Show QR button as per drawing */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleQRCode}
              className="w-full mb-4 bg-indigo-50 border border-indigo-100 text-indigo-700 py-2 px-4 rounded-lg font-medium flex items-center justify-center shadow-sm"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2"
              >
                <rect width="5" height="5" x="3" y="3" rx="1" />
                <rect width="5" height="5" x="16" y="3" rx="1" />
                <rect width="5" height="5" x="3" y="16" rx="1" />
                <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                <path d="M21 21v.01" />
                <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                <path d="M3 12h.01" />
                <path d="M12 3h.01" />
                <path d="M12 16v.01" />
                <path d="M16 12h1" />
                <path d="M21 12v.01" />
                <path d="M12 21v-1" />
              </svg>
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </motion.button>
            
            <AnimatePresence>
              {showQR && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 bg-gray-50 p-3 rounded-lg flex flex-col items-center"
                >
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <QRCode value={cachedQR || user?._id || 'No ID available'} size={150} level="H" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">Scan at event checkpoints</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 flex items-center text-sm">
                  <Star size={14} className="mr-1 text-amber-400" />
                  Total Points
                </span>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: animatePoints ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm"
                >
                  {user?.points || 0}
                </motion.div>
              </div>
              
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((user?.points || 0) / 10, 100)}%` }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                ></motion.div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={navigateToLeaderboard}
              className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-between shadow-md"
            >
              <div className="flex items-center">
                <Trophy size={16} className="mr-2" />
                Leaderboard
              </div>
              <ChevronRight size={16} />
            </motion.button>
            
            {/* Add Logout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="mt-3 w-full bg-gray-100 text-gray-700 border border-gray-200 py-2 px-4 rounded-lg font-medium flex items-center justify-between shadow-sm hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center">
                <LogOut size={16} className="mr-2" />
                Logout
              </div>
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}