
import { Job, ApiResponse } from "@/types";

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
      
      // For demonstration - this is slightly different from the original as it needs to import the jobsApi
      const jobs: Job[] = [
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
        }
      ];
      
      return { data: jobs };
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
      
      // For demonstration, just call getJobs
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
