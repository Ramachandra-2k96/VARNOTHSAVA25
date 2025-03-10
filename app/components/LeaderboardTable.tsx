"use client";

import { motion } from "framer-motion";
import LeaderboardCard from "./LeaderboardCard";

type TableItem = {
  id?: string;
  name: string;
  points: number;
  photoURL?: string;
  subtitle?: string;
};

type LeaderboardTableProps = {
  items: TableItem[];
  currentUserId?: string | null;
  showAvatar?: boolean;
  showSubtitle?: boolean;
  startRank?: number;
  emptyMessage?: string;
};

export default function LeaderboardTable({
  items,
  currentUserId = null,
  showAvatar = true,
  showSubtitle = true,
  startRank = 1,
  emptyMessage = "No data available yet",
}: LeaderboardTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 0.4 }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-xl"
    >
      <div className="p-4 bg-gray-800/50 border-b border-gray-700/50 flex justify-between font-bold">
        <div className="w-16 text-center">#</div>
        {showAvatar && <div className="w-12"></div>}
        <div className="flex-1">Name</div>
        {showSubtitle && <div className="w-1/3 hidden md:block">Details</div>}
        <div className="w-24 text-center">Points</div>
      </div>
      
      <div className="max-h-[50vh] overflow-y-auto">
        {items.length > 0 ? (
          items.map((item, index) => (
            <LeaderboardCard
              key={item.id || `${item.name}-${index}`}
              rank={startRank + index}
              name={item.name}
              points={item.points}
              photoURL={showAvatar ? item.photoURL : undefined}
              subtitle={showSubtitle ? item.subtitle : undefined}
              isCurrentUser={currentUserId ? item.id === currentUserId : false}
              delay={0.1 + index * 0.02}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-400">{emptyMessage}</div>
        )}
      </div>
    </motion.div>
  );
} 