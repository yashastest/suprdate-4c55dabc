
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GenderSelectionProps {
  selected: 'Boy' | 'Girl' | null;
  onSelect: (gender: 'Boy' | 'Girl') => void;
  onNext: () => void;
}

export function GenderSelection({ selected, onSelect, onNext }: GenderSelectionProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">I am a...</h2>
        <p className="text-muted-foreground mt-2">Select your gender</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Card 
          className={cn(
            "p-6 cursor-pointer transition-all transform hover:scale-105",
            selected === 'Boy' 
              ? "border-primary shadow-lg" 
              : "border-border hover:border-muted-foreground"
          )}
          onClick={() => onSelect('Boy')}
        >
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">👨</div>
            <h3 className="font-semibold">Boy</h3>
          </div>
        </Card>
        
        <Card 
          className={cn(
            "p-6 cursor-pointer transition-all transform hover:scale-105",
            selected === 'Girl' 
              ? "border-primary shadow-lg" 
              : "border-border hover:border-muted-foreground"
          )}
          onClick={() => onSelect('Girl')}
        >
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">👩</div>
            <h3 className="font-semibold">Girl</h3>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button
          className="gradient-bg hover:opacity-90 w-full max-w-xs"
          onClick={onNext}
          disabled={!selected}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
