
import apiRequest from "../api-client";

// Assessment types
export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: "quiz" | "coding" | "behavioral";
  deadline: string;
  duration: number; // in minutes
  status: "pending" | "completed" | "expired";
  score?: number;
  totalScore?: number;
  createdBy: string;
  jobId?: string;
  questions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: "multiple_choice" | "coding" | "text";
  options?: { id: string; text: string }[];
  correctOptionId?: string;
  points: number;
}

export interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  studentId: string;
  submittedAt: string;
  answers: Answer[];
  score?: number;
  feedback?: string;
  status: "submitted" | "graded" | "in_review";
}

export interface Answer {
  questionId: string;
  selectedOptionId?: string;
  textAnswer?: string;
  codeAnswer?: string;
}

// Dummy data
const DUMMY_ASSESSMENTS: Assessment[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control flow.",
    type: "quiz",
    deadline: "2023-05-15T23:59:59Z",
    duration: 30,
    status: "pending",
    totalScore: 100,
    createdBy: "1", // admin ID
    jobId: "1",
    questions: [
      {
        id: "q1",
        text: "Which of the following is NOT a JavaScript data type?",
        type: "multiple_choice",
        options: [
          { id: "o1", text: "String" },
          { id: "o2", text: "Number" },
          { id: "o3", text: "Boolean" },
          { id: "o4", text: "Character" },
        ],
        correctOptionId: "o4",
        points: 10,
      },
      {
        id: "q2",
        text: "What is the output of: console.log(typeof [])?",
        type: "multiple_choice",
        options: [
          { id: "o1", text: "array" },
          { id: "o2", text: "object" },
          { id: "o3", text: "undefined" },
          { id: "o4", text: "null" },
        ],
        correctOptionId: "o2",
        points: 10,
      },
    ],
  },
  {
    id: "2",
    title: "React Coding Challenge",
    description: "Implement a simple React component according to the provided specifications.",
    type: "coding",
    deadline: "2023-05-20T23:59:59Z",
    duration: 60,
    status: "completed",
    score: 85,
    totalScore: 100,
    createdBy: "1", // admin ID
    jobId: "1",
  },
  {
    id: "3",
    title: "Behavioral Assessment",
    description: "Answer questions about how you would handle various workplace scenarios.",
    type: "behavioral",
    deadline: "2023-05-10T23:59:59Z",
    duration: 45,
    status: "pending",
    totalScore: 100,
    createdBy: "1", // admin ID
  },
];

const DUMMY_SUBMISSIONS: AssessmentSubmission[] = [
  {
    id: "1",
    assessmentId: "2",
    studentId: "2",
    submittedAt: "2023-04-25T14:30:00Z",
    answers: [],
    score: 85,
    feedback: "Good job! Your React component works as expected, but there's room for improvement in code organization.",
    status: "graded",
  },
];

