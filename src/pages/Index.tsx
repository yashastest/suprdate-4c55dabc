
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PhoneLogin } from '@/components/auth/PhoneLogin';
import { useAuth } from '@/contexts/AuthContext';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-primary/30 rounded-lg mb-4"></div>
          <div className="h-4 w-60 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 pb-16 flex flex-col items-center justify-center">
        {/* Main content area */}
        <PhoneLogin />
      </div>
    </div>
  );
};

export default Index;
