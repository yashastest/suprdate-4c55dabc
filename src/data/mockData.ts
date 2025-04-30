
import { User, DatePost, DateRequest } from '../types/user';

export const mockUsers: User[] = [
  {
    id: "1",
    username: "skywalker_99",
    phoneNumber: "+911234567890",
    gender: "Boy",
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    interests: ["Music", "Photography", "Travel"],
    verified: true,
    trustScore: 85
  },
  {
    id: "2",
    username: "luna_stardust",
    phoneNumber: "+919876543210",
    gender: "Girl",
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    interests: ["Reading", "Yoga", "Art"],
    verified: false,
    trustScore: 70
  }
];

export const mockDatePosts: DatePost[] = [
  {
    id: "1",
    userId: "1",
    dateType: "Coffee",
    billPreference: "Split",
    availability: "In 15 mins",
    city: "Mumbai",
    pincode: "400001",
    vibeTags: ["Chill", "Deep Chat", "Art"],
    ready15: true,
    boosted: false,
    createdAt: new Date()
  },
  {
    id: "2",
    userId: "2",
    dateType: "Movie",
    billPreference: "I'll pay",
    availability: "Weekend",
    city: "Delhi",
    pincode: "110001",
    vibeTags: ["Fun", "Casual", "Adventure"],
    ready15: false,
    boosted: true,
    boostExpiry: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    createdAt: new Date()
  }
];

export const mockDateRequests: DateRequest[] = [
  {
    id: "1",
    datePostId: "1",
    senderId: "2",
    status: "pending",
    messages: [
      {
        id: "msg1",
        senderId: "2",
        text: "Hey! I love coffee too. Would you like to meet at the new café in town?",
        timestamp: new Date()
      }
    ],
    createdAt: new Date()
  }
];

export const interestTags = [
  "Music", "Travel", "Foodie", "Art", "Books", "Movies", "Sports", "Gaming", 
  "Photography", "Fashion", "Technology", "Fitness", "Cooking", "Dance", 
  "Anime", "Yoga", "Hiking", "Pets", "Coffee", "Wine"
];

export const vibeTags = [
  "Chill", "Deep Chat", "Fun", "Adventure", "Intellectual", "Casual", 
  "Romantic", "Creative", "Energetic", "Laid-back", "Spontaneous", 
  "Art", "Music", "Foodie", "Cultural", "Outdoorsy"
];
