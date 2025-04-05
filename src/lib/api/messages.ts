
import apiRequest from "../api-client";

// Message types
export interface Message {
  id: string;
  title: string;
  content: string;
  sender: {
    id: string;
    name: string;
    role: "admin" | "system";
  };
  createdAt: string;
  isRead: boolean;
  category?: "announcement" | "notification" | "alert";
  priority?: "low" | "medium" | "high";
}

// Dummy data
const DUMMY_MESSAGES: Message[] = [
  {
    id: "1",
    title: "Welcome to the Job Portal",
    content: "Welcome to our job portal! We're excited to help you find your dream job. Start browsing available positions and apply today.",
    sender: {
      id: "1",
      name: "Admin User",
      role: "admin",
    },
    createdAt: "2023-04-01T10:00:00Z",
    isRead: false,
    category: "announcement",
    priority: "medium",
  },
  {
    id: "2",
    title: "New Job Opportunities",
    content: "Check out the new job opportunities that have been posted this week. There are several positions that match your profile.",
    sender: {
      id: "0",
      name: "System",
      role: "system",
    },
    createdAt: "2023-04-05T15:30:00Z",
    isRead: true,
    category: "notification",
    priority: "low",
  },
  {
    id: "3",
    title: "Interview Scheduled",
    content: "Your interview with TechCorp has been scheduled for April 15th at 10:00 AM. Please prepare accordingly and be on time.",
    sender: {
      id: "1",
      name: "Admin User",
      role: "admin",
    },
    createdAt: "2023-04-08T09:15:00Z",
    isRead: false,
    category: "alert",
    priority: "high",
  },
];

// Messages API service
const messagesApi = {
  // Get all messages for a user
  getMessages: async (userId: string): Promise<Message[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Message[]>(`/messages?userId=${userId}`, "GET");
    
    // Dummy implementation
    return DUMMY_MESSAGES;
  },
  
  // Get a single message by ID
  getMessage: async (id: string): Promise<Message> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Message>(`/messages/${id}`, "GET");
    
    // Dummy implementation
    const message = DUMMY_MESSAGES.find(msg => msg.id === id);
    if (!message) {
      throw { response: { data: { message: "Message not found" } } };
    }
    return message;
  },
  
  // Mark a message as read
  markAsRead: async (id: string): Promise<Message> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Message>(`/messages/${id}/read`, "PATCH");
    
    // Dummy implementation
    const msgIndex = DUMMY_MESSAGES.findIndex(msg => msg.id === id);
    if (msgIndex === -1) {
      throw { response: { data: { message: "Message not found" } } };
    }
    
    const updatedMessage = { ...DUMMY_MESSAGES[msgIndex], isRead: true };
    return updatedMessage;
  },
  
  // Create a new message (admin only)
  createMessage: async (messageData: {
    title: string;
    content: string;
    category?: Message["category"];
    priority?: Message["priority"];
    recipientIds?: string[];
  }): Promise<Message> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Message>("/messages", "POST", messageData);
    
    // Dummy implementation
    const newMessage: Message = {
      id: String(DUMMY_MESSAGES.length + 1),
      title: messageData.title,
      content: messageData.content,
      sender: {
        id: "1",
        name: "Admin User",
        role: "admin",
      },
      createdAt: new Date().toISOString(),
      isRead: false,
      category: messageData.category,
      priority: messageData.priority || "medium",
    };
    
    return newMessage;
  },
  
  // Delete a message (admin only or owner)
  deleteMessage: async (id: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<void>(`/messages/${id}`, "DELETE");
    
    // Dummy implementation
    const msgIndex = DUMMY_MESSAGES.findIndex(msg => msg.id === id);
    if (msgIndex === -1) {
      throw { response: { data: { message: "Message not found" } } };
    }
    
    // In the dummy implementation, we don't actually delete anything
    return;
  },
};

export default messagesApi;
