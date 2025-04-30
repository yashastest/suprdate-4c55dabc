
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';
import { GenderSelection } from '@/components/onboarding/GenderSelection';
import { PhotoUpload } from '@/components/onboarding/PhotoUpload';
import { UsernameInterests } from '@/components/onboarding/UsernameInterests';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Onboarding = () => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<'Boy' | 'Girl' | null>(
    currentUser?.gender || null
  );
  const [photos, setPhotos] = useState<string[]>(
    currentUser?.photos || []
  );
  const [username, setUsername] = useState(currentUser?.username || '');
  const [interests, setInterests] = useState<string[]>(
    currentUser?.interests || []
  );
  
  const handleNext = () => {
    setStep(step + 1);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const handleComplete = () => {
    // Update user profile
    updateUser({
      gender: gender as 'Boy' | 'Girl',
      photos,
      username,
      interests
    });
    
    toast({
      title: "Profile Created",
      description: "Your profile has been set up successfully!",
    });
    
    // Navigate to discover page
    navigate('/discover');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader 
        title={step === 1 ? "Create Profile" : ""}
        showBackButton={step > 1}
        showActions={false}
      />
      
      <div className="flex-1 p-6 pb-16 flex flex-col">
        {step === 1 && (
          <GenderSelection
            selected={gender}
            onSelect={setGender}
            onNext={handleNext}
          />
        )}
        
        {step === 2 && (
          <PhotoUpload
            photos={photos}
            onPhotosChange={setPhotos}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {step === 3 && (
          <UsernameInterests
            username={username}
            onUsernameChange={setUsername}
            interests={interests}
            onInterestsChange={setInterests}
            onComplete={handleComplete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
