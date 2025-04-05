
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | null;
}

export interface Message {
  id: string;
  title: string;
  content: string;
  date: Date;
  author: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  departments: string[];
  postedDate: Date;
  deadline: Date;
  description: string;
  applied?: boolean;
}

export interface Event {
  title: string;
  date: Date;
  type: string;
}

export interface Interview {
  id: string;
  company: string;
  position: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
