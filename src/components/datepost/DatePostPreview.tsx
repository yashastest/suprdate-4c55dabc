
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DatePost } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';

interface DatePostPreviewProps {
  datePost: Partial<DatePost>;
  onEdit: () => void;
  onPublish: () => void;
}

export function DatePostPreview({ datePost, onEdit, onPublish }: DatePostPreviewProps) {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;

  // Helper function to get activity emoji
  const getActivityEmoji = (type?: string) => {
    if (!type) return '📅';
    
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
    <div className="animate-slide-up space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">Preview Your Date</h2>
        <p className="text-muted-foreground mt-1">How your date will appear to others</p>
      </div>
      
      <div className="rounded-2xl overflow-hidden card-shadow gradient-border">
        <div className="bg-black rounded-[calc(var(--radius)-1px)]">
          <div className="relative">
            <div className="aspect-[3/4] relative">
              <img
                src={currentUser.photos[0]}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              
              {datePost.ready15 && (
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">⏱️</span>
                  Ready in 15mins
                </div>
              )}
              
              {/* Date type badge with emoji */}
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                <span className="mr-1">{getActivityEmoji(datePost.dateType)}</span>
                <span>{datePost.dateType}</span>
              </div>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
              <h3 className="text-white font-bold text-xl mb-1 gradient-text">{currentUser.username}</h3>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-gradient-to-r from-red-600 to-red-500 text-white border-none">
                  {datePost.dateType}
                </Badge>
                <span className="text-white text-sm">{datePost.billPreference}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex gap-2 mb-4 flex-wrap">
              {datePost.vibeTags?.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-red-500/30 bg-zinc-900 text-white">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="text-red-500">📍</span> {datePost.city}, {datePost.pincode}
              </p>
              <p className="text-sm font-medium">
                <span className="text-red-500">🕒</span> {datePost.availability}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 pt-2">
        <Button
          onClick={onEdit}
          variant="outline"
          className="w-full border-zinc-700 text-white hover:bg-zinc-800"
        >
          Edit
        </Button>
        <Button
          onClick={onPublish}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
        >
          Publish Date (₹50)
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Your card will be charged ₹50 for posting this date
        </p>
      </div>
      
      <div className="wave-divider mt-8"></div>
    </div>
  );
}
