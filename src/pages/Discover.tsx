
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateCard } from '@/components/DateCard';
import { FilterDrawer } from '@/components/discover/FilterDrawer';
import { Search, MapPin, X } from 'lucide-react';
import { mockDatePosts, mockUsers } from '@/data/mockData';
import { DatePost } from '@/types/user';
import { Badge } from '@/components/ui/badge';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<DatePost[]>([]);
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    pincode: '',
    dateType: '',
    billPreference: '',
    availability: '',
    interestTags: [] as string[],
    ready15: false
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Apply filters and search query
    let result = [...mockDatePosts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.city.toLowerCase().includes(query) ||
        post.pincode.includes(query)
      );
    }
    
    // Apply filters
    if (filters.city) {
      result = result.filter(post => 
        post.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    
    if (filters.pincode) {
      result = result.filter(post => 
        post.pincode.includes(filters.pincode)
      );
    }
    
    if (filters.dateType) {
      result = result.filter(post => post.dateType === filters.dateType);
    }
    
    if (filters.billPreference) {
      result = result.filter(post => post.billPreference === filters.billPreference);
    }
    
    if (filters.availability) {
      result = result.filter(post => post.availability === filters.availability);
    }
    
    if (filters.ready15) {
      result = result.filter(post => post.ready15 === true);
    }
    
    if (filters.interestTags.length > 0) {
      result = result.filter(post => {
        const user = mockUsers.find(u => u.id === post.userId);
        if (user) {
          return filters.interestTags.some(tag => user.interests.includes(tag));
        }
        return false;
      });
    }
    
    // Sort boosted posts first
    result.sort((a, b) => {
      if (a.boosted && !b.boosted) return -1;
      if (!a.boosted && b.boosted) return 1;
      return 0;
    });
    
    setFilteredPosts(result);
  }, [searchQuery, filters]);
  
  const applyFilters = () => {
    // The filters are already applied in the useEffect
    console.log("Filters applied:", filters);
  };
  
  const clearFilters = () => {
    setFilters({
      city: '',
      state: '',
      pincode: '',
      dateType: '',
      billPreference: '',
      availability: '',
      interestTags: [],
      ready15: false
    });
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Popular date types for quick filtering
  const popularTypes = ['Coffee Date', 'Dinner Date', 'Drinks Date', 'Movie Date'];
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader title={
        <div className="flex items-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Discover Dates</span>
        </div>
      } />
      
      <div className="wave-top pt-4">
        <div className="bg-gradient-to-b from-black/80 to-black pb-2 pt-10">
          {/* Featured badge */}
          <div className="flex justify-center mb-4">
            <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white border-none py-1.5 px-6">
              Find Your Perfect Date ✨
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex-1 px-4 pb-20 z-10 relative">
        <div className="sticky top-14 pt-4 pb-2 bg-background z-10 shadow-lg shadow-black/20">
          <div className="relative flex-1 mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 bg-zinc-900 border-zinc-800 focus:border-red-500 focus:ring-red-500"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground hover:text-white" />
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none">
            <FilterDrawer 
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
            
            {popularTypes.map((type) => (
              <Button 
                key={type}
                size="sm"
                variant={filters.dateType === type ? "default" : "outline"}
                onClick={() => setFilters({...filters, dateType: filters.dateType === type ? "" : type})}
                className={`whitespace-nowrap ${
                  filters.dateType === type 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500'
                }`}
              >
                {type === 'Coffee Date' ? '☕' : type === 'Dinner Date' ? '🍽️' : type === 'Drinks Date' ? '🍸' : '🎬'} {type}
              </Button>
            ))}
          </div>
          
          {filters.city && (
            <div className="flex items-center text-sm text-primary mb-2">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{filters.city}</span>
              {filters.pincode && <span>, {filters.pincode}</span>}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-5 pb-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => {
              const user = mockUsers.find(u => u.id === post.userId);
              if (!user) return null;
              
              return (
                <DateCard 
                  key={post.id}
                  datePost={post}
                  user={{
                    username: user.username,
                    photos: user.photos
                  }}
                />
              );
            })
          ) : (
            <div className="col-span-full py-10 text-center text-muted-foreground">
              <div className="text-4xl mb-4 emoji-shadow">😕</div>
              <h3 className="text-lg font-medium mb-1 gradient-text">No dates found</h3>
              <p className="text-sm">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="wave-divider mt-auto"></div>
      <BottomNavigation />
    </div>
  );
};

export default Discover;
