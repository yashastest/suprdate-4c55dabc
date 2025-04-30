
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Check } from 'lucide-react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { interestTags } from '@/data/mockData';

interface FilterOptions {
  city: string;
  state: string;
  pincode: string;
  dateType: string;
  billPreference: string;
  availability: string;
  interestTags: string[];
  ready15: boolean;
}

interface FilterDrawerProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function FilterDrawer({ 
  filters, 
  onFiltersChange, 
  onApplyFilters,
  onClearFilters
}: FilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [open, setOpen] = useState(false);
  
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setLocalFilters({
      ...localFilters,
      [key]: value
    });
  };
  
  const toggleInterestTag = (tag: string) => {
    if (localFilters.interestTags.includes(tag)) {
      updateFilter('interestTags', localFilters.interestTags.filter(t => t !== tag));
    } else {
      updateFilter('interestTags', [...localFilters.interestTags, tag]);
    }
  };
  
  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    setOpen(false);
  };
  
  const handleClear = () => {
    setLocalFilters({
      city: '',
      state: '',
      pincode: '',
      dateType: '',
      billPreference: '',
      availability: '',
      interestTags: [],
      ready15: false
    });
    onClearFilters();
  };
  
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'interestTags' && Array.isArray(value)) {
      return value.length > 0;
    }
    return value && typeof value === 'string' && value.trim() !== '';
  }).length;
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex justify-between items-center">
              <span>Filters</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground text-sm"
                onClick={handleClear}
              >
                Clear All
              </Button>
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">City</label>
                <Input 
                  value={localFilters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                  placeholder="City"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pincode</label>
                <Input 
                  value={localFilters.pincode}
                  onChange={(e) => updateFilter('pincode', e.target.value)}
                  placeholder="Pincode"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block">Date Type</label>
                <Select 
                  value={localFilters.dateType} 
                  onValueChange={(value) => updateFilter('dateType', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Type</SelectItem>
                    <SelectItem value="Coffee">Coffee</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Movie">Movie</SelectItem>
                    <SelectItem value="Walk">Walk</SelectItem>
                    <SelectItem value="Activity">Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block">Bill</label>
                <Select 
                  value={localFilters.billPreference} 
                  onValueChange={(value) => updateFilter('billPreference', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="I'll pay">I'll pay</SelectItem>
                    <SelectItem value="You pay">You pay</SelectItem>
                    <SelectItem value="Split">Split</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium block">Availability</label>
              <Select 
                value={localFilters.availability} 
                onValueChange={(value) => updateFilter('availability', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Time</SelectItem>
                  <SelectItem value="In 15 mins">In 15 mins</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Weekend">Weekend</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Interest Tags</label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {localFilters.interestTags.map(tag => (
                  <Badge
                    key={tag}
                    className="bg-primary text-white pl-3 pr-2 py-1.5 flex items-center gap-1"
                    onClick={() => toggleInterestTag(tag)}
                  >
                    {tag}
                    <X className="h-3.5 w-3.5" />
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pb-2">
                {interestTags
                  .filter(tag => !localFilters.interestTags.includes(tag))
                  .map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => toggleInterestTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <label className="text-sm font-medium">Ready in 15 minutes</label>
              <Button
                variant={localFilters.ready15 ? "default" : "outline"}
                size="sm"
                className={localFilters.ready15 ? "bg-primary" : ""}
                onClick={() => updateFilter('ready15', !localFilters.ready15)}
              >
                {localFilters.ready15 && <Check className="mr-1 h-4 w-4" />}
                {localFilters.ready15 ? "On" : "Off"}
              </Button>
            </div>
          </div>
          
          <DrawerFooter>
            <Button onClick={handleApply} className="gradient-bg hover:opacity-90">
              Apply Filters
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
