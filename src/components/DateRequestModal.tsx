
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendRequest: (message: string) => void;
}

export function DateRequestModal({ isOpen, onClose, onSendRequest }: DateRequestModalProps) {
  const [message, setMessage] = useState('');
  
  const handleSendRequest = () => {
    onSendRequest(message);
    setMessage('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text">Send Date Request</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm mb-4">
            Send a request to meet this person. If they accept, you'll be able to chat and plan your date.
          </p>
          
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short introduction message..."
            className="min-h-[100px]"
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Cost: </span>
              <span className="font-medium">₹1</span>
            </div>
            <button className="text-primary text-sm hover:underline">
              Get 50 requests for ₹40
            </button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="gradient-bg hover:opacity-90"
            onClick={handleSendRequest}
            disabled={!message.trim()}
          >
            Send Request (₹1)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
