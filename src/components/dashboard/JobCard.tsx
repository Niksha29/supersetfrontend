
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  departments: string[];
  postedDate: Date;
  deadline: Date;
  applied?: boolean;
  onApply?: (id: string) => void;
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  departments,
  postedDate,
  deadline,
  applied = false,
  onApply
}: JobCardProps) => {
  const isExpired = new Date() > deadline;
  
  return (
    <Card className="overflow-hidden bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{company} • {location}</CardDescription>
          </div>
          {applied && (
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
              Applied
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Salary</p>
            <p className="font-medium">{salary}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Posted</p>
            <p className="font-medium">{formatDistanceToNow(postedDate, { addSuffix: true })}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Deadline</p>
            <p className="font-medium">{formatDistanceToNow(deadline, { addSuffix: true })}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Eligible Departments</p>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Badge key={dept} variant="secondary" className="text-xs">
                {dept}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!applied && !isExpired && onApply && (
          <Button 
            className="w-full" 
            onClick={() => onApply(id)}
          >
            Apply Now
          </Button>
        )}
        {!applied && isExpired && (
          <Button 
            variant="outline" 
            className="w-full" 
            disabled
          >
            Application Closed
          </Button>
        )}
        {applied && (
          <Button 
            variant="outline" 
            className="w-full"
          >
            View Application
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
