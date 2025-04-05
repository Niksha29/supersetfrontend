
import apiRequest from "../api-client";

// Job related types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  postedDate: string;
  deadline: string;
  status: "open" | "closed";
  logo?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  status: "pending" | "reviewed" | "interviewed" | "rejected" | "accepted";
  appliedDate: string;
  resume?: string;
  coverLetter?: string;
}

// Dummy data
const DUMMY_JOBS: Job[] = [
  {
    id: "1",
    title: "Junior Software Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    description: "We are looking for a junior software developer to join our team.",
    requirements: ["JavaScript", "React", "Node.js", "Git"],
    salary: "$80,000 - $100,000",
    type: "Full-time",
    postedDate: "2023-04-01T00:00:00Z",
    deadline: "2023-05-01T00:00:00Z",
    status: "open",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    company: "DesignHub",
    location: "Remote",
    description: "Join our design team as an intern and work on exciting projects.",
    requirements: ["Figma", "Adobe XD", "Prototyping", "UI/UX principles"],
    salary: "$25/hour",
    type: "Internship",
    postedDate: "2023-04-05T00:00:00Z",
    deadline: "2023-04-25T00:00:00Z",
    status: "open",
    logo: "https://logo.clearbit.com/adobe.com",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataMind",
    location: "Boston, MA",
    description: "Help us analyze large datasets and create machine learning models.",
    requirements: ["Python", "TensorFlow", "Data analysis", "Statistics"],
    salary: "$110,000 - $130,000",
    type: "Full-time",
    postedDate: "2023-03-15T00:00:00Z",
    deadline: "2023-04-30T00:00:00Z",
    status: "open",
    logo: "https://logo.clearbit.com/ibm.com",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudWorks",
    location: "Seattle, WA",
    description: "Join our DevOps team to improve our CI/CD pipelines and infrastructure.",
    requirements: ["AWS", "Docker", "Kubernetes", "Terraform"],
    salary: "$120,000 - $150,000",
    type: "Full-time",
    postedDate: "2023-03-20T00:00:00Z",
    deadline: "2023-04-20T00:00:00Z",
    status: "closed",
    logo: "https://logo.clearbit.com/amazon.com",
  },
];

const DUMMY_APPLICATIONS: JobApplication[] = [
  {
    id: "1",
    jobId: "1",
    studentId: "2",
    status: "pending",
    appliedDate: "2023-04-10T00:00:00Z",
    resume: "https://example.com/resume.pdf",
    coverLetter: "I am excited to apply for this position...",
  },
  {
    id: "2",
    jobId: "2",
    studentId: "2",
    status: "interviewed",
    appliedDate: "2023-04-08T00:00:00Z",
    resume: "https://example.com/resume.pdf",
  },
];

// Jobs API service
const jobsApi = {
  // Get all jobs (with optional filtering)
  getJobs: async (filters?: { status?: string; type?: string }): Promise<Job[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Job[]>("/jobs", "GET", filters);
    
    // Dummy implementation with filtering
    let filteredJobs = [...DUMMY_JOBS];
    
    if (filters?.status) {
      filteredJobs = filteredJobs.filter(job => job.status === filters.status);
    }
    
    if (filters?.type) {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }
    
    return filteredJobs;
  },
  
  // Get job by ID
  getJobById: async (id: string): Promise<Job> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Job>(`/jobs/${id}`, "GET");
    
    // Dummy implementation
    const job = DUMMY_JOBS.find(job => job.id === id);
    if (!job) {
      throw { response: { data: { message: "Job not found" } } };
    }
    return job;
  },
  
  // Create a new job (admin only)
  createJob: async (jobData: Omit<Job, "id" | "postedDate" | "status">): Promise<Job> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Job>("/jobs", "POST", jobData);
    
    // Dummy implementation
    const newJob: Job = {
      ...jobData,
      id: String(DUMMY_JOBS.length + 1),
      postedDate: new Date().toISOString(),
      status: "open",
    };
    
    return newJob;
  },
  
  // Update job (admin only)
  updateJob: async (id: string, jobData: Partial<Job>): Promise<Job> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Job>(`/jobs/${id}`, "PUT", jobData);
    
    // Dummy implementation
    const jobIndex = DUMMY_JOBS.findIndex(job => job.id === id);
    if (jobIndex === -1) {
      throw { response: { data: { message: "Job not found" } } };
    }
    
    const updatedJob = { ...DUMMY_JOBS[jobIndex], ...jobData };
    return updatedJob;
  },
  
  // Delete job (admin only)
  deleteJob: async (id: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<void>(`/jobs/${id}`, "DELETE");
    
    // Dummy implementation
    const jobIndex = DUMMY_JOBS.findIndex(job => job.id === id);
    if (jobIndex === -1) {
      throw { response: { data: { message: "Job not found" } } };
    }
    
    // In the dummy implementation, we don't actually delete anything
    return;
  },
  
  // Student applications
  getStudentApplications: async (studentId: string): Promise<JobApplication[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<JobApplication[]>(`/applications?studentId=${studentId}`, "GET");
    
    // Dummy implementation
    return DUMMY_APPLICATIONS.filter(app => app.studentId === studentId);
  },
  
  // Apply for a job
  applyForJob: async (jobId: string, studentId: string, data: { resume?: string; coverLetter?: string }): Promise<JobApplication> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<JobApplication>("/applications", "POST", { jobId, studentId, ...data });
    
    // Dummy implementation
    const job = DUMMY_JOBS.find(job => job.id === jobId);
    if (!job) {
      throw { response: { data: { message: "Job not found" } } };
    }
    
    if (job.status === "closed") {
      throw { response: { data: { message: "This job is no longer accepting applications" } } };
    }
    
    const existingApplication = DUMMY_APPLICATIONS.find(
      app => app.jobId === jobId && app.studentId === studentId
    );
    
    if (existingApplication) {
      throw { response: { data: { message: "You have already applied for this job" } } };
    }
    
    const newApplication: JobApplication = {
      id: String(DUMMY_APPLICATIONS.length + 1),
      jobId,
      studentId,
      status: "pending",
      appliedDate: new Date().toISOString(),
      ...data,
    };
    
    return newApplication;
  },
  
  // Get all applications (admin only)
  getAllApplications: async (): Promise<JobApplication[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<JobApplication[]>("/applications", "GET");
    
    // Dummy implementation
    return DUMMY_APPLICATIONS;
  },
  
  // Update application status (admin only)
  updateApplicationStatus: async (applicationId: string, status: JobApplication["status"]): Promise<JobApplication> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<JobApplication>(`/applications/${applicationId}`, "PATCH", { status });
    
    // Dummy implementation
    const appIndex = DUMMY_APPLICATIONS.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      throw { response: { data: { message: "Application not found" } } };
    }
    
    const updatedApplication = { ...DUMMY_APPLICATIONS[appIndex], status };
    return updatedApplication;
  },
};

export default jobsApi;
