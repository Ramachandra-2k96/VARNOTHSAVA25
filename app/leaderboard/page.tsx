"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { getCookie } from "cookies-next";
import Podium from "../components/Podium";
import LeaderboardTable from "../components/LeaderboardTable";
import MobilePodium from "../components/MobilePodium";

type User = {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  college: string;
  points: number;
  photoURL?: string;
};

type College = {
  name: string;
  points: number;
};

type LeaderboardData = {
  collegeLeaderboard: College[];
  topUsers: User[];
  lastUpdated: string;
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"colleges" | "individuals">("colleges");
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { width, height } = useWindowSize();
  
  // Get current user from cookie
  useEffect(() => {
    const userInfoCookie = getCookie("user_info");
    if (userInfoCookie) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userInfoCookie as string));
        setCurrentUserId(userInfo.uid);
      } catch (e) {
        console.error("Error parsing user cookie:", e);
      }
    }
  }, []);
  
  // Fetch leaderboard data with React Query for caching
  const { data, isLoading, error, refetch, isFetching } = useQuery<LeaderboardData>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/leaderboard?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      
      const result = await response.json();
      
      // Log the response for debugging
      console.log('Leaderboard API response:', result);
      
      // Ensure we have the expected data structure
      if (!result.collegeLeaderboard || !result.topUsers) {
        console.error('Invalid leaderboard data structure:', result);
        throw new Error('Invalid leaderboard data structure');
      }
      
      return result;
    },
    staleTime: 0, // Always consider data stale to force refresh
    gcTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  // Format name properly
  const formatName = (user: User) => {
    if (user.firstname && user.lastname) {
      return `${user.firstname} ${user.lastname}`;
    } else if (user.firstname) {
      return user.firstname;
    } else if (user.name && !user.name.includes('@')) {
      return user.name;
    } else {
      // If name looks like an email or is missing, show a generic name
      return "Participant";
    }
  };

  // Prepare data for components
  const prepareCollegeData = () => {
    if (!data?.collegeLeaderboard) return [];
    return data.collegeLeaderboard.map(college => ({
      name: college.name,
      points: college.points,
    }));
  };

  const prepareUserData = () => {
    if (!data?.topUsers) return [];
    return data.topUsers.map(user => ({
      id: user.id,
      name: formatName(user),
      points: user.points,
      photoURL: user.photoURL,
      subtitle: user.college,
    }));
  };

  const handleRefresh = () => {
    // Force a complete refresh by invalidating the query cache
    refetch({ cancelRefetch: false });
  };

  const handlePodiumVisible = () => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full mx-auto"
          />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xl"
          >
            Loading leaderboard data...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-red-900/20 p-6 rounded-xl border border-red-700/40 max-w-md"
        >
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error instanceof Error ? error.message : 'Failed to load leaderboard'}</p>
          <button 
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Ensure we have data before rendering
  const collegeData = prepareCollegeData();
  const userData = prepareUserData();

  // Debug output
  console.log('College data length:', collegeData.length);
  console.log('User data length:', userData.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8 overflow-x-hidden">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Varnothsava 2025 Leaderboard
        </motion.h1>
        
        <div className="flex justify-between items-center mb-6">
          {data && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </motion.div>
          )}
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {isFetching ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </>
            )}
          </motion.button>
        </div>
        
        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-full shadow-lg">
            <button
              onClick={() => setActiveTab("colleges")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "colleges"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              College Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("individuals")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "individuals"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              Top 100 Individuals
            </button>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeTab === "colleges" && (
            <div key="colleges-tab">
              {collegeData.length >= 3 ? (
                <>
                  {/* Desktop Podium */}
                  <div className="hidden sm:block w-full overflow-visible">
                    <Podium 
                      items={collegeData.slice(0, 3)} 
                      showSubtitle={false}
                      onVisible={handlePodiumVisible}
                    />
                  </div>
                  
                  {/* Mobile Podium */}
                  <MobilePodium
                    items={collegeData.slice(0, 3)}
                    showSubtitle={false}
                  />
                </>
              ) : (
                <div className="text-center p-4 mb-8 bg-gray-800/30 rounded-lg">
                  <p className="text-gray-400">Not enough college data to display podium</p>
                </div>
              )}
              
              <LeaderboardTable 
                items={collegeData.length >= 3 ? collegeData.slice(3) : collegeData}
                showAvatar={false}
                showSubtitle={false}
                startRank={collegeData.length >= 3 ? 4 : 1}
                emptyMessage="No college data available yet"
              />
            </div>
          )}
          
          {activeTab === "individuals" && (
            <div key="individuals-tab">
              {userData.length >= 3 ? (
                <>
                  {/* Desktop Podium */}
                  <div className="hidden sm:block w-full overflow-visible">
                    <Podium 
                      items={userData.slice(0, 3)} 
                      showSubtitle={true}
                      onVisible={handlePodiumVisible}
                    />
                  </div>
                  
                  {/* Mobile Podium */}
                  <MobilePodium
                    items={userData.slice(0, 3)}
                    showSubtitle={true}
                  />
                </>
              ) : (
                <div className="text-center p-4 mb-8 bg-gray-800/30 rounded-lg">
                  <p className="text-gray-400">Not enough user data to display podium</p>
                </div>
              )}
              
              <LeaderboardTable 
                items={userData.length >= 3 ? userData.slice(3) : userData}
                currentUserId={currentUserId}
                showAvatar={true}
                showSubtitle={true}
                startRank={userData.length >= 3 ? 4 : 1}
                emptyMessage="No user data available yet"
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 