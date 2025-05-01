
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Waves } from 'lucide-react';

export const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black z-0"></div>
      
      {/* Animated waves */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Large outer wave */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%] animate-[spin_20s_linear_infinite] opacity-10">
            <div className="w-full h-full rounded-full border-[40px] border-red-500/30"></div>
          </div>
        </div>
        
        {/* Medium wave */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-[120%] h-[120%] top-[-10%] left-[-10%] animate-[spin_15s_linear_infinite_reverse] opacity-15">
            <div className="w-full h-full rounded-full border-[25px] border-white/10"></div>
          </div>
        </div>
        
        {/* Small inner wave */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-[90%] h-[90%] top-[5%] left-[5%] animate-[spin_10s_linear_infinite] opacity-20">
            <div className="w-full h-full rounded-full border-[15px] border-red-500/20"></div>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-between p-6 z-10">
        {/* Header */}
        <div className="w-full flex justify-center pt-6">
          <img 
            src="/lovable-uploads/dc524864-338e-4bd6-b7df-3bb1faff440a.png" 
            alt="SuprDate" 
            className="h-20 object-contain"
          />
        </div>
        
        {/* Main Content with Image */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto my-6">
          <div className="relative">
            {/* Pulse rings around the image */}
            <div className="absolute inset-0 -m-6 rounded-full border border-red-500/30 animate-[ping_3s_infinite]"></div>
            <div className="absolute inset-0 -m-12 rounded-full border border-white/10 animate-[ping_4s_infinite]"></div>
            
            {/* Image container with gradient border */}
            <div className="rounded-full overflow-hidden shadow-2xl relative z-10 mb-8 transform hover:scale-105 transition-transform duration-300 border-2 border-red-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-transparent mix-blend-overlay z-10"></div>
              <img 
                src="/lovable-uploads/4ba4f11c-d3bb-4d3c-be09-580cdd41d6ac.png" 
                alt="Couple embracing" 
                className="w-64 h-64 object-cover rounded-full"
              />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
            Land a date - Your soulmate's 900 seconds away
          </h2>
          
          <p className="text-muted-foreground text-sm mb-8">
            Find someone just like you, just one click away to share your love, life and laugh.
          </p>
          
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-6 rounded-full text-lg flex items-center justify-center space-x-2 shadow-[0_8px_30px_rgb(255,0,0,0.12)]"
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
        
        {/* Footer with wave icon */}
        <div className="w-full flex justify-center pb-8 space-x-2 items-center">
          <div className="h-2 w-8 rounded-full bg-gradient-to-r from-red-500 to-red-600"></div>
          <Waves className="h-5 w-5 text-red-500 mx-1" />
          <div className="h-2 w-2 rounded-full bg-gray-800"></div>
          <div className="h-2 w-2 rounded-full bg-gray-800"></div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="wave-divider"></div>
    </div>
  );
};

export default LandingScreen;
