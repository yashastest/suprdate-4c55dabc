
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LandingScreen } from '@/components/landing/LandingScreen';
import { PhoneLogin } from '@/components/auth/PhoneLogin';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // If authenticated, redirect to discover page
  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/discover');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse flex flex-col items-center">
          <img 
            src="/lovable-uploads/dc524864-338e-4bd6-b7df-3bb1faff440a.png" 
            alt="SuprDate" 
            className="h-24 mb-6 object-contain opacity-70" 
          />
          <div className="h-4 w-60 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Show landing screen by default, or phone login if redirected from "Get Started" */}
      {window.location.pathname === '/' ? (
        <LandingScreen />
      ) : (
        <div className="flex-1 p-6 pb-16 flex flex-col items-center justify-center bg-black">
          <PhoneLogin />
        </div>
      )}
    </div>
  );
};

export default Index;
