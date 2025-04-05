
import apiRequest from "../api-client";

// Interview types
export interface Interview {
  id: string;
  jobId: string;
  studentId: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  type: "technical" | "behavioral" | "HR" | "final";
  location: string; // can be a physical address or a virtual meeting link
  notes?: string;
  feedback?: InterviewFeedback;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  rating: number; // 1-5
  strengths?: string[];
  weaknesses?: string[];
  notes?: string;
  recommendation: "proceed" | "reject" | "consider";
  createdAt: string;
}

// Dummy data
const DUMMY_INTERVIEWS: Interview[] = [
  {
    id: "1",
    jobId: "1",
    studentId: "2",
    scheduledAt: "2023-05-15T14:00:00Z",
    duration: 60,
    status: "scheduled",
    type: "technical",
    location: "https://meet.google.com/abc-defg-hij",
    notes: "Please prepare to discuss your experience with React and Node.js.",
  },
  {
    id: "2",
    jobId: "3",
    studentId: "2",
    scheduledAt: "2023-05-10T11:00:00Z",
    duration: 45,
    status: "completed",
    type: "behavioral",
    location: "DataMind Office, 123 Tech St, Boston, MA",
    notes: "Focus will be on teamwork and problem-solving abilities.",
    feedback: {
      id: "1",
      interviewId: "2",
      rating: 4,
      strengths: ["Communication", "Problem-solving"],
      weaknesses: ["Technical depth in ML algorithms"],
      notes: "Candidate showed strong communication skills and ability to work in teams.",
      recommendation: "proceed",
      createdAt: "2023-05-10T12:15:00Z",
    },
  },
  {
    id: "3",
    jobId: "2",
    studentId: "2",
    scheduledAt: "2023-05-20T15:30:00Z",
    duration: 30,
    status: "scheduled",
    type: "HR",
    location: "Zoom: https://zoom.us/j/123456789",
    notes: "Discussion about compensation expectations and company policies.",
  },
];

// Interviews API service
const interviewsApi = {
  // Get all interviews for a student
  getStudentInterviews: async (studentId: string): Promise<Interview[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview[]>(`/interviews?studentId=${studentId}`, "GET");
    
    // Dummy implementation
    return DUMMY_INTERVIEWS.filter(i => i.studentId === studentId);
  },
  
  // Get a single interview by ID
  getInterview: async (id: string): Promise<Interview> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview>(`/interviews/${id}`, "GET");
    
    // Dummy implementation
    const interview = DUMMY_INTERVIEWS.find(i => i.id === id);
    if (!interview) {
      throw { response: { data: { message: "Interview not found" } } };
    }
    return interview;
  },
  
  // Student accepting an interview invite
  acceptInterview: async (id: string): Promise<Interview> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview>(`/interviews/${id}/accept`, "PATCH");
    
    // Dummy implementation
    const interviewIndex = DUMMY_INTERVIEWS.findIndex(i => i.id === id);
    if (interviewIndex === -1) {
      throw { response: { data: { message: "Interview not found" } } };
    }
    
    // No status change in dummy implementation, just return the interview
    return DUMMY_INTERVIEWS[interviewIndex];
  },
  
  // Student requesting reschedule
  requestReschedule: async (id: string, newSchedule: { scheduledAt: string; reason?: string }): Promise<Interview> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview>(`/interviews/${id}/reschedule-request`, "PATCH", newSchedule);
    
    // Dummy implementation
    const interviewIndex = DUMMY_INTERVIEWS.findIndex(i => i.id === id);
    if (interviewIndex === -1) {
      throw { response: { data: { message: "Interview not found" } } };
    }
    
    const updatedInterview = {
      ...DUMMY_INTERVIEWS[interviewIndex],
      status: "rescheduled" as const,
      scheduledAt: newSchedule.scheduledAt,
      notes: DUMMY_INTERVIEWS[interviewIndex].notes + 
        (newSchedule.reason ? `\nReschedule reason: ${newSchedule.reason}` : ''),
    };
    
    return updatedInterview;
  },
  
  // Admin functions
  
  // Schedule an interview (admin only)
  scheduleInterview: async (interviewData: Omit<Interview, "id" | "status" | "feedback">): Promise<Interview> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview>("/interviews", "POST", interviewData);
    
    // Dummy implementation
    const newInterview: Interview = {
      ...interviewData,
      id: String(DUMMY_INTERVIEWS.length + 1),
      status: "scheduled",
    };
    
    return newInterview;
  },
  
  // Update an interview (admin only)
  updateInterview: async (id: string, interviewData: Partial<Omit<Interview, "id" | "feedback">>): Promise<Interview> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview>(`/interviews/${id}`, "PATCH", interviewData);
    
    // Dummy implementation
    const interviewIndex = DUMMY_INTERVIEWS.findIndex(i => i.id === id);
    if (interviewIndex === -1) {
      throw { response: { data: { message: "Interview not found" } } };
    }
    
    const updatedInterview = {
      ...DUMMY_INTERVIEWS[interviewIndex],
      ...interviewData,
    };
    
    return updatedInterview;
  },
  
  // Cancel an interview (admin only)
  cancelInterview: async (id: string, reason?: string): Promise<Interview> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview>(`/interviews/${id}/cancel`, "PATCH", { reason });
    
    // Dummy implementation
    const interviewIndex = DUMMY_INTERVIEWS.findIndex(i => i.id === id);
    if (interviewIndex === -1) {
      throw { response: { data: { message: "Interview not found" } } };
    }
    
    const updatedInterview = {
      ...DUMMY_INTERVIEWS[interviewIndex],
      status: "cancelled" as const,
      notes: DUMMY_INTERVIEWS[interviewIndex].notes + 
        (reason ? `\nCancellation reason: ${reason}` : ''),
    };
    
    return updatedInterview;
  },
  
  // Add feedback to an interview (admin only)
  addFeedback: async (interviewId: string, feedbackData: Omit<InterviewFeedback, "id" | "interviewId" | "createdAt">): Promise<InterviewFeedback> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<InterviewFeedback>(`/interviews/${interviewId}/feedback`, "POST", feedbackData);
    
    // Dummy implementation
    const interviewIndex = DUMMY_INTERVIEWS.findIndex(i => i.id === interviewId);
    if (interviewIndex === -1) {
      throw { response: { data: { message: "Interview not found" } } };
    }
    
    const newFeedback: InterviewFeedback = {
      id: "feedback_" + interviewId,
      interviewId,
      ...feedbackData,
      createdAt: new Date().toISOString(),
    };
    
    // Update the interview with the feedback
    DUMMY_INTERVIEWS[interviewIndex].feedback = newFeedback;
    DUMMY_INTERVIEWS[interviewIndex].status = "completed";
    
    return newFeedback;
  },
  
  // Get all interviews (admin only)
  getAllInterviews: async (): Promise<Interview[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Interview[]>("/interviews", "GET");
    
    // Dummy implementation
    return DUMMY_INTERVIEWS;
  },
};

export default interviewsApi;
