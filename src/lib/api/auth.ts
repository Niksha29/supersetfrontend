
import apiRequest from "../api-client";

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "admin";
  profilePicture?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "student" | "admin";
}

// Dummy users for testing
const DUMMY_USERS: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    profilePicture: "https://i.pravatar.cc/150?u=admin",
  },
  {
    id: "2",
    email: "student@example.com",
    firstName: "Student",
    lastName: "User",
    role: "student",
    profilePicture: "https://i.pravatar.cc/150?u=student",
  },
];

// Auth API service
const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<{ user: User; token: string }>("/auth/login", "POST", credentials);
    
    // Dummy implementation for testing
    const user = DUMMY_USERS.find(u => u.email === credentials.email);
    if (!user || credentials.password !== "password") {
      throw { response: { data: { message: "Invalid email or password" } } };
    }
    
    return { 
      user, 
      token: "dummy-jwt-token-" + user.role 
    };
  },
  
  register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<{ user: User; token: string }>("/auth/register", "POST", data);
    
    // Dummy implementation
    const newUser: User = {
      id: String(DUMMY_USERS.length + 1),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || "student",
      profilePicture: `https://i.pravatar.cc/150?u=${data.email}`,
    };
    
    return { 
      user: newUser, 
      token: "dummy-jwt-token-" + newUser.role 
    };
  },
  
  logout: async (): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<void>("/auth/logout", "POST");
    
    // Dummy implementation doesn't need to do anything
    return;
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<User>("/auth/me", "GET");
    
    // Dummy implementation
    // Check if we have a token in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    
    // Return admin or student based on token
    return token.includes("admin") ? DUMMY_USERS[0] : DUMMY_USERS[1];
  },
};

export default authApi;
