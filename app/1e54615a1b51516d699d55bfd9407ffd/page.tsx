"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";

interface Event {
  _id: string;
  name: string;
  description: string;
  points: number;
  date: string;
}

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();

        if (data.success) {
          setEvents(data.events);
        } else {
          setError(data.message || 'Failed to fetch events');
        }
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (!selectedEvent) return;
      
      // Get the event to check password
      const response = await fetch(`/api/events/${selectedEvent}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      
      const data = await response.json();
      
      if (data.success && data.event.password === password) {
        // Store auth in session and redirect
        sessionStorage.setItem(`event_auth_${selectedEvent}`, 'true');
        router.push(`/1e54615a1b51516d699d55bfd9407ffd/events/${selectedEvent}/admin`);
      } else {
        toast.error('Incorrect password');
        setIsSubmitting(false); // Reset submission state on error
      }
    } catch (error) {
      toast.error('Failed to authenticate');
      setIsSubmitting(false); // Reset submission state on error
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4 flex items-center justify-center">
        <div className="text-white">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4 flex items-center justify-center">
        <div className="text-white">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-4 border border-purple-500/30"
        >
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4">
            <h2 className="text-xl font-bold text-white">Event Management</h2>
            <div className="text-white/70 text-sm mt-1">
              Total Events: {events.length}
            </div>
          </div>
          
          <div className="p-4">
            {events.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No events found.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {events.map((event) => (
                  <motion.div
                    key={event._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEventClick(event._id)}
                    className="border border-purple-500/30 rounded-lg p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  >
                    <h4 className="font-bold text-white">{event.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{event.date}</span>
                      <span className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded-full">
                        {event.points} points
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-purple-500/30"
          >
            <h3 className="text-xl font-bold mb-4 text-white">Enter Event Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter password"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors disabled:bg-purple-900 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}