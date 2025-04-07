
import { z } from "zod";

// Schema for job form
export const jobSchema = z.object({
  title: z.string().min(5, { message: "Job title must be at least 5 characters long" }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters long" }),
  location: z.string().min(2, { message: "Location must be at least 2 characters long" }),
  salary: z.string().min(1, { message: "Salary details are required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters long" }),
  departments: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Select at least one department",
  }),
  minCGPA: z.string().min(1, { message: "Minimum CGPA is required" }),
  deadline: z.string().min(1, { message: "Application deadline is required" }),
  sendEmail: z.boolean().default(false),
  excludePlaced: z.boolean().default(true),
});

export type JobFormValues = z.infer<typeof jobSchema>;

// Mock departments - exported to be reused
export const departments = [
  { id: "cse", label: "Computer Science Engineering" },
  { id: "it", label: "Information Technology" },
  { id: "ece", label: "Electronics & Communication" },
  { id: "ee", label: "Electrical Engineering" },
  { id: "me", label: "Mechanical Engineering" },
  { id: "ce", label: "Civil Engineering" },
];
