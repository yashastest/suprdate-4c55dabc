
export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  gender: 'Boy' | 'Girl';
  photos: string[];
  interests: string[];
  verified: boolean;
  trustScore: number;
}

export interface DatePost {
  id: string;
  userId: string;
  dateType: 'Coffee' | 'Dinner' | 'Movie' | 'Walk' | 'Activity';
  billPreference: 'I\'ll pay' | 'You pay' | 'Split';
  availability: 'In 15 mins' | 'Evening' | 'Weekend';
  city: string;
  pincode: string;
  vibeTags: string[];
  ready15: boolean;
  boosted: boolean;
  boostExpiry?: Date;
  createdAt: Date;
}

export interface DateRequest {
  id: string;
  datePostId: string;
  senderId: string;
  status: 'pending' | 'accepted' | 'rejected';
  messages: Message[];
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}
