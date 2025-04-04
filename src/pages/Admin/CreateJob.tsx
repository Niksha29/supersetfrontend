
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Schema for job form
const jobSchema = z.object({
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

type JobFormValues = z.infer<typeof jobSchema>;

// Mock departments
const departments = [
  { id: "cse", label: "Computer Science Engineering" },
  { id: "it", label: "Information Technology" },
  { id: "ece", label: "Electronics & Communication" },
  { id: "ee", label: "Electrical Engineering" },
  { id: "me", label: "Mechanical Engineering" },
  { id: "ce", label: "Civil Engineering" },
];

const AdminCreateJob = () => {
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Job data:", data);
      
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
    <DashboardLayout requiredRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create Job</h1>
          <p className="text-muted-foreground">Create a new job posting for students</p>
        </div>
        
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>New Job Posting</CardTitle>
            <CardDescription>
              Fill in the details below to create a new job opportunity for students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Software Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. TechCorp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Bangalore" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ₹5-7 LPA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter a detailed description of the job..." 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the skills and qualifications required for this job..." 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="minCGPA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum CGPA</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min="0" max="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="departments"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Eligible Departments</FormLabel>
                          <FormDescription>
                            Select which departments are eligible for this job.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="departments"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes("all")}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange(["all"]);
                                      } else {
                                        field.onChange([]);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  All Departments
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          
                          {form.watch("departments").includes("all") ? null : (
                            departments.map((department) => (
                              <FormField
                                key={department.id}
                                control={form.control}
                                name="departments"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(department.id)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([...field.value, department.id]);
                                          } else {
                                            field.onChange(field.value?.filter(
                                              (value) => value !== department.id
                                            ));
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {department.label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <FormField
                    control={form.control}
                    name="sendEmail"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Send Email Notification
                          </FormLabel>
                          <FormDescription>
                            Notify eligible students via email about this job opportunity.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excludePlaced"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Exclude Already Placed Students
                          </FormLabel>
                          <FormDescription>
                            Hide this job posting from students who already have placement offers.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Creating..." : "Create Job Posting"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCreateJob;
