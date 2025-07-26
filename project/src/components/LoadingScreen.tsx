import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [allMessages, setAllMessages] = useState<string[]>([]);

  const bootMessages = [
    'NEURAL_NET.EXE v2.1.7',
    'Initializing quantum processors...',
    'Establishing secure connection...',
    'Bypassing firewall protocols...',
    'Accessing mainframe database...',
    'Decrypting portfolio data...',
    'Loading neural pathways...',
    'Synchronizing with the grid...',
    'SYSTEM READY',
    'WELCOME TO THE MATRIX'
  ];

  useEffect(() => {
    console.log('LoadingScreen mounted');
    
    const interval = setInterval(() => {
      console.log('Interval tick, messageIndex:', messageIndex);
      
      if (messageIndex < bootMessages.length) {
        const newMessage = bootMessages[messageIndex];
        console.log('Adding message:', newMessage);
        
        setAllMessages(prev => [...prev, newMessage]);
        setMessageIndex(prev => prev + 1);
      } else {
        console.log('Loading complete, calling onComplete');
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 500);

    return () => {
      console.log('LoadingScreen cleanup');
      clearInterval(interval);
    };
  }, [messageIndex, onComplete]);

  const progress = (messageIndex / bootMessages.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Matrix rain background */}
      <div className="absolute inset-0 opacity-20">
        <div className="cyberpunk-grid"></div>
        <div className="scan-lines"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-8 sm:mb-12 neon-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ 
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
        >
          TALHA_SHAIKH.EXE
        </motion.h1>
        
        <div className="terminal-window p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-400 text-xs sm:text-sm">SYSTEM_TERMINAL_01</span>
            <div className="flex space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-left mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
            {allMessages.map((message, index) => (
              <motion.p 
                key={index}
                className="text-green-400 text-xs sm:text-sm mb-1 break-words"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-green-400">{'>'}</span> {message}
              </motion.p>
            ))}
            {messageIndex < bootMessages.length && (
              <p className="text-green-400 text-xs sm:text-sm">
                <span className="text-green-400">{'>'}</span> 
                <span className="animate-pulse">█</span>
              </p>
            )}
          </div>
          
          <div>
            <div className="flex justify-between text-xs sm:text-sm text-green-400 mb-2">
              <span>LOADING PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-gray-800 border border-green-400">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;