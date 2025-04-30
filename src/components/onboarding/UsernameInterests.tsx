import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { interestTags } from '@/data/mockData';
import { X } from 'lucide-react';

interface UsernameInterestsProps {
  username: string;
  onUsernameChange: (username: string) => void;
  interests: string[];
  onInterestsChange: (interests: string[]) => void;
  onComplete: () => void;
  onBack: () => void;
}

export function UsernameInterests({
  username,
  onUsernameChange,
  interests,
  onInterestsChange,
  onComplete,
  onBack
}: UsernameInterestsProps) {
  const [usernameError, setUsernameError] = useState('');
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUsernameChange(value);
    
    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters');
    } else if (value.length > 20) {
      setUsernameError('Username must be less than 20 characters');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
    } else {
      setUsernameError('');
    }
  };
  
  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      onInterestsChange(interests.filter(t => t !== tag));
    } else if (interests.length < 3) {
      onInterestsChange([...interests, tag]);
    }
  };
  
  const isComplete = username.length >= 3 && !usernameError && interests.length === 3;
  
  return (
    <div className="space-y-6 animate-slide-up pb-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">Almost There!</h2>
        <p className="text-muted-foreground mt-2">Choose a username and your interests</p>
      </div>
      
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            type="text"
            placeholder="Choose a unique username"
            value={username}
            onChange={handleUsernameChange}
            className={usernameError ? "border-destructive" : ""}
          />
          {usernameError && (
            <p className="text-destructive text-xs mt-1">{usernameError}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            This will be visible to others on the platform
          </p>
        </div>
        
        <div className="space-y-2 mt-6">
          <label className="block text-sm font-medium">
            Select 3 Interests
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {interests.map(tag => (
              <Badge
                key={tag}
                className="bg-primary text-white pl-3 pr-2 py-1.5 flex items-center gap-1 cursor-pointer"
                onClick={() => toggleInterest(tag)}
              >
                {tag}
                <X className="h-3.5 w-3.5" />
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 max-h-48 overflow-y-auto pb-4">
            {interestTags
              .filter(tag => !interests.includes(tag))
              .map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`cursor-pointer hover:bg-primary/10 ${
                    interests.length >= 3 ? "opacity-50" : ""
                  }`}
                  onClick={() => toggleInterest(tag)}
                >
                  {tag}
                </Badge>
              ))}
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            {interests.length}/3 interests selected
          </p>
        </div>
      </div>
      
      <div className="flex justify-between gap-4 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          className="gradient-bg hover:opacity-90 flex-1"
          onClick={onComplete}
          disabled={!isComplete}
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
}
