
import React, { useState } from 'react';
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
  Settings,
  ShieldCheck,
  Wallet,
  Lock,
  HelpCircle,
  Bell
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifyLoading, setVerifyLoading] = useState(false);
  
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-purple/10 to-white">
        <div className="text-center p-6 bg-white rounded-2xl shadow-lg max-w-sm w-full">
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-2xl font-poppins font-extrabold mb-2 gradient-text">Not Logged In</h2>
          <p className="text-muted-foreground mt-2 mb-6 font-jetbrains">Please log in to view your profile</p>
          <Button onClick={() => navigate('/')} className="gradient-bg hover:opacity-90 w-full font-medium">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged out successfully",
      description: "Hope to see you back soon!",
    });
  };
  
  const handleVerifyProfile = () => {
    setVerifyLoading(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerifyLoading(false);
      toast({
        title: "Verification Initiated",
        description: "We'll review your profile within 24 hours.",
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader title="Profile" />
      
      <div className="flex-1 pb-20">
        <div className="bg-gradient-to-r from-brand-purple to-brand-pink pt-8 pb-10 px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={currentUser.photos[0]}
                  alt={currentUser.username}
                  className="w-full h-full object-cover"
                />
                {currentUser.verified && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-4 w-4 text-gray-700" />
              </button>
            </div>
            
            <div>
              <h1 className="text-2xl font-poppins font-extrabold text-white mb-1">{currentUser.username}</h1>
              <div className="flex items-center">
                <span className="text-white/90 font-jetbrains text-sm">
                  {currentUser.gender}
                </span>
                {currentUser.verified ? (
                  <Badge className="ml-2 bg-green-500 text-white flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="ml-2 text-xs h-6 px-2 bg-white/20 hover:bg-white/30 text-white"
                    onClick={handleVerifyProfile}
                    disabled={verifyLoading}
                  >
                    {verifyLoading ? "Verifying..." : "Verify Now"}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {currentUser.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/20 hover:bg-white/30">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-5 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center border-brand-purple/20 hover:bg-brand-purple/10"
              onClick={() => navigate('/edit-profile')}
            >
              <User className="h-5 w-5 mb-2 text-brand-purple" />
              <span className="text-xs font-medium">Edit Profile</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center border-brand-purple/20 hover:bg-brand-purple/10"
              onClick={() => navigate('/my-dates')}
            >
              <Heart className="h-5 w-5 mb-2 text-brand-purple" />
              <span className="text-xs font-medium">My Dates</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center border-brand-purple/20 hover:bg-brand-purple/10"
              onClick={() => navigate('/badges')}
            >
              <Award className="h-5 w-5 mb-2 text-brand-purple" />
              <span className="text-xs font-medium">Badges</span>
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-brand-soft-purple to-white p-4 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-poppins font-bold text-base">SuprWallet</h3>
              <p className="text-sm text-muted-foreground">Balance: $0.00</p>
            </div>
            <Button 
              onClick={() => navigate('/wallet')} 
              className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white"
            >
              <Wallet className="h-4 w-4 mr-1" />
              Recharge
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="font-poppins font-bold text-sm text-muted-foreground">ACCOUNT</h3>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5 text-brand-purple" />
              <span>Settings</span>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5 text-brand-purple" />
              <span>Notifications</span>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => navigate('/privacy-policy')}
            >
              <Lock className="h-5 w-5 text-brand-purple" />
              <span>Privacy Policy</span>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => navigate('/help')}
            >
              <HelpCircle className="h-5 w-5 text-brand-purple" />
              <span>Help & Support</span>
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
            <p>SuprDate • v1.0.0</p>
            <p className="mt-1">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
