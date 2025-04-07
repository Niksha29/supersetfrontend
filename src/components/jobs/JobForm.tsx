
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { jobSchema, JobFormValues, departments } from "./JobFormSchema";
import { JobFormBasicInfo } from "./JobFormBasicInfo";
import { JobFormDescription } from "./JobFormDescription";
import { JobFormCriteria } from "./JobFormCriteria";
import { JobFormDepartments } from "./JobFormDepartments";
import { JobFormOptions } from "./JobFormOptions";
import { useState } from "react";
import { jobsApi } from "@/services";
import { useToast } from "@/hooks/use-toast";

export const JobForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      requirements: "",
      departments: [],
      minCGPA: "7.0",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks from now
      sendEmail: true,
      excludePlaced: true,
    },
  });
  
  const onSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Transform the form data to match the Job type
      const jobData = {
        title: data.title,
        company: data.company,
        location: data.location,
        salary: data.salary,
        description: data.description,
        departments: data.departments.includes("all") 
          ? departments.map(dept => dept.label) 
          : departments
              .filter(dept => data.departments.includes(dept.id))
              .map(dept => dept.label),
        deadline: new Date(data.deadline),
        // Convert requirements string to an array by splitting at newlines or semicolons
        requirements: data.requirements.split(/[\n;]+/).map(req => req.trim()).filter(req => req !== ""),
        // You might also want to add skills if they're in the form
        skills: [],
        minCGPA: parseFloat(data.minCGPA),
        excludePlaced: data.excludePlaced,
        applied: false
      };
      
      // Call the API to create a job
      const response = await jobsApi.createJob(jobData);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // If "sendEmail" is true, we can implement additional logic here
      if (data.sendEmail) {
        // Add logic to send email notifications about the new job
        console.log("Sending email notifications for new job");
      }
      
      toast({
        title: "Job Created",
        description: `Job posting for "${data.title}" at "${data.company}" has been created successfully.`,
      });
      
      form.reset();
    } catch (error) {
      console.error("Error creating job:", error);
      toast({
        title: "Error",
        description: "There was an error creating the job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <JobFormBasicInfo form={form} />
        <JobFormDescription form={form} />
        <JobFormCriteria form={form} />
        <JobFormDepartments form={form} />
        <JobFormOptions form={form} />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating..." : "Create Job Posting"}
        </Button>
      </form>
    </Form>
  );
};
