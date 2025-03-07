"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { QrScanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  college: string;
  firebaseUid: string;
}

interface RegisteredUser extends User {
  eventPoints: {
    firstPlace?: boolean;
    secondPlace?: boolean;
    thirdPlace?: boolean;
    fourthPlace?: boolean;
    completedInTime?: boolean;
    participationPoint: boolean;
  }
}

export default function EventAdminPage({ 
  params 
}: { 
  params: Promise<{ eventId: string }> 
}) {
  const router = useRouter();
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [scanTimestamp, setScanTimestamp] = useState<number>(0);
  
  const resolvedParams = use(params);
  const eventId = resolvedParams.eventId;

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem(`event_auth_${eventId}`);
    if (!isAuthenticated) {
      router.push('/1e54615a1b51516d699d55bfd9407ffd');
      toast.error('Please enter the event password first');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(`/api/events/${eventId}`);
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event details');
        }
        
        const eventData = await eventResponse.json();
        if (eventData.success) {
          setEventDetails(eventData.event);
        }

        // Fetch registered users
        const usersResponse = await fetch(`/api/events/${eventId}/users`);
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch registered users');
        }
        
        const usersData = await usersResponse.json();
        if (usersData.success) {
          setRegisteredUsers(usersData.users);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, [eventId, router]);

  // This function will prevent multiple scans of the same QR code
  const handleQrScan = async (result: string) => {
    const now = Date.now();
    
    // Prevent duplicate scans by checking:
    // 1. If we're already processing a scan
    // 2. If this is the same code as the last one scanned
    // 3. If the scan is happening too quickly after the previous one (within 3 seconds)
    if (
      loading || 
      (lastScannedCode === result && now - scanTimestamp < 3000)
    ) {
      return;
    }
    
    // Update scan tracking
    setLastScannedCode(result);
    setScanTimestamp(now);
    setLoading(true);
    
    try {
      console.log('QR Scan result:', result);
      console.log('Registering user for event:', eventId);
      
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: result,
          eventId: eventId
        }),
      });

      console.log('Registration response status:', response.status);
      
      // Get response text for debugging
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response format');
      }
      
      if (data.success) {
        if (data.duplicate) {
          toast.error('User already registered for this event');
        } else {
          // Add user to the list with default participation point
          const newUser: RegisteredUser = {
            ...data.user,
            eventPoints: {
              participationPoint: true
            }
          };
          
          // Check if the user is already in the list to avoid duplicates
          if (!registeredUsers.some(user => user._id === newUser._id)) {
            setRegisteredUsers(prev => [...prev, newUser]);
            toast.success(`${data.user.firstname} ${data.user.lastname} registered successfully`);
          }
        }
      } else {
        throw new Error(data.message || "Failed to register user");
      }
    } catch (error) {
      console.error("Error processing QR code:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process QR code");
    } finally {
      setLoading(false);
      setShowScanner(false);
    }
  };

  const handleCheckboxChange = (userId: string, award: keyof RegisteredUser['eventPoints']) => {
    setRegisteredUsers(prevUsers => 
      prevUsers.map(user => 
        user._id === userId 
          ? { ...user, eventPoints: { ...user.eventPoints, [award]: !user.eventPoints[award] } } 
          : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-purple-500/30">
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {eventDetails?.name || 'Event'} Administration
              </h2>
              <button
                onClick={() => router.push('/1e54615a1b51516d699d55bfd9407ffd')}
                className="bg-white/20 px-3 py-1 rounded-full text-white text-sm hover:bg-white/30 transition-colors"
              >
                Back to Events
              </button>
            </div>
          </div>

          <div className="p-4 text-white">
            <div className="mb-4">
              <button
                onClick={() => setShowScanner(true)}
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Processing..." : "Scan QR Code"}
              </button>
            </div>

            {showScanner && (
              <div className="mb-4 p-4 border border-purple-500/30 rounded-lg bg-gray-800">
                <h4 className="font-medium mb-2">Scan User QR Code</h4>
                <QrScanner
                  onDecode={handleQrScan}
                  onError={(error) => console.error(error)}
                  constraints={{ facingMode: "environment" }}
                  scanDelay={500} // Add delay between scans
                />
                <button
                  onClick={() => setShowScanner(false)}
                  className="mt-2 px-3 py-1 border border-gray-600 rounded-md text-sm hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
            {registeredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No users registered for this event yet. Scan QR codes to register users.
              </div>
            ) : (
              <div className="border border-purple-500/30 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">College</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Awards</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {registeredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          {user.firstname} {user.lastname}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {user.college}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={user.eventPoints?.firstPlace || false}
                                onChange={() => handleCheckboxChange(user._id, 'firstPlace')}
                                className="rounded text-purple-600 bg-gray-700 border-gray-600"
                              />
                              <span className="text-sm text-gray-300">1st</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={user.eventPoints?.secondPlace || false}
                                onChange={() => handleCheckboxChange(user._id, 'secondPlace')}
                                className="rounded text-purple-600 bg-gray-700 border-gray-600"
                              />
                              <span className="text-sm text-gray-300">2nd</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={user.eventPoints?.thirdPlace || false}
                                onChange={() => handleCheckboxChange(user._id, 'thirdPlace')}
                                className="rounded text-purple-600 bg-gray-700 border-gray-600"
                              />
                              <span className="text-sm text-gray-300">3rd</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={user.eventPoints?.fourthPlace || false}
                                onChange={() => handleCheckboxChange(user._id, 'fourthPlace')}
                                className="rounded text-purple-600 bg-gray-700 border-gray-600"
                              />
                              <span className="text-sm text-gray-300">4th</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={user.eventPoints?.completedInTime || false}
                                onChange={() => handleCheckboxChange(user._id, 'completedInTime')}
                                className="rounded text-purple-600 bg-gray-700 border-gray-600"
                              />
                              <span className="text-sm text-gray-300">Completed</span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}