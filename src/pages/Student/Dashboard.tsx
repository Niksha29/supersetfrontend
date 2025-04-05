
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MessageCard } from "@/components/dashboard/MessageCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the dashboard
const mockMessages = [
  {
    id: "1",
    title: "Campus Recruitment Drive: TechCorp",
    content: "TechCorp will be conducting a campus recruitment drive on 15th May. All eligible students are requested to register by 10th May.",
    date: new Date(2023, 4, 5),
    author: "Placement Cell"
  },
  {
    id: "2",
    title: "Resume Workshop",
    content: "A resume building workshop will be held on 12th May in the seminar hall. All students are encouraged to attend.",
    date: new Date(2023, 4, 8),
    author: "Placement Cell"
  },
  {
    id: "3",
    title: "Internship Opportunity: InnovateTech",
    content: "InnovateTech is offering summer internships for computer science students. Last date to apply is 20th May.",
    date: new Date(2023, 4, 10),
    author: "Placement Cell"
  },
  {
    id: "4",
    title: "Mock Interview Sessions",
    content: "Mock interview sessions will be conducted from 22nd to 24th May. Sign up through the portal.",
    date: new Date(2023, 4, 15),
    author: "Placement Cell"
  }
];

const upcomingEvents = [
  {
    title: "Resume Workshop",
    date: new Date(2023, 4, 12),
    type: "Workshop"
  },
  {
    title: "TechCorp Recruitment Drive",
    date: new Date(2023, 4, 15),
    type: "Recruitment"
  },
  {
    title: "Mock Interview Session",
    date: new Date(2023, 4, 22),
    type: "Interview"
  }
];

const StudentDashboard = () => {
  const [messages, setMessages] = useState(mockMessages);
  
  useEffect(() => {
    // Here you would fetch messages from your API
    // For now, we're using mock data
  }, []);

  return (
    <DashboardLayout requiredRole="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="w-full md:w-2/3 bg-card/60 backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle>Welcome to Placement Portal</CardTitle>
              <CardDescription>
                Stay updated with latest placement opportunities and messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Messages</TabsTrigger>
                  <TabsTrigger value="important">Important</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-4">
                  {messages.map((message) => (
                    <MessageCard
                      key={message.id}
                      title={message.title}
                      content={message.content}
                      date={message.date}
                      author={message.author}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="important" className="mt-4 space-y-4">
                  {messages.slice(0, 2).map((message) => (
                    <MessageCard
                      key={message.id}
                      title={message.title}
                      content={message.content}
                      date={message.date}
                      author={message.author}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-1/3 bg-card/60 backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex justify-between items-start border-b border-border pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="bg-secondary px-2 py-1 rounded text-xs">
                      {event.type}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
