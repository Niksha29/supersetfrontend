import { User, Message, Job, Event, Interview, Assessment, ApiResponse } from "@/types";

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

// =============== Auth API ===============
export const authApi = {
  login: async (email: string, password: string, role: 'student' | 'admin' | null): Promise<ApiResponse<User>> => {
    try {
      console.log("Login API call", { email, password, role });
      
      // For demonstration, still using dummy data until real API integration
      // Replace this with actual API call when ready
      const userData: User = {
        id: role === 'admin' ? 'admin-123' : 'student-456',
        email,
        name: role === 'admin' ? 'Admin User' : 'Student User',
        role
      };
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
        credentials: 'include'
      });
      return handleResponse<User>(response);
      */
      
      return { data: userData };
    } catch (error) {
      console.error("Login error:", error);
      return { data: {} as User, error: "Failed to connect to login service" };
    }
  },
  
  register: async (userData: any, role: 'student' | 'admin' | null): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      console.log("Register API call", { userData, role });
      
      // When ready to connect to real API, uncomment this:
      /*
      const endpoint = role === 'admin' ? '/register' : '/register-students';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      return handleResponse<{ success: boolean }>(response);
      */
      
      return { data: { success: true } };
    } catch (error) {
      console.error("Register error:", error);
      return { data: { success: false }, error: "Failed to connect to registration service" };
    }
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User | null>> => {
    try {
      // Replace this with actual API call when ready
      const storedUser = localStorage.getItem('user');
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<User | null>(response);
      */
      
      if (storedUser) {
        return { data: JSON.parse(storedUser) };
      }
      return { data: null };
    } catch (error) {
      console.error("Get current user error:", error);
      return { data: null, error: "Failed to fetch current user" };
    }
  },
  
  logout: async (): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      console.log("Logout API call");
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      return handleResponse<{ success: boolean }>(response);
      */
      
      return { data: { success: true } };
    } catch (error) {
      console.error("Logout error:", error);
      return { data: { success: false }, error: "Failed to logout" };
    }
  },
  
  updateProfile: async (profileData: any): Promise<ApiResponse<User>> => {
    try {
      console.log("Update profile API call", profileData);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
        credentials: 'include'
      });
      return handleResponse<User>(response);
      */
      
      // For demonstration
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const updatedUser = { ...userData, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { data: updatedUser };
      }
      return { data: {} as User, error: "User not found" };
    } catch (error) {
      console.error("Update profile error:", error);
      return { data: {} as User, error: "Failed to update profile" };
    }
  },
  
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<User>(response);
      */
      
      // For demonstration
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return { data: JSON.parse(storedUser) };
      }
      return { data: {} as User, error: "User not found" };
    } catch (error) {
      console.error("Get profile error:", error);
      return { data: {} as User, error: "Failed to get profile" };
    }
  }
};

// =============== Messages API ===============
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

