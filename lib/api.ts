// API client for the Google AI Gemini model

// Remove the hardcoded API key and use an environment variable instead
// const API_KEY = "AIzaSyCGdKhikfVac17FpxhlfVEKdxkT6uPsOEM"
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

// Define a return type for consistency
export type TasksResponse = {
  tasks: any[]; // The array of task data
  warning?: string; // Optional warning message
}

export async function analyzeTasks(taskContent: string): Promise<TasksResponse> {
  console.log("API: Preparing request")

  // Replace the placeholder in the prompt with the actual task content
  const prompt = `Analysis request: Please analyze these tasks and create detailed tickets for our project management system.

Task List:
${taskContent}

Please create the full ticket JSONs for each task.

Expected LLM API Response (Example Output):
[
  {
    "title": "Build Login Form for Mobile App",
    "description": [
      "Design a responsive login form UI",
      "Ensure compatibility with both iOS and Android",
      "Implement basic validation for username and password fields"
    ],
    "storyPoints": "5",
    "assignedTo": "Frontend Team",
    "reportTo": "Tech Lead",
    "parentTicket": "SPR-1001",
    "category": "Frontend",
    "status": "Not Started"
  }
]

Quick Summary of Fake Company Scenario:
	• Company Name: InnoTech Solutions
	• Teams: Frontend Team, Backend Team, UX Designers, QA Team
	• Leads: Tech Lead, Design Lead, QA Lead, Product Manager
	• Parent Ticket IDs: Format like SPR-100X
	• Categories: Frontend, Backend, Design, Testing`

  try {
    console.log("API: Sending request to Google AI API")

    // Make a server-side API call instead of directly calling from the client
    const response = await fetch("/api/analyze-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskContent: prompt }),
    })

    if (!response.ok) {
      console.error("API: Request failed", response.status, response.statusText)
      const errorText = await response.text()
      console.error("API: Error details", errorText)
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    console.log("API: Response received")
    const data = await response.json()
    console.log("API: Parsed response data", data)

    if (!data.success) {
      throw new Error(data.error || "Unknown error occurred")
    }

    // Create a consistent response structure
    const result: TasksResponse = {
      tasks: data.data || []
    }
    
    // If there's a warning message, include it
    if (data.warning) {
      result.warning = data.warning
    }

    return result
  } catch (error) {
    console.error("API: Error during API call", error)
    throw error
  }
}
