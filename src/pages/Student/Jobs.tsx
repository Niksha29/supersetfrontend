
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/components/dashboard/JobCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock job data
const mockJobs = [
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

const StudentJobs = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [appliedJobs, setAppliedJobs] = useState(mockJobs.filter(job => job.applied));
  const { toast } = useToast();
  
  const handleApply = (jobId: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, applied: true } : job
      )
    );
    
    const appliedJob = jobs.find(job => job.id === jobId);
    if (appliedJob) {
      setAppliedJobs(prev => [...prev, { ...appliedJob, applied: true }]);
      
      toast({
        title: "Application Submitted",
        description: `You have successfully applied for ${appliedJob.title} at ${appliedJob.company}.`,
      });
    }
  };

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Job Profiles</h1>
            <p className="text-muted-foreground">Browse and apply for available job opportunities</p>
          </div>
        </div>
        
        <Tabs defaultValue="available">
          <TabsList>
            <TabsTrigger value="available">Available Jobs</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  salary={job.salary}
                  departments={job.departments}
                  postedDate={job.postedDate}
                  deadline={job.deadline}
                  applied={job.applied}
                  onApply={handleApply}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="applied" className="mt-6">
            {appliedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appliedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    salary={job.salary}
                    departments={job.departments}
                    postedDate={job.postedDate}
                    deadline={job.deadline}
                    applied={true}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet.</p>
                <Button variant="outline" onClick={() => document.querySelector('[data-value="available"]')?.click()}>
                  Browse Available Jobs
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentJobs;
