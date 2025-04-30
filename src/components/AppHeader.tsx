
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, User, Plus, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  title?: React.ReactNode;
  showBackButton?: boolean;
  className?: string;
  centerTitle?: boolean;
  showActions?: boolean;
}

export function AppHeader({
  title,
  showBackButton = false,
  className,
  centerTitle = true,
  showActions = true
}: AppHeaderProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm h-14 flex items-center px-4",
      className
    )}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          {!centerTitle && title && (
            typeof title === 'string' ? (
              <h1 className="text-lg font-semibold">{title}</h1>
            ) : (
              title
            )
          )}
          
          {!title && !centerTitle && (
            <div className="text-xl font-bold">15Mins Date</div>
          )}
        </div>
        
        {centerTitle && title && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            {typeof title === 'string' ? (
              <h1 className="text-lg font-semibold">{title}</h1>
            ) : (
              title
            )}
          </div>
        )}
        
        {isAuthenticated && showActions && (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/create-date')}>
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
