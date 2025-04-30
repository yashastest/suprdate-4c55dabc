
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

  return (
    <div className="animate-slide-up space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">Preview Your Date</h2>
        <p className="text-muted-foreground mt-1">How your date will appear to others</p>
      </div>
      
      <div className="rounded-2xl overflow-hidden card-shadow border">
        <div className="relative">
          <div className="aspect-[3/4] relative">
            <img
              src={currentUser.photos[0]}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            
            {datePost.ready15 && (
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Ready in 15mins
              </div>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-bold text-xl mb-1">{currentUser.username}</h3>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-brand-purple/80 text-white">
                {datePost.dateType}
              </Badge>
              <span className="text-white text-sm">{datePost.billPreference}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex gap-2 mb-4 flex-wrap">
            {datePost.vibeTags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-muted">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {datePost.city}, {datePost.pincode}
            </p>
            <p className="text-sm font-medium">{datePost.availability}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 pt-2">
        <Button
          onClick={onEdit}
          variant="outline"
          className="w-full"
        >
          Edit
        </Button>
        <Button
          onClick={onPublish}
          className="w-full gradient-bg hover:opacity-90"
        >
          Publish Date (₹50)
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Your card will be charged ₹50 for posting this date
        </p>
      </div>
    </div>
  );
}