// =============== Jobs API ===============
export const jobsApi = {
  getJobs: async (): Promise<ApiResponse<Job[]>> => {
    try {
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/jobs/available`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<Job[]>(response);
      */
      
      // For demonstration
      const jobs: Job[] = [
        {
          id: "1",
          title: "Software Developer",
          company: "TechCorp",
          location: "Bangalore",
          salary: "₹6-8 LPA",
          departments: ["Computer Science", "Information Technology"],
          postedDate: new Date(2023, 4, 5),
          deadline: new Date(2023, 5, 5),
          description: "We are looking for a software developer to join our team.",
          applied: false
        },
        {
          id: "2",
          title: "Data Analyst",
          company: "DataMinds",
          location: "Hyderabad",
          salary: "₹5-7 LPA",
          departments: ["Computer Science", "Mathematics", "Statistics"],
          postedDate: new Date(2023, 4, 8),
          deadline: new Date(2023, 5, 8),
          description: "Looking for data analysts with strong statistical knowledge.",
          applied: false
        },
        {
          id: "3",
          title: "Frontend Developer",
          company: "WebWorks",
          location: "Chennai",
          salary: "₹7-9 LPA",
          departments: ["Computer Science", "Information Technology"],
          postedDate: new Date(2023, 4, 10),
          deadline: new Date(2023, 5, 10),
          description: "Frontend developers with React experience required.",
          applied: true
        },
        {
          id: "4",
          title: "Marketing Executive",
          company: "MarketPro",
          location: "Mumbai",
          salary: "₹4-6 LPA",
          departments: ["Business Administration", "Marketing"],
          postedDate: new Date(2023, 4, 12),
          deadline: new Date(2023, 5, 12),
          description: "Looking for marketing executives for our Mumbai office.",
          applied: false
        }
      ];
      
      return { data: jobs };
    } catch (error) {
      console.error("Get jobs error:", error);
      return { data: [], error: "Failed to fetch jobs" };
    }
  },
  
  getAppliedJobs: async (): Promise<ApiResponse<Job[]>> => {
    try {
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/jobs/applied`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<Job[]>(response);
      */
      
      // For demonstration
      const jobs = await jobsApi.getJobs();
      const appliedJobs = jobs.data.filter(job => job.applied);
      
      return { data: appliedJobs };
    } catch (error) {
      console.error("Get applied jobs error:", error);
      return { data: [], error: "Failed to fetch applied jobs" };
    }
  },
  
  applyForJob: async (jobId: string): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      console.log("Apply for job API call", jobId);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
        method: 'POST',
        credentials: 'include'
      });
      return handleResponse<{ success: boolean }>(response);
      */
      
      return { data: { success: true } };
    } catch (error) {
      console.error("Apply for job error:", error);
      return { data: { success: false }, error: "Failed to apply for job" };
    }
  },
  
  createJob: async (job: Omit<Job, 'id' | 'postedDate'>): Promise<ApiResponse<Job>> => {
    try {
      console.log("Create job API call", job);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
        credentials: 'include'
      });
      return handleResponse<Job>(response);
      */
      
      // For demonstration
      const newJob: Job = {
        ...job,
        id: Math.random().toString(36).substring(2, 9),
        postedDate: new Date()
      };
      
      return { data: newJob };
    } catch (error) {
      console.error("Create job error:", error);
      return { data: {} as Job, error: "Failed to create job" };
    }
  },
  
  deleteJob: async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      console.log("Delete job API call", id);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      return handleResponse<{ success: boolean }>(response);
      */
      
      return { data: { success: true } };
    } catch (error) {
      console.error("Delete job error:", error);
      return { data: { success: false }, error: "Failed to delete job" };
    }
  },
  
  getFilteredJobs: async (studentId: string): Promise<ApiResponse<Job[]>> => {
    try {
      console.log("Get filtered jobs API call", studentId);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/filtered-jobs/${studentId}`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<Job[]>(response);
      */
      
      // For demonstration, return all jobs
      return jobsApi.getJobs();
    } catch (error) {
      console.error("Get filtered jobs error:", error);
      return { data: [], error: "Failed to fetch filtered jobs" };
    }
  },
  
  getApplicationStatus: async (studentId: string): Promise<ApiResponse<any[]>> => {
    try {
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/jobs/${studentId}/status`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<any[]>(response);
      */
      
      // For demonstration
      return { data: [
        { jobId: "1", status: "pending" },
        { jobId: "3", status: "accepted" },
      ]};
    } catch (error) {
      console.error("Get application status error:", error);
      return { data: [], error: "Failed to fetch application status" };
    }
  }
};

