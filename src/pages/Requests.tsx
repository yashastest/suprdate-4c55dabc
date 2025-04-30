
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { 
  Card, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { mockDatePosts, mockUsers, mockDateRequests } from '@/data/mockData';
import { DateRequest } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';

const Requests = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get received requests (requests to the current user's date posts)
  const receivedRequests = currentUser 
    ? mockDateRequests.filter(request => {
        const post = mockDatePosts.find(p => p.id === request.datePostId);
        return post && post.userId === currentUser.id;
      })
    : [];
  
  // Get sent requests (requests sent by the current user)
  const sentRequests = currentUser
    ? mockDateRequests.filter(request => request.senderId === currentUser.id)
    : [];
  
  const handleAccept = (requestId: string) => {
    toast({
      title: "Request Accepted",
      description: "You can now chat with this person to plan your date.",
    });
  };
  
  const handleReject = (requestId: string) => {
    toast({
      title: "Request Rejected",
      description: "The request has been declined.",
    });
  };
  
  const renderRequest = (request: DateRequest, type: 'received' | 'sent') => {
    const post = mockDatePosts.find(p => p.id === request.datePostId);
    if (!post) return null;
    
    const otherUser = type === 'received'
      ? mockUsers.find(u => u.id === request.senderId)
      : mockUsers.find(u => u.id === post.userId);
    
    if (!otherUser) return null;
    
    return (
      <Card key={request.id} className="mb-4">
        <div className="flex">
          <div className="w-1/3 aspect-square">
            <img
              src={otherUser.photos[0]}
              alt={otherUser.username}
              className="w-full h-full object-cover"
            />
          </div>
          
          <CardContent className="flex-1 p-3">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{otherUser.username}</h3>
              <Badge className="bg-muted text-muted-foreground">
                {post.dateType}
              </Badge>
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              <p>{post.city}, {post.availability}</p>
              <p className="mt-1 line-clamp-2">{request.messages[0]?.text || "No message"}</p>
            </div>
          </CardContent>
        </div>
        
        <CardFooter className="p-3 pt-0">
          {type === 'received' ? (
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleReject(request.id)}
              >
                Decline
              </Button>
              <Button
                className="flex-1 gradient-bg hover:opacity-90"
                onClick={() => handleAccept(request.id)}
              >
                Accept
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => navigate(`/date/${post.id}`)}
            >
              View Date
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader title="Requests" />
      
      <div className="flex-1 p-4 pb-20">
        <Tabs defaultValue="received">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="received" className="flex-1">
              Received ({receivedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex-1">
              Sent ({sentRequests.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="received" className="mt-0">
            {receivedRequests.length > 0 ? (
              receivedRequests.map(request => renderRequest(request, 'received'))
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-medium">No Requests Yet</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  When someone sends you a date request, it will appear here.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sent" className="mt-0">
            {sentRequests.length > 0 ? (
              sentRequests.map(request => renderRequest(request, 'sent'))
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium">No Sent Requests</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  When you send date requests, they'll appear here.
                </p>
                <Button
                  className="mt-4 gradient-bg hover:opacity-90"
                  onClick={() => navigate('/discover')}
                >
                  Discover Dates
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Requests;
