
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the dashboard
const placementStats = [
  {
    department: "Computer Science",
    placed: 42,
    total: 60,
    percentage: 70,
  },
  {
    department: "Electronics",
    placed: 35,
    total: 55,
    percentage: 64,
  },
  {
    department: "Mechanical",
    placed: 28,
    total: 50,
    percentage: 56,
  },
  {
    department: "Civil",
    placed: 20,
    total: 40,
    percentage: 50,
  },
  {
    department: "Electrical",
    placed: 30,
    total: 45,
    percentage: 67,
  },
];

const companyStats = [
  {
    name: "TechCorp",
    students: 15,
  },
  {
    name: "WebWorks",
    students: 12,
  },
  {
    name: "DataMinds",
    students: 10,
  },
  {
    name: "MarketPro",
    students: 8,
  },
  {
    name: "Others",
    students: 20,
  },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 250,
    registered: 240,
    placed: 155,
    companies: 32,
    activeJobs: 15,
  });

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of placement statistics and activities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all departments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Registered Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.registered}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((stats.registered / stats.totalStudents) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Students Placed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.placed}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((stats.placed / stats.registered) * 100)}% placement rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Companies Visited
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.companies}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeJobs} active job openings
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Placement Statistics by Department</CardTitle>
              <CardDescription>Percentage of students placed per department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={placementStats}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="department"
                      tickFormatter={(value) => value.substring(0, 3)}
                    />
                    <YAxis unit="%" />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Placement Rate"]}
                      labelFormatter={(label) => `Department: ${label}`}
                    />
                    <Bar
                      dataKey="percentage"
                      name="Placement Rate"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Students Placed by Company</CardTitle>
              <CardDescription>Top recruiting companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={companyStats}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 60,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip
                      formatter={(value) => [value, "Students Placed"]}
                      labelFormatter={(label) => `Company: ${label}`}
                    />
                    <Bar
                      dataKey="students"
                      name="Students Placed"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
