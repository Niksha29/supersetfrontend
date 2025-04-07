
import { Message, ApiResponse } from "@/types";

// Base API URL - replace this with your actual API URL when ready
const API_BASE_URL = "http://localhost:5000/api"; // Update this with your actual API URL

// Helper for handling API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json();
    return { data: {} as T, error: errorData.message || "An error occurred" };
  }
  const data = await response.json();
  return { data };
};

export const messagesApi = {
  getMessages: async (): Promise<ApiResponse<Message[]>> => {
    try {
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<Message[]>(response);
      */
      
      // For demonstration
      const messages: Message[] = [
        {
          id: "1",
          title: "Campus Recruitment Drive: TechCorp",
          content: "TechCorp will be conducting a campus recruitment drive on 15th May. All eligible students are requested to register by 10th May.",
          date: new Date(2023, 4, 5),
          author: "Placement Cell"
        },
        {
          id: "2",
          title: "Resume Workshop",
          content: "A resume building workshop will be held on 12th May in the seminar hall. All students are encouraged to attend.",
          date: new Date(2023, 4, 8),
          author: "Placement Cell"
        },
        {
          id: "3",
          title: "Internship Opportunity: InnovateTech",
          content: "InnovateTech is offering summer internships for computer science students. Last date to apply is 20th May.",
          date: new Date(2023, 4, 10),
          author: "Placement Cell"
        },
        {
          id: "4",
          title: "Mock Interview Sessions",
          content: "Mock interview sessions will be conducted from 22nd to 24th May. Sign up through the portal.",
          date: new Date(2023, 4, 15),
          author: "Placement Cell"
        }
      ];
      
      return { data: messages };
    } catch (error) {
      console.error("Get messages error:", error);
      return { data: [], error: "Failed to fetch messages" };
    }
  },
  
  createMessage: async (message: Omit<Message, 'id' | 'date'>): Promise<ApiResponse<Message>> => {
    try {
      console.log("Create message API call", message);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
        credentials: 'include'
      });
      return handleResponse<Message>(response);
      */
      
      // For demonstration
      const newMessage: Message = {
        ...message,
        id: Math.random().toString(36).substring(2, 9),
        date: new Date()
      };
      
      return { data: newMessage };
    } catch (error) {
      console.error("Create message error:", error);
      return { data: {} as Message, error: "Failed to create message" };
    }
  },
  
  deleteMessage: async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      console.log("Delete message API call", id);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      return handleResponse<{ success: boolean }>(response);
      */
      
      return { data: { success: true } };
    } catch (error) {
      console.error("Delete message error:", error);
      return { data: { success: false }, error: "Failed to delete message" };
    }
  },
  
  notifyStudents: async (messageId: string): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      console.log("Notify students API call", messageId);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/notify-students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId }),
        credentials: 'include'
      });
      return handleResponse<{ success: boolean }>(response);
      */
      
      return { data: { success: true } };
    } catch (error) {
      console.error("Notify students error:", error);
      return { data: { success: false }, error: "Failed to notify students" };
    }
  }
};
