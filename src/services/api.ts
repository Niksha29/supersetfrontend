
import { User, Message, Job, Event, Interview, Assessment, ApiResponse } from "@/types";

// Base API URL - replace this with your actual API URL when ready
const API_BASE_URL = "https://api.example.com";

// Helper function to simulate API calls
const simulateApiCall = <T>(data: T, delay = 500, shouldFail = false): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ data: {} as T, error: "An error occurred" });
      } else {
        resolve({ data });
      }
    }, delay);
  });
};

// =============== Auth API ===============
export const authApi = {
  login: async (email: string, password: string, role: 'student' | 'admin' | null): Promise<ApiResponse<User>> => {
    // Replace this with actual API call
    console.log("Login API call", { email, password, role });
    
    const userData: User = {
      id: role === 'admin' ? 'admin-123' : 'student-456',
      email,
      name: role === 'admin' ? 'Admin User' : 'Student User',
      role
    };
    
    return simulateApiCall(userData);
  },
  
  register: async (userData: any, role: 'student' | 'admin' | null): Promise<ApiResponse<{ success: boolean }>> => {
    // Replace this with actual API call
    console.log("Register API call", { userData, role });
    
    return simulateApiCall({ success: true });
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User | null>> => {
    // Replace this with actual API call to get the current user
    // For now, check localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return simulateApiCall(JSON.parse(storedUser));
    }
    return simulateApiCall(null);
  },
  
  logout: async (): Promise<ApiResponse<{ success: boolean }>> => {
    // Replace this with actual API call
    console.log("Logout API call");
    
    return simulateApiCall({ success: true });
  }
};

// =============== Messages API ===============
export const messagesApi = {
  getMessages: async (): Promise<ApiResponse<Message[]>> => {
    // Replace this with actual API call
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
    
    return simulateApiCall(messages);
  },
  
  createMessage: async (message: Omit<Message, 'id' | 'date'>): Promise<ApiResponse<Message>> => {
    // Replace this with actual API call
    console.log("Create message API call", message);
    
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date()
    };
    
    return simulateApiCall(newMessage);
  }
};

// =============== Jobs API ===============
export const jobsApi = {
  getJobs: async (): Promise<ApiResponse<Job[]>> => {
    // Replace this with actual API call
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
    
    return simulateApiCall(jobs);
  },
  
  getAppliedJobs: async (): Promise<ApiResponse<Job[]>> => {
    // Replace this with actual API call
    const jobs = await jobsApi.getJobs();
    const appliedJobs = jobs.data.filter(job => job.applied);
    
    return simulateApiCall(appliedJobs);
  },
  
  applyForJob: async (jobId: string): Promise<ApiResponse<{ success: boolean }>> => {
    // Replace this with actual API call
    console.log("Apply for job API call", jobId);
    
    return simulateApiCall({ success: true });
  },
  
  createJob: async (job: Omit<Job, 'id' | 'postedDate'>): Promise<ApiResponse<Job>> => {
    // Replace this with actual API call
    console.log("Create job API call", job);
    
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substring(2, 9),
      postedDate: new Date()
    };
    
    return simulateApiCall(newJob);
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
    
    return simulateApiCall(events);
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
    
    return simulateApiCall(interviews);
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
    
    return simulateApiCall(assessments);
  },
  
  markAssessmentCompleted: async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
    // Replace this with actual API call
    console.log("Mark assessment completed API call", id);
    
    return simulateApiCall({ success: true });
  }
};