// =============== User Management API (Admin) ===============
export const userApi = {
  getAllStudents: async (): Promise<ApiResponse<User[]>> => {
    try {
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<User[]>(response);
      */
      
      // For demonstration
      return { data: [
        { id: "s1", name: "John Doe", email: "john@example.com", role: "student" },
        { id: "s2", name: "Jane Smith", email: "jane@example.com", role: "student" },
        { id: "s3", name: "Bob Johnson", email: "bob@example.com", role: "student" },
      ]};
    } catch (error) {
      console.error("Get all students error:", error);
      return { data: [], error: "Failed to fetch students" };
    }
  },
  
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    try {
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/all`, {
        method: 'GET',
        credentials: 'include'
      });
      return handleResponse<User[]>(response);
      */
      
      // For demonstration
      return { data: [
        { id: "s1", name: "John Doe", email: "john@example.com", role: "student" },
        { id: "s2", name: "Jane Smith", email: "jane@example.com", role: "student" },
        { id: "s3", name: "Bob Johnson", email: "bob@example.com", role: "student" },
        { id: "a1", name: "Admin User", email: "admin@example.com", role: "admin" },
      ]};
    } catch (error) {
      console.error("Get all users error:", error);
      return { data: [], error: "Failed to fetch users" };
    }
  },
  
  registerStudents: async (students: any[]): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      console.log("Register students API call", students);
      
      // When ready to connect to real API, uncomment this:
      /*
      const response = await fetch(`${API_BASE_URL}/register-students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ students }),
        credentials: 'include'
      });
      return handleResponse<{ success: boolean }>(response);
      */
      
      return { data: { success: true } };
    } catch (error) {
      console.error("Register students error:", error);
      return { data: { success: false }, error: "Failed to register students" };
    }
  }
};

// =============== Events API ===============
export const eventsApi = {
  getUpcomingEvents: async (): Promise<ApiResponse<Event[]>> => {
    // Replace this with actual API call
    const events: Event[] = [
      {
        title: "Resume Workshop",
        date: new Date(2023, 4, 12),
        type: "Workshop"
      },
      {
        title: "TechCorp Recruitment Drive",
        date: new Date(2023, 4, 15),
        type: "Recruitment"
      },
      {
        title: "Mock Interview Session",
        date: new Date(2023, 4, 22),
        type: "Interview"
      }
    ];
    
    return { data: events };
  }
};

// =============== Interviews API ===============
export const interviewsApi = {
  getInterviews: async (): Promise<ApiResponse<Interview[]>> => {
    // Replace this with actual API call
    const interviews: Interview[] = [
      {
        id: "1",
        company: "TechCorp",
        position: "Software Developer",
        date: new Date(2023, 4, 20),
        status: "scheduled"
      },
      {
        id: "2",
        company: "DataMinds",
        position: "Data Analyst",
        date: new Date(2023, 4, 25),
        status: "scheduled"
      },
      {
        id: "3",
        company: "WebWorks",
        position: "Frontend Developer",
        date: new Date(2023, 4, 15),
        status: "completed",
        notes: "Interview went well. Waiting for feedback."
      }
    ];
    
    return { data: interviews };
  }
};

// =============== Assessments API ===============
export const assessmentsApi = {
  getAssessments: async (): Promise<ApiResponse<Assessment[]>> => {
    // Replace this with actual API call
    const assessments: Assessment[] = [
      {
        id: "1",
        title: "Technical Assessment - TechCorp",
        description: "Complete the coding challenges to proceed to the next round.",
        deadline: new Date(2023, 4, 18),
        completed: false
      },
      {
        id: "2",
        title: "Aptitude Test - DataMinds",
        description: "Test your analytical skills with this aptitude assessment.",
        deadline: new Date(2023, 4, 20),
        completed: false
      },
      {
        id: "3",
        title: "Frontend Challenge - WebWorks",
        description: "Build a responsive dashboard using React.",
        deadline: new Date(2023, 4, 12),
        completed: true
      }
    ];
    
    return { data: assessments };
  },
  
  markAssessmentCompleted: async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
    // Replace this with actual API call
    console.log("Mark assessment completed API call", id);
    
    return { data: { success: true } };
  }
};
