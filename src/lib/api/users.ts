
import apiRequest from "../api-client";
import { User } from "./auth";

// Extended user profile
export interface UserProfile extends User {
  phone?: string;
  bio?: string;
  skills?: string[];
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

// Dummy data
const DUMMY_PROFILES: UserProfile[] = [
  {
    id: "1",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    profilePicture: "https://i.pravatar.cc/150?u=admin",
    phone: "+1-555-123-4567",
    bio: "I am an administrator for the platform, helping students find their dream jobs.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/adminuser",
    },
  },
  {
    id: "2",
    email: "student@example.com",
    firstName: "Student",
    lastName: "User",
    role: "student",
    profilePicture: "https://i.pravatar.cc/150?u=student",
    phone: "+1-555-987-6543",
    bio: "Computer Science student looking for internship opportunities in software development.",
    skills: ["JavaScript", "React", "Node.js", "Python", "Git"],
    education: [
      {
        id: "1",
        institution: "University of Technology",
        degree: "Bachelor's",
        field: "Computer Science",
        startDate: "2020-09-01T00:00:00Z",
        current: true,
      },
    ],
    experience: [
      {
        id: "1",
        company: "TechStart",
        position: "Web Development Intern",
        location: "Remote",
        startDate: "2022-06-01T00:00:00Z",
        endDate: "2022-08-31T00:00:00Z",
        description: "Developed and maintained web applications using React and Node.js.",
      },
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/studentuser",
      github: "https://github.com/studentuser",
      portfolio: "https://studentuser.dev",
    },
  },
];

// Users API service
const usersApi = {
  // Get user profile
  getUserProfile: async (userId: string): Promise<UserProfile> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<UserProfile>(`/users/${userId}/profile`, "GET");
    
    // Dummy implementation
    const profile = DUMMY_PROFILES.find(profile => profile.id === userId);
    if (!profile) {
      throw { response: { data: { message: "User profile not found" } } };
    }
    return profile;
  },
  
  // Update user profile
  updateUserProfile: async (userId: string, profileData: Partial<Omit<UserProfile, "id" | "email" | "role">>): Promise<UserProfile> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<UserProfile>(`/users/${userId}/profile`, "PATCH", profileData);
    
    // Dummy implementation
    const profileIndex = DUMMY_PROFILES.findIndex(profile => profile.id === userId);
    if (profileIndex === -1) {
      throw { response: { data: { message: "User profile not found" } } };
    }
    
    const updatedProfile = {
      ...DUMMY_PROFILES[profileIndex],
      ...profileData,
    };
    
    return updatedProfile;
  },
  
  // Add education entry
  addEducation: async (userId: string, educationData: Omit<EducationEntry, "id">): Promise<EducationEntry> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<EducationEntry>(`/users/${userId}/education`, "POST", educationData);
    
    // Dummy implementation
    const profile = DUMMY_PROFILES.find(profile => profile.id === userId);
    if (!profile) {
      throw { response: { data: { message: "User profile not found" } } };
    }
    
    const newEducation: EducationEntry = {
      ...educationData,
      id: String(profile.education?.length || 0 + 1),
    };
    
    return newEducation;
  },
  
  // Update education entry
  updateEducation: async (userId: string, educationId: string, educationData: Partial<Omit<EducationEntry, "id">>): Promise<EducationEntry> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<EducationEntry>(`/users/${userId}/education/${educationId}`, "PATCH", educationData);
    
    // Dummy implementation
    const profile = DUMMY_PROFILES.find(profile => profile.id === userId);
    if (!profile || !profile.education) {
      throw { response: { data: { message: "User profile or education not found" } } };
    }
    
    const educationIndex = profile.education.findIndex(edu => edu.id === educationId);
    if (educationIndex === -1) {
      throw { response: { data: { message: "Education entry not found" } } };
    }
    
    const updatedEducation = {
      ...profile.education[educationIndex],
      ...educationData,
    };
    
    return updatedEducation;
  },
  
  // Delete education entry
  deleteEducation: async (userId: string, educationId: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<void>(`/users/${userId}/education/${educationId}`, "DELETE");
    
    // Dummy implementation - we don't actually delete anything
    return;
  },
  
  // Same pattern for experience
  addExperience: async (userId: string, experienceData: Omit<ExperienceEntry, "id">): Promise<ExperienceEntry> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<ExperienceEntry>(`/users/${userId}/experience`, "POST", experienceData);
    
    // Dummy implementation
    const profile = DUMMY_PROFILES.find(profile => profile.id === userId);
    if (!profile) {
      throw { response: { data: { message: "User profile not found" } } };
    }
    
    const newExperience: ExperienceEntry = {
      ...experienceData,
      id: String(profile.experience?.length || 0 + 1),
    };
    
    return newExperience;
  },
  
  // Update experience entry
  updateExperience: async (userId: string, experienceId: string, experienceData: Partial<Omit<ExperienceEntry, "id">>): Promise<ExperienceEntry> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<ExperienceEntry>(`/users/${userId}/experience/${experienceId}`, "PATCH", experienceData);
    
    // Dummy implementation - simplified for example purposes
    return {
      id: experienceId,
      company: experienceData.company || "Updated Company",
      position: experienceData.position || "Updated Position",
      startDate: experienceData.startDate || "2022-01-01",
      current: experienceData.current || false,
      endDate: experienceData.endDate,
      location: experienceData.location,
      description: experienceData.description,
    };
  },
  
  // Delete experience entry
  deleteExperience: async (userId: string, experienceId: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<void>(`/users/${userId}/experience/${experienceId}`, "DELETE");
    
    // Dummy implementation - we don't actually delete anything
    return;
  },
  
  // For admin - get all users
  getAllUsers: async (): Promise<User[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<User[]>("/users", "GET");
    
    // Dummy implementation - return simplified user objects
    return DUMMY_PROFILES.map(({ id, email, firstName, lastName, role, profilePicture }) => ({
      id,
      email,
      firstName,
      lastName,
      role,
      profilePicture,
    }));
  },
};

export default usersApi;
