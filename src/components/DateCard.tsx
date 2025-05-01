
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DatePost } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MapPin, Clock, CreditCard } from 'lucide-react';

interface DateCardProps {
  datePost: DatePost;
  user: {
    username: string;
    photos: string[];
  };
}

export function DateCard({ datePost, user }: DateCardProps) {
  const navigate = useNavigate();
  
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
    <Card 
      className={cn(
        "overflow-hidden mb-4 transition-all duration-300 card-shadow border-none gradient-border hover:scale-[1.02]",
        datePost.boosted ? "before:animate-pulse" : ""
      )}
    >
      <div className="bg-black rounded-[calc(var(--radius)-1px)]">
        <div className="grid grid-cols-3 h-full">
          {/* Image Column */}
          <div className="aspect-[3/4] relative overflow-hidden col-span-1 rounded-l-lg">
            <img
              src={user.photos[0]}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            
            {datePost.boosted && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Boosted
              </div>
            )}
            
            {/* Date type badge with emoji */}
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
              <span className="mr-1">{getActivityEmoji(datePost.dateType)}</span>
              <span>{datePost.dateType}</span>
            </div>
          </div>
          
          {/* Details Column */}
          <div className="col-span-2 p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-poppins font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">{user.username}</h3>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-3.5 w-3.5 mr-1 text-red-500" />
                <span>{datePost.city}, {datePost.pincode}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Clock className="h-3.5 w-3.5 mr-1 text-red-500" />
                <span>{datePost.availability}</span>
                {datePost.ready15 && (
                  <Badge className="ml-2 bg-green-500 text-white text-xs">Ready Now ⏱️</Badge>
                )}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <CreditCard className="h-3.5 w-3.5 mr-1 text-red-500" />
                <span>{datePost.billPreference}</span>
              </div>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                {datePost.vibeTags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-xs bg-zinc-900 text-white">
                    {tag}
                  </Badge>
                ))}
                {datePost.vibeTags.length > 3 && (
                  <Badge variant="outline" className="border-red-500/30 bg-zinc-900 text-white text-xs">
                    +{datePost.vibeTags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <Button 
              onClick={() => navigate(`/date/${datePost.id}`)}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white w-full"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
