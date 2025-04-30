
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';
import { DatePostForm } from '@/components/datepost/DatePostForm';
import { DatePostPreview } from '@/components/datepost/DatePostPreview';
import { DatePost } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const CreateDate = () => {
  const [step, setStep] = useState(1);
  const [datePost, setDatePost] = useState<Partial<DatePost>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    navigate('/');
    return null;
  }
  
  const handleFormSubmit = (data: any) => {
    setDatePost({
      ...data,
      userId: currentUser.id,
      createdAt: new Date(),
      id: Date.now().toString()
    });
    setStep(2);
  };
  
  const handlePublish = () => {
    // In a real app, this would make an API call to process payment and create the date post
    toast({
      title: "Payment Processing",
      description: "Processing your payment of ₹50...",
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Date Posted!",
        description: "Your date has been published successfully.",
      });
      navigate('/discover');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader 
        title={step === 1 ? "Create a Date" : "Preview Date"}
        showBackButton={step === 2}
        showActions={false}
      />
      
      <div className="flex-1 p-6 pb-20 flex flex-col">
        {step === 1 ? (
          <DatePostForm onSubmit={handleFormSubmit} />
        ) : (
          <DatePostPreview 
            datePost={datePost} 
            onEdit={() => setStep(1)} 
            onPublish={handlePublish}
          />
        )}
      </div>
    </div>
  );
};

export default CreateDate;
