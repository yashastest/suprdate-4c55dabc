
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
import { Heart, Clock, MapPin, User } from 'lucide-react';

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
    // In a real app, this would make an API call to send the request
    toast({
      title: "Processing",
      description: "Sending your request...",
    });
    
    // Simulate request processing
    setTimeout(() => {
      toast({
        title: "Request Sent!",
        description: "Your date request has been sent.",
      });
      setIsRequestModalOpen(false);
    }, 1000);
  };
  
  const handleBoost = () => {
    toast({
      title: "Boost Applied",
      description: "Your date post will be featured for 2 hours.",
    });
  };
  
  if (!datePost || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-primary/30 rounded-lg mb-4"></div>
          <div className="h-4 w-60 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  const isOwnPost = currentUser && currentUser.id === user.id;
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader showBackButton />
      
      <div className="flex-1 pb-16">
        {/* Image Gallery */}
        <div className="relative aspect-[4/5]">
          <img 
            src={user.photos[0]} 
            alt={user.username}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="bg-brand-purple text-white"
              >
                {datePost.dateType}
              </Badge>
              
              {user.verified && (
                <Badge variant="outline" className="bg-green-600/80 text-white border-none">
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="text-lg opacity-90">{datePost.billPreference}</p>
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Date Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Availability</h3>
                <p className="text-muted-foreground">
                  {datePost.availability}
                  {datePost.ready15 && (
                    <Badge className="ml-2 bg-green-500 text-white">Ready Now</Badge>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">{datePost.city}, {datePost.pincode}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Interests</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.interests.map((interest: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Vibes */}
          <div>
            <h3 className="font-medium mb-2">Vibe Tags</h3>
            <div className="flex flex-wrap gap-2">
              {datePost.vibeTags.map((tag, index) => (
                <Badge key={index} className="gradient-bg text-white">
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
                className="w-full"
                onClick={() => navigate(`/edit-date/${datePost.id}`)}
              >
                Edit Date Post
              </Button>
              
              <Button
                className="w-full gradient-bg hover:opacity-90"
                onClick={handleBoost}
              >
                Boost Date (₹30)
              </Button>
            </div>
          ) : (
            <div className="pt-4">
              <Button
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full gradient-bg hover:opacity-90 gap-2"
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
