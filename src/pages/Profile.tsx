
import React from 'react';
import { AppHeader } from '@/components/AppHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Camera, 
  Heart, 
  Award, 
  LogOut,
  Settings
} from 'lucide-react';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Not Logged In</h2>
          <p className="text-muted-foreground mt-2 mb-4">Please log in to view your profile</p>
          <Button onClick={() => navigate('/')} className="gradient-bg hover:opacity-90">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader title="Profile" />
      
      <div className="flex-1 pb-20">
        <div className="bg-primary/10 pt-6 pb-8 px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary">
              <img
                src={currentUser.photos[0]}
                alt={currentUser.username}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{currentUser.username}</h1>
              <p className="text-muted-foreground">
                {currentUser.gender}
                {currentUser.verified && (
                  <Badge className="ml-2 bg-green-600 text-white">Verified</Badge>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {currentUser.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="bg-background">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-auto py-3 flex flex-col items-center"
              onClick={() => navigate('/edit-profile')}
            >
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Edit Profile</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto py-3 flex flex-col items-center"
              onClick={() => navigate('/my-dates')}
            >
              <Heart className="h-5 w-5 mb-1" />
              <span className="text-xs">My Dates</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto py-3 flex flex-col items-center"
              onClick={() => navigate('/badges')}
            >
              <Award className="h-5 w-5 mb-1" />
              <span className="text-xs">Badges</span>
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">ACCOUNT</h3>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive h-12"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
          
          <div className="pt-6 text-center text-xs text-muted-foreground">
            <p>15Mins Date App • v1.0.0</p>
            <p className="mt-1">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
