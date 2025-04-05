
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Job } from "@/lib/api/jobs";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await api.jobs.getJobs({ status: "open" });
        setJobs(jobsData);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast({
          title: "Error",
          description: "Failed to load job listings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Job Portal Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to our job portal. Connect with employers, apply for jobs, and track your progress throughout the hiring process.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button>Sign In</Button>
            <Button variant="outline">Register</Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Latest Job Openings</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </div>
                      {job.logo && (
                        <img 
                          src={job.logo} 
                          alt={`${job.company} logo`} 
                          className="h-10 w-10 object-contain"
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Location:</span> {job.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Type:</span> {job.type}
                    </p>
                    {job.salary && (
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Salary:</span> {job.salary}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-4 line-clamp-3">
                      {job.description}
                    </p>
                    <Button className="w-full mt-4">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
