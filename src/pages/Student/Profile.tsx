
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock student data
const mockStudentData = {
  id: "student-456",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  department: "Computer Science Engineering",
  rollNumber: "CSE2023001",
  year: "4th Year",
  cgpa: "8.5",
  backlogs: "0",
  placementStatus: "Not Placed",
  address: "123 College Road, Bangalore",
  skills: ["JavaScript", "React", "Node.js", "Python", "Data Structures"],
  education: [
    {
      level: "B.Tech",
      institution: "Example Engineering College",
      year: "2020-2024",
      percentage: "85%"
    },
    {
      level: "XII",
      institution: "Example Higher Secondary School",
      year: "2019-2020",
      percentage: "92%"
    },
    {
      level: "X",
      institution: "Example School",
      year: "2017-2018",
      percentage: "94%"
    }
  ],
  projects: [
    {
      title: "E-commerce Website",
      description: "Built a full-stack e-commerce website using MERN stack",
      year: "2023"
    },
    {
      title: "Attendance System using Face Recognition",
      description: "Developed a face recognition based attendance system using Python and OpenCV",
      year: "2022"
    }
  ]
};

const StudentProfile = () => {
  const [student, setStudent] = useState(mockStudentData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student);
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setStudent(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-xl">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>{student.department} • {student.year}</CardDescription>
                <p className="text-sm mt-1">{student.email}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="personal">
          <TabsList>
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills & Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="mt-6 space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" value={formData.email} onChange={handleInputChange} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{student.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{student.address}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" value={formData.department} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Current Year</Label>
                      <Input id="year" name="year" value={formData.year} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cgpa">CGPA</Label>
                      <Input id="cgpa" name="cgpa" value={formData.cgpa} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backlogs">Backlogs</Label>
                      <Input id="backlogs" name="backlogs" value={formData.backlogs} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="placementStatus">Placement Status</Label>
                      <Input id="placementStatus" name="placementStatus" value={formData.placementStatus} onChange={handleInputChange} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{student.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Roll Number</p>
                      <p className="font-medium">{student.rollNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Year</p>
                      <p className="font-medium">{student.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="font-medium">{student.cgpa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Backlogs</p>
                      <p className="font-medium">{student.backlogs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Placement Status</p>
                      <p className="font-medium">{student.placementStatus}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {isEditing && (
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="education" className="mt-6 space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Education History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {student.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{edu.level}</h3>
                      <span className="text-sm text-muted-foreground">{edu.year}</span>
                    </div>
                    <p>{edu.institution}</p>
                    <p className="text-sm">Percentage/CGPA: {edu.percentage}</p>
                    {index < student.education.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="mt-6 space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {student.projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{project.title}</h3>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    <p className="text-sm">{project.description}</p>
                    {index < student.projects.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
