
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppHeader } from '@/components/AppHeader';
import { DateRequestModal } from '@/components/DateRequestModal';
import { mockDatePosts, mockUsers } from '@/data/mockData';
import { DatePost } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Clock, MapPin, User, Coffee, Utensils, CreditCard } from 'lucide-react';

const DateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [datePost, setDatePost] = useState<DatePost | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (id) {
      const post = mockDatePosts.find(p => p.id === id);
      if (post) {
        setDatePost(post);
        const postUser = mockUsers.find(u => u.id === post.userId);
        if (postUser) {
          setUser(postUser);
        }
      }
    }
  }, [id]);
  
  const handleSendRequest = (message: string) => {
    toast({
      title: "Processing",
      description: "Sending your request... 🚀",
    });
    
    setTimeout(() => {
      toast({
        title: "Request Sent! ✅",
        description: "Your date request has been sent.",
      });
      setIsRequestModalOpen(false);
    }, 1000);
  };
  
  const handleBoost = () => {
    toast({
      title: "Boost Applied ⚡",
      description: "Your date post will be featured for 2 hours.",
    });
  };
  
  if (!datePost || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-gray-800 rounded-lg mb-4"></div>
          <div className="h-4 w-60 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  const isOwnPost = currentUser && currentUser.id === user.id;

  // Create a header component
  const headerTitle = (
    <div className="flex items-center">
      <h1 className="text-lg font-medium">Date Details</h1>
    </div>
  );
  
  // Helper function to get activity emoji
  const getActivityEmoji = (type: string) => {
    switch(type.toLowerCase()) {
      case 'coffee date': return '☕';
      case 'dinner date': return '🍽️';
      case 'drinks date': return '🍸';
      case 'movie date': return '🎬';
      case 'walk date': return '🚶‍♀️';
      case 'adventure date': return '🧗‍♂️';
      default: return '📅';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <AppHeader 
        showBackButton 
        title={headerTitle}
        className="bg-black border-zinc-800"
      />
      
      <div className="flex-1 pb-16">
        {/* Image Gallery */}
        <div className="relative aspect-[4/5]">
          <img 
            src={user.photos[0]} 
            alt={user.username}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold mb-1">{user.username}</h1>
              <span className="text-2xl ml-2">{getActivityEmoji(datePost.dateType)}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-white text-black border-white"
              >
                {datePost.dateType}
              </Badge>
              
              {user.verified && (
                <Badge variant="outline" className="bg-green-600 text-white border-none">
                  ✓ Verified
                </Badge>
              )}
            </div>
            
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-1.5 text-gray-300" />
              <p className="text-lg text-gray-300">{datePost.billPreference}</p>
            </div>
          </div>
        </div>
        
        <div className="p-5 space-y-6">
          {/* Date Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-zinc-900 p-2 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Availability</h3>
                <p className="text-gray-400">
                  {datePost.availability}
                  {datePost.ready15 && (
                    <Badge className="ml-2 bg-green-500 text-black border-none">
                      ⏱️ Ready Now
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-zinc-900 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Location</h3>
                <p className="text-gray-400">📍 {datePost.city}, {datePost.pincode}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-zinc-900 p-2 rounded-full">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Interests</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.interests.map((interest: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-zinc-700 bg-zinc-900 text-white">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Vibes */}
          <div>
            <h3 className="font-medium text-white mb-2">Vibe Tags</h3>
            <div className="flex flex-wrap gap-2">
              {datePost.vibeTags.map((tag, index) => (
                <Badge key={index} className="bg-zinc-800 text-white border-none">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          {isOwnPost ? (
            <div className="space-y-3 pt-4">
              <Button
                variant="outline"
                className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                onClick={() => navigate(`/edit-date/${datePost.id}`)}
              >
                Edit Date Post
              </Button>
              
              <Button
                className="w-full bg-white text-black hover:bg-gray-200"
                onClick={handleBoost}
              >
                ⚡ Boost Date (₹30)
              </Button>
            </div>
          ) : (
            <div className="pt-4">
              <Button
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full bg-white text-black hover:bg-gray-200 gap-2"
              >
                <Heart className="h-4 w-4" />
                Send Date Request (₹1)
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <DateRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSendRequest={handleSendRequest}
      />
    </div>
  );
};

export default DateDetail;
