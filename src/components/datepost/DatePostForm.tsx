
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { vibeTags } from '@/data/mockData';
import { X } from 'lucide-react';

interface DatePostFormProps {
  onSubmit: (data: {
    dateType: string;
    billPreference: string;
    availability: string;
    city: string;
    pincode: string;
    vibeTags: string[];
    ready15: boolean;
  }) => void;
}

export function DatePostForm({ onSubmit }: DatePostFormProps) {
  const [dateType, setDateType] = useState('');
  const [billPreference, setBillPreference] = useState('');
  const [availability, setAvailability] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedVibeTags, setSelectedVibeTags] = useState<string[]>([]);
  const [ready15, setReady15] = useState(false);
  
  const toggleVibeTag = (tag: string) => {
    if (selectedVibeTags.includes(tag)) {
      setSelectedVibeTags(selectedVibeTags.filter(t => t !== tag));
    } else if (selectedVibeTags.length < 3) {
      setSelectedVibeTags([...selectedVibeTags, tag]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      dateType,
      billPreference,
      availability,
      city,
      pincode,
      vibeTags: selectedVibeTags,
      ready15
    });
  };
  
  const isFormComplete = 
    dateType && 
    billPreference && 
    availability && 
    city && 
    pincode && 
    selectedVibeTags.length === 3;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Date Type</label>
          <Select value={dateType} onValueChange={setDateType}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select date type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Coffee">Coffee</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Movie">Movie</SelectItem>
              <SelectItem value="Walk">Walk</SelectItem>
              <SelectItem value="Activity">Activity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Bill Preference</label>
          <Select value={billPreference} onValueChange={setBillPreference}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Who's paying?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I'll pay">I'll pay</SelectItem>
              <SelectItem value="You pay">You pay</SelectItem>
              <SelectItem value="Split">Split</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Availability</label>
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="When are you free?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In 15 mins">In 15 mins</SelectItem>
              <SelectItem value="Evening">Evening</SelectItem>
              <SelectItem value="Weekend">Weekend</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="city" className="text-sm font-medium">City</label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="mt-1.5"
            />
          </div>
          
          <div className="w-1/3">
            <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
            <Input
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="e.g. 400001"
              className="mt-1.5"
              maxLength={6}
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-2">Select 3 Vibe Tags</label>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedVibeTags.map(tag => (
              <Badge
                key={tag}
                className="bg-primary text-white pl-3 pr-2 py-1.5 flex items-center gap-1"
                onClick={() => toggleVibeTag(tag)}
              >
                {tag}
                <X className="h-3.5 w-3.5" />
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pb-2">
            {vibeTags
              .filter(tag => !selectedVibeTags.includes(tag))
              .map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`cursor-pointer hover:bg-primary/10 ${
                    selectedVibeTags.length >= 3 ? "opacity-50" : ""
                  }`}
                  onClick={() => toggleVibeTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedVibeTags.length}/3 tags selected
          </p>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="ready15"
            checked={ready15}
            onCheckedChange={setReady15}
          />
          <Label htmlFor="ready15" className="font-medium">
            I'm ready in 15 minutes
          </Label>
        </div>
      </div>
      
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full gradient-bg hover:opacity-90"
          disabled={!isFormComplete}
        >
          Preview Post (₹50)
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Your card will be charged ₹50 for posting a date
        </p>
      </div>
    </form>
  );
}
