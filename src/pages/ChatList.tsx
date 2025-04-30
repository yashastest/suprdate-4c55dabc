
import React from 'react';
import { AppHeader } from '@/components/AppHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const navigate = useNavigate();
  
  const chats = [
    {
      id: '1',
      name: 'Emma Wilson',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
      lastMessage: 'Are we still meeting tomorrow?',
      time: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'John Smith',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
      lastMessage: 'That sounds great! I'd love to join you.',
      time: '25m ago',
      unread: 0,
      online: true
    },
    {
      id: '3',
      name: 'Sophia Chen',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
      lastMessage: 'Just sent you the location for our date!',
      time: '2h ago',
      unread: 1,
      online: false
    },
    {
      id: '4',
      name: 'Marcus Johnson',
      photo: '',
      lastMessage: 'Looking forward to meeting you!',
      time: '1d ago',
      unread: 0,
      online: false
    }
  ];
  
  const handleChatClick = (chatId: string) => {
    navigate(`/chats/${chatId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader title="Messages" />
      
      <div className="flex-1 pb-20">
        {/* Search Bar */}
        <div className="p-4 sticky top-14 bg-background z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 bg-muted/50"
            />
          </div>
        </div>
        
        {/* New Matches */}
        <div className="px-4 pb-4">
          <h3 className="font-poppins font-bold text-sm mb-3">New Matches</h3>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {Array.from({length: 5}).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-brand-purple">
                    <AvatarImage 
                      src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 20}.jpg`} 
                    />
                    <AvatarFallback className="bg-muted text-brand-purple font-medium">
                      {`${String.fromCharCode(65 + index)}${String.fromCharCode(75 + index)}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-xs mt-2 font-medium">
                  {['Alex', 'Taylor', 'Jordan', 'Casey', 'Riley'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat List */}
        <div className="px-4">
          <h3 className="font-poppins font-bold text-sm mb-3">Messages</h3>
          
          {chats.length > 0 ? (
            <div className="space-y-1">
              {chats.map((chat) => (
                <div 
                  key={chat.id}
                  className="flex items-center p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleChatClick(chat.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      {chat.photo ? (
                        <AvatarImage src={chat.photo} />
                      ) : (
                        <AvatarFallback className="bg-brand-purple/30 text-brand-purple font-bold">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <Badge className="bg-brand-pink ml-2 h-5 min-w-5 flex items-center justify-center p-0 rounded-full">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-poppins font-bold text-base mb-1">No messages yet</h3>
              <p className="text-sm text-muted-foreground">
                When you match with someone, your conversations will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ChatList;
