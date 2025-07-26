import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import TerminalInterface from './components/TerminalInterface';
import './styles/cyberpunk.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="w-full h-screen bg-black relative">
      {/* Cyberpunk background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) contrast(1.5) hue-rotate(180deg)'
        }}
      />

      {/* Matrix effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="cyberpunk-grid"></div>
        <div className="scan-lines"></div>
      </div>

      {/* Terminal Interface - Full Screen */}
      <div className="relative z-10 w-full h-full">
        <TerminalInterface />
      </div>
    </div>
  );
}

export default App;