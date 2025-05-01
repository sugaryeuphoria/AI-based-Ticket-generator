import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { taskContent } = await request.json()
    console.log("API Route: Received task content")

    // Use the environment variable for the API key
    const API_KEY = process.env.GOOGLE_AI_API_KEY

    if (!API_KEY) {
      console.error("API Route: Missing API key")
      
      // For demo purposes only! In a real app, you would never expose dummy data when API key is missing
      // Instead return a proper error that guides the user to set up their API key
      const dummyData = [
        {
          id: "SPR-001",
          title: "Create user login page",
          description: [
            "Design a responsive login form with email and password fields",
            "Implement form validation for all inputs",
            "Add 'Remember me' and 'Forgot password' functionality"
          ],
          storyPoints: "5",
          assignedTo: "Frontend Team",
          reportTo: "Tech Lead",
          parentTicket: "SPR-100",
          category: "Frontend",
          status: "To Do"
        },
        {
          id: "SPR-002",
          title: "Set up database tables for user authentication",
          description: [
            "Design user table with necessary fields for auth",
            "Create tables for roles and permissions",
            "Establish relationships between tables"
          ],
          storyPoints: "8",
          assignedTo: "Backend Team",
          reportTo: "Tech Lead",
          parentTicket: "SPR-100",
          category: "Backend",
          status: "To Do"
        },
        {
          id: "SPR-003",
          title: "Design onboarding screens for the new user flow",
          description: [
            "Create wireframes for all onboarding steps",
            "Design high-fidelity mockups based on approved wireframes",
            "Prepare assets for implementation"
          ],
          storyPoints: "5",
          assignedTo: "Design Team",
          reportTo: "Design Lead",
          parentTicket: "SPR-102",
          category: "Design",
          status: "In Progress"
        }
      ];
      
      return NextResponse.json({ 
        success: true, 
        data: dummyData,
        warning: "Using demo data. Set GOOGLE_AI_API_KEY in .env.local to use the AI functionality."
      });
    }

    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

    console.log("API Route: Sending request to Google AI API")

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: taskContent,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 1,
          maxOutputTokens: 8192,
        },
      }),
    })

    if (!response.ok) {
      console.error("API Route: Request failed", response.status, response.statusText)
      const errorText = await response.text()
      console.error("API Route: Error details", errorText)
      return NextResponse.json(
        { success: false, error: `API request failed: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    console.log("API Route: Response received")
    const data = await response.json()

    // Extract the content from the response
    const content = data.candidates[0].content.parts[0].text
    console.log("API Route: Processing content")

    // Find the JSON array in the response
    const jsonMatch = content.match(/\[[\s\S]*\]/)

    if (!jsonMatch) {
      console.error("API Route: No JSON found in response")
      return NextResponse.json({ success: false, error: "No valid JSON found in the API response" }, { status: 500 })
    }

    const jsonString = jsonMatch[0]

    // Parse the JSON string
    try {
      const parsedData = JSON.parse(jsonString)
      console.log("API Route: Successfully parsed JSON data")

      // Add IDs to the tasks if they don't have them
      const tasksWithIds = parsedData.map((task: any, index: number) => {
        if (!task.id) {
          return { id: `SPR-${String(index + 1).padStart(3, "0")}`, ...task }
        }
        return task
      })

      return NextResponse.json({ success: true, data: tasksWithIds })
    } catch (parseError) {
      console.error("API Route: JSON parsing error", parseError)
      return NextResponse.json({ success: false, error: "Failed to parse JSON from API response" }, { status: 500 })
    }
  } catch (error) {
    console.error("API Route: Error analyzing tasks:", error)
    return NextResponse.json({ success: false, error: "Failed to analyze tasks" }, { status: 500 })
  }
}
