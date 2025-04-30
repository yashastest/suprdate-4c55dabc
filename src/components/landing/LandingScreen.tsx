
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/10 to-white z-0"></div>
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-between p-6 z-10">
        {/* Header */}
        <div className="w-full flex justify-center pt-6">
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
            SUprdate
          </h1>
        </div>
        
        {/* Main Content with Image */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto my-8">
          <div className="rounded-3xl overflow-hidden shadow-xl mb-8 transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/206fc370-9499-41d3-9fb7-33407c47e464.png" 
              alt="Couple embracing" 
              className="w-full h-auto max-w-sm rounded-3xl"
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-3">
            Land a date <span className="text-brand-pink">-</span>
          </h2>
          <p className="text-xl font-bold mb-6 text-brand-purple">
            Your soulmate's 900 seconds away
          </p>
          
          <p className="text-muted-foreground text-sm mb-10">
            Find someone just like you, just one click away to share your love, life and laugh.
          </p>
          
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-6 rounded-full text-lg flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
        
        {/* Footer with dots indicator */}
        <div className="w-full flex justify-center pb-8 space-x-2">
          <div className="h-2 w-2 rounded-full bg-brand-purple"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
