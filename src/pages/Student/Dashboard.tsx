
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MessageCard } from "@/components/dashboard/MessageCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messagesApi, eventsApi } from "@/services";
import { Message, Event } from "@/types";

const StudentDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch messages and events in parallel
        const [messagesResponse, eventsResponse] = await Promise.all([
          messagesApi.getMessages(),
          eventsApi.getUpcomingEvents()
        ]);
        
        if (messagesResponse.error) {
          throw new Error(messagesResponse.error);
        }
        if (eventsResponse.error) {
          throw new Error(eventsResponse.error);
        }
        
        setMessages(messagesResponse.data);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
              {loading ? (
                <p>Loading messages...</p>
              ) : (
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
              )}
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-1/3 bg-card/60 backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading events...</p>
              ) : (
                <div className="space-y-4">
                  {events.map((event, index) => (
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
