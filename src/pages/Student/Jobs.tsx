
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/components/dashboard/JobCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { jobsApi } from "@/services";
import { Job } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const StudentJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState("available");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Fetch all jobs - if user is available, fetch filtered jobs for student
        let jobsResponse;
        if (user && user.id) {
          jobsResponse = await jobsApi.getFilteredJobs(user.id);
        } else {
          jobsResponse = await jobsApi.getJobs();
        }
        
        const { data: allJobs, error } = jobsResponse;
        
        if (error) {
          throw new Error(error);
        }
        
        setJobs(allJobs);
        
        // Fetch applied jobs
        const { data: applied, error: appliedError } = await jobsApi.getAppliedJobs();
        
        if (appliedError) {
          throw new Error(appliedError);
        }
        
        setAppliedJobs(applied);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast({
          title: "Error",
          description: "Failed to load jobs. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [user, toast]);
  
  const handleApply = async (jobId: string) => {
    try {
      const { data, error } = await jobsApi.applyForJob(jobId);
      
      if (error) {
        throw new Error(error);
      }
      
      if (data.success) {
        // Update the jobs list
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job.id === jobId ? { ...job, applied: true } : job
          )
        );
        
        // Add to applied jobs list
        const appliedJob = jobs.find(job => job.id === jobId);
        if (appliedJob) {
          setAppliedJobs(prev => [...prev, { ...appliedJob, applied: true }]);
          
          toast({
            title: "Application Submitted",
            description: `You have successfully applied for ${appliedJob.title} at ${appliedJob.company}.`,
          });
        }
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const switchToAvailableJobs = () => {
    setActiveTab("available");
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
        
        <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="available">Available Jobs</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="mt-6">
            {loading ? (
              <p>Loading available jobs...</p>
            ) : (
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
            )}
          </TabsContent>
          
          <TabsContent value="applied" className="mt-6">
            {loading ? (
              <p>Loading applied jobs...</p>
            ) : appliedJobs.length > 0 ? (
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
                <Button variant="outline" onClick={switchToAvailableJobs}>
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