// Assessments API service
const assessmentsApi = {
  // Get all assessments for a student
  getStudentAssessments: async (studentId: string): Promise<Assessment[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Assessment[]>(`/assessments?studentId=${studentId}`, "GET");
    
    // Dummy implementation
    return DUMMY_ASSESSMENTS;
  },
  
  // Get a single assessment by ID
  getAssessment: async (id: string): Promise<Assessment> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Assessment>(`/assessments/${id}`, "GET");
    
    // Dummy implementation
    const assessment = DUMMY_ASSESSMENTS.find(a => a.id === id);
    if (!assessment) {
      throw { response: { data: { message: "Assessment not found" } } };
    }
    return assessment;
  },
  
  // Submit an assessment
  submitAssessment: async (assessmentId: string, studentId: string, answers: Answer[]): Promise<AssessmentSubmission> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<AssessmentSubmission>("/submissions", "POST", { assessmentId, studentId, answers });
    
    // Dummy implementation
    const assessment = DUMMY_ASSESSMENTS.find(a => a.id === assessmentId);
    if (!assessment) {
      throw { response: { data: { message: "Assessment not found" } } };
    }
    
    const newSubmission: AssessmentSubmission = {
      id: String(DUMMY_SUBMISSIONS.length + 1),
      assessmentId,
      studentId,
      submittedAt: new Date().toISOString(),
      answers,
      status: "submitted",
    };
    
    // Update the assessment status to completed
    const assessmentIndex = DUMMY_ASSESSMENTS.findIndex(a => a.id === assessmentId);
    if (assessmentIndex !== -1) {
      DUMMY_ASSESSMENTS[assessmentIndex].status = "completed";
    }
    
    return newSubmission;
  },
  
  // Get a student's submission for an assessment
  getSubmission: async (assessmentId: string, studentId: string): Promise<AssessmentSubmission | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<AssessmentSubmission>(`/submissions?assessmentId=${assessmentId}&studentId=${studentId}`, "GET");
    
    // Dummy implementation
    const submission = DUMMY_SUBMISSIONS.find(
      s => s.assessmentId === assessmentId && s.studentId === studentId
    );
    
    return submission || null;
  },
  
  // Admin functions
  
  // Create a new assessment (admin only)
  createAssessment: async (assessmentData: Omit<Assessment, "id" | "status">): Promise<Assessment> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Assessment>("/assessments", "POST", assessmentData);
    
    // Dummy implementation
    const newAssessment: Assessment = {
      ...assessmentData,
      id: String(DUMMY_ASSESSMENTS.length + 1),
      status: "pending",
    };
    
    return newAssessment;
  },
  
  // Update an assessment (admin only)
  updateAssessment: async (id: string, assessmentData: Partial<Omit<Assessment, "id">>): Promise<Assessment> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<Assessment>(`/assessments/${id}`, "PATCH", assessmentData);
    
    // Dummy implementation
    const assessmentIndex = DUMMY_ASSESSMENTS.findIndex(a => a.id === id);
    if (assessmentIndex === -1) {
      throw { response: { data: { message: "Assessment not found" } } };
    }
    
    const updatedAssessment = {
      ...DUMMY_ASSESSMENTS[assessmentIndex],
      ...assessmentData,
    };
    
    return updatedAssessment;
  },
  
  // Delete an assessment (admin only)
  deleteAssessment: async (id: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<void>(`/assessments/${id}`, "DELETE");
    
    // Dummy implementation - we don't actually delete anything
    const assessmentIndex = DUMMY_ASSESSMENTS.findIndex(a => a.id === id);
    if (assessmentIndex === -1) {
      throw { response: { data: { message: "Assessment not found" } } };
    }
    
    return;
  },
  
  // Get all submissions for an assessment (admin only)
  getAssessmentSubmissions: async (assessmentId: string): Promise<AssessmentSubmission[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<AssessmentSubmission[]>(`/submissions?assessmentId=${assessmentId}`, "GET");
    
    // Dummy implementation
    return DUMMY_SUBMISSIONS.filter(s => s.assessmentId === assessmentId);
  },
  
  // Grade a submission (admin only)
  gradeSubmission: async (submissionId: string, gradeData: { score: number; feedback?: string }): Promise<AssessmentSubmission> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, replace with actual API call:
    // return apiRequest<AssessmentSubmission>(`/submissions/${submissionId}/grade`, "PATCH", gradeData);
    
    // Dummy implementation
    const submissionIndex = DUMMY_SUBMISSIONS.findIndex(s => s.id === submissionId);
    if (submissionIndex === -1) {
      throw { response: { data: { message: "Submission not found" } } };
    }
    
    const updatedSubmission = {
      ...DUMMY_SUBMISSIONS[submissionIndex],
      score: gradeData.score,
      feedback: gradeData.feedback,
      status: "graded" as const,
    };
    
    return updatedSubmission;
  },
};

export default assessmentsApi;
