
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DatePost } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DateCardProps {
  datePost: DatePost;
  user: {
    username: string;
    photos: string[];
  };
}

export function DateCard({ datePost, user }: DateCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card 
      className={cn(
        "overflow-hidden mb-4 transition-all duration-300 card-shadow hover:shadow-xl rounded-2xl border-none",
        datePost.boosted ? "ring-2 ring-brand-pink" : ""
      )}
    >
      <div className="relative">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl">
          <img
            src={user.photos[0]}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          
          {datePost.ready15 && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Ready in 15mins
            </div>
          )}
          
          {datePost.boosted && (
            <div className="absolute top-3 left-3 bg-brand-pink text-white text-xs px-2 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Boosted
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-xl mb-1">{user.username}</h3>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-brand-purple/80 text-white">
              {datePost.dateType}
            </Badge>
            <span className="text-white text-sm">{datePost.billPreference}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex gap-2 mb-4 flex-wrap">
          {datePost.vibeTags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-muted">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              {datePost.city}, {datePost.pincode}
            </p>
            <p className="text-sm font-medium">{datePost.availability}</p>
          </div>
          
          <Button 
            onClick={() => navigate(`/date/${datePost.id}`)}
            className="gradient-bg hover:opacity-90"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
