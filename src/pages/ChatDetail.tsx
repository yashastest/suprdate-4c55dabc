
import React, { useState } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Image, Smile } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ChatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState('');
  
  // In a real app, you would fetch chat data based on the ID
  const chatDetails = {
    id: id || '1',
    name: 'Emma Wilson',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    online: true,
    lastActive: 'Active now'
  };
  
  // Example chat messages
  const messages = [
    {
      id: 1,
      text: "Hi there! I saw your profile and I think we have a lot in common.",
      time: "10:05 AM",
      sender: "other"
    },
    {
      id: 2,
      text: "Hey Emma! Thanks for reaching out. I noticed we both enjoy hiking!",
      time: "10:08 AM",
      sender: "me"
    },
    {
      id: 3,
      text: "Yes! I love hiking in the mountains. Do you have any favorite trails?",
      time: "10:10 AM",
      sender: "other"
    },
    {
      id: 4,
      text: "I really like the Cedar Ridge trail. It has amazing views! Would you be interested in going sometime?",
      time: "10:12 AM",
      sender: "me"
    },
    {
      id: 5,
      text: "That sounds great! I'd love to join you for a hike there.",
      time: "10:15 AM",
      sender: "other"
    },
    {
      id: 6,
      text: "Perfect! How about this weekend if the weather is good?",
      time: "10:17 AM",
      sender: "me"
    },
    {
      id: 7,
      text: "This weekend works for me! Should we meet at the trailhead around 9am?",
      time: "10:20 AM",
      sender: "other"
    }
  ];
  
  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send this message to the backend
      console.log("Sending message:", message);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader 
        showBackButton={true}
        title={
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              {chatDetails.photo ? (
                <AvatarImage src={chatDetails.photo} />
              ) : (
                <AvatarFallback className="bg-brand-purple/30 text-brand-purple font-bold">
                  {chatDetails.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-base font-medium">{chatDetails.name}</h1>
              <p className="text-xs text-muted-foreground">
                {chatDetails.online ? 'Active now' : chatDetails.lastActive}
              </p>
            </div>
          </div>
        } 
      />
      
      <div className="flex-1 pb-20 pt-2 px-4 overflow-y-auto bg-muted/20">
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
              Today
            </span>
          </div>
          
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'other' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  {chatDetails.photo ? (
                    <AvatarImage src={chatDetails.photo} />
                  ) : (
                    <AvatarFallback className="bg-brand-purple/30 text-brand-purple font-bold">
                      {chatDetails.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
              )}
              
              <div 
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  msg.sender === 'me' 
                    ? 'bg-brand-purple text-white rounded-tr-none' 
                    : 'bg-white border rounded-tl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span 
                  className={`text-xs block text-right mt-1 ${
                    msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
            <Image className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-10 rounded-full bg-muted/50"
            />
            <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0 text-muted-foreground">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`rounded-full ${
              message.trim() 
                ? 'bg-brand-purple hover:bg-brand-purple/90' 
                : 'bg-muted/50 text-muted-foreground'
            }`}
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
