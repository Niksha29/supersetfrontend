
import authApi from "./auth";
import jobsApi from "./jobs";
import messagesApi from "./messages";
import usersApi from "./users";
import assessmentsApi from "./assessments";
import interviewsApi from "./interviews";

// Export all API services
const api = {
  auth: authApi,
  jobs: jobsApi,
  messages: messagesApi,
  users: usersApi,
  assessments: assessmentsApi,
  interviews: interviewsApi,
};

export default api;
