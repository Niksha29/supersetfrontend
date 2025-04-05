
import { toast } from "@/hooks/use-toast";

// Base API configuration
const API_CONFIG = {
  BASE_URL: "https://dummyapi.example.com/api", // Replace with your real API base URL when ready
  TIMEOUT: 10000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// Error handler helper
const handleApiError = (error: any) => {
  console.error("API Error:", error);
  const message = error.response?.data?.message || error.message || "An unknown error occurred";
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
  return Promise.reject(error);
};

// Generic API request function with error handling
const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  data?: any,
  customHeaders?: Record<string, string>
): Promise<T> => {
  try {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = { ...API_CONFIG.HEADERS, ...customHeaders };
    
    const options: RequestInit = {
      method,
      headers,
      credentials: "include",
    };

    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { response: { data: errorData }, status: response.status };
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export default apiRequest;
