import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { messagesApi } from "@/services";

// Schema for message form
const messageSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters long" }),
  departments: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Select at least one department",
  }),
  sendEmail: z.boolean().default(false),
  isPinned: z.boolean().default(false),
});

type MessageFormValues = z.infer<typeof messageSchema>;

// Mock departments
const departments = [
  { id: "cse", label: "Computer Science Engineering" },
  { id: "it", label: "Information Technology" },
  { id: "ece", label: "Electronics & Communication" },
  { id: "ee", label: "Electrical Engineering" },
  { id: "me", label: "Mechanical Engineering" },
  { id: "ce", label: "Civil Engineering" },
];

const AdminCreateMessage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      title: "",
      content: "",
      departments: ["all"],
      sendEmail: true,
      isPinned: false,
    },
  });
  
  const onSubmit = async (data: MessageFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create message through API
      const messageData = {
        title: data.title,
        content: data.content,
        author: "Placement Cell", // This would come from the logged-in user
        departments: data.departments,
        isPinned: data.isPinned
      };
      
      const { data: result, error } = await messagesApi.createMessage(messageData);
      
      if (error) {
        throw new Error(error);
      }
      
      // If sendEmail is true, notify students
      if (data.sendEmail && result.id) {
        await messagesApi.notifyStudents(result.id);
      }
      
      toast({
        title: "Message Created",
        description: `Your message "${data.title}" has been published successfully.`,
      });
      
      form.reset();
    } catch (error) {
      console.error("Error creating message:", error);
      toast({
        title: "Error",
        description: "There was an error creating your message. Please try again.",
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
          <h1 className="text-2xl font-bold">Create Message</h1>
          <p className="text-muted-foreground">Create a new message or announcement for students</p>
        </div>
        
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>New Message</CardTitle>
            <CardDescription>
              Fill in the details below to create a new message for students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title of your message" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear and concise title for your message.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the content of your message" 
                          rows={6} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The main content of your message.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="departments"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Target Departments</FormLabel>
                          <FormDescription>
                            Select which departments should receive this message.
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
                            Notify students via email about this message.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isPinned"
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
                            Pin Message
                          </FormLabel>
                          <FormDescription>
                            Pin this message to the top of students' dashboards.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Posting..." : "Post Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCreateMessage;
