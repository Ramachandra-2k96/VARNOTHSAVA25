"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type PodiumItem = {
  name: string;
  points: number;
  photoURL?: string;
  subtitle?: string;
};

type MobilePodiumProps = {
  items: PodiumItem[];
  showSubtitle?: boolean;
};

export default function MobilePodium({
  items,
  showSubtitle = true,
}: MobilePodiumProps) {
  if (items.length < 3) {
    return null;
  }

  return (
    <div className="block sm:hidden mb-8">
      <h3 className="text-center text-gray-400 mb-4">Top 3</h3>
      
      {/* First Place */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-b from-yellow-900/40 to-gray-800/80 rounded-lg p-4 mb-2 border-l-4 border-yellow-500"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center border-2 border-yellow-200 overflow-hidden">
              {items[0].photoURL ? (
                <Image
                  src={items[0].photoURL}
                  alt={items[0].name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-yellow-800">1</span>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <p className="font-bold text-yellow-100">{items[0].name}</p>
            {showSubtitle && items[0].subtitle && (
              <p className="text-xs text-yellow-200/70">{items[0].subtitle}</p>
            )}
          </div>
          
          <div className="flex-shrink-0 text-right">
            <p className="text-xl font-bold text-yellow-300">{items[0].points}</p>
            <p className="text-xs text-yellow-200/70">points</p>
          </div>
        </div>
      </motion.div>
      
      {/* Second Place */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/80 rounded-lg p-4 mb-2 border-l-4 border-gray-400"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-2 border-gray-200 overflow-hidden">
              {items[1].photoURL ? (
                <Image
                  src={items[1].photoURL}
                  alt={items[1].name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-gray-800">2</span>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <p className="font-bold text-gray-200">{items[1].name}</p>
            {showSubtitle && items[1].subtitle && (
              <p className="text-xs text-gray-400">{items[1].subtitle}</p>
            )}
          </div>
          
          <div className="flex-shrink-0 text-right">
            <p className="text-xl font-bold text-gray-300">{items[1].points}</p>
            <p className="text-xs text-gray-400">points</p>
          </div>
        </div>
      </motion.div>
      
      {/* Third Place */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/80 rounded-lg p-4 border-l-4 border-amber-700"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center border-2 border-amber-500 overflow-hidden">
              {items[2].photoURL ? (
                <Image
                  src={items[2].photoURL}
                  alt={items[2].name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-amber-100">3</span>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <p className="font-bold text-gray-200">{items[2].name}</p>
            {showSubtitle && items[2].subtitle && (
              <p className="text-xs text-gray-400">{items[2].subtitle}</p>
            )}
          </div>
          
          <div className="flex-shrink-0 text-right">
            <p className="text-xl font-bold text-amber-500">{items[2].points}</p>
            <p className="text-xs text-gray-400">points</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 