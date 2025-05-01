"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronLeft, MessageSquare, Paperclip } from "lucide-react"

export default function TicketPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ticket, setTicket] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [storyPoints, setStoryPoints] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Function to retrieve tickets from sessionStorage
    const fetchTicketData = () => {
      try {
        setLoading(true)
        const ticketsString = sessionStorage.getItem('generatedTickets')
        
        if (!ticketsString) {
          // If no tickets in sessionStorage, check if we should use dummy data
          // In a real app, you might want to fetch from an API endpoint instead
          const useDummyData = true // Set to false to disable dummy data
          
          if (useDummyData) {
            // Dummy tickets for testing when no real data is available
            const dummyTickets = [
              {
                id: "TCK-001",
                title: "Create user login page",
                description: ["Design login form", "Connect API", "Validate user inputs"],
                storyPoints: "5",
                assignedTo: "Frontend Team",
                reportTo: "Project Manager",
                parentTicket: "TCK-101",
                category: "Development",
                status: "In Progress",
              },
              {
                id: "TCK-002",
                title: "Set up database schema",
                description: ["Create user table", "Add indexes", "Set up relationships"],
                storyPoints: "8",
                assignedTo: "Backend Team",
                reportTo: "Tech Lead",
                parentTicket: "TCK-102",
                category: "Database",
                status: "To Do",
              },
              {
                id: "TCK-003",
                title: "Implement user authentication flow",
                description: [
                  "Implement login form with email and password fields",
                  "Add social login options (Google, GitHub)",
                  "Create password reset functionality",
                ],
                storyPoints: "5",
                assignedTo: "Alex Johnson",
                reportTo: "Emma Davis",
                parentTicket: "TCK-101",
                category: "Feature",
                status: "In Progress",
              },
              {
                id: "TCK-004",
                title: "Create dashboard analytics",
                description: ["Design analytics widgets", "Implement data visualization", "Connect to data sources"],
                storyPoints: "13",
                assignedTo: "Sarah Williams",
                reportTo: "Project Manager",
                parentTicket: "TCK-103",
                category: "Feature",
                status: "To Do",
              },
              {
                id: "TCK-005",
                title: "Optimize API performance",
                description: ["Identify bottlenecks", "Implement caching", "Refactor slow queries"],
                storyPoints: "8",
                assignedTo: "Backend Team",
                reportTo: "Tech Lead",
                parentTicket: "TCK-104",
                category: "Improvement",
                status: "Done",
              },
            ]
            
            const foundTicket = dummyTickets.find(t => t.id === params.id)
            if (foundTicket) {
              setTicket(foundTicket)
              setTitle(foundTicket.title)
              setStoryPoints(foundTicket.storyPoints)
              setStatus(foundTicket.status.toLowerCase().replace(/\s+/g, "-"))
            } else {
              setError(`Ticket with ID ${params.id} not found`)
            }
          } else {
            setError("No tickets found. Please generate tickets first.")
          }
        } else {
          // Parse tickets from sessionStorage
          const tickets = JSON.parse(ticketsString)
          const foundTicket = tickets.find((t: any) => t.id === params.id)
          
          if (foundTicket) {
            setTicket(foundTicket)
            setTitle(foundTicket.title)
            setStoryPoints(foundTicket.storyPoints)
            setStatus(foundTicket.status.toLowerCase().replace(/\s+/g, "-"))
          } else {
            setError(`Ticket with ID ${params.id} not found`)
          }
        }
      } catch (err) {
        console.error("Error fetching ticket:", err)
        setError("Failed to load ticket data")
      } finally {
        setLoading(false)
      }
    }

    fetchTicketData()
  }, [params.id])

  // Function to save updates to the ticket
  const saveTicketChanges = () => {
    try {
      // Get all tickets from storage
      const ticketsString = sessionStorage.getItem('generatedTickets')
      
      if (ticketsString) {
        const tickets = JSON.parse(ticketsString)
        // Find and update the current ticket
        const updatedTickets = tickets.map((t: any) => {
          if (t.id === params.id) {
            return {
              ...t,
              title,
              storyPoints,
              status: status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            }
          }
          return t
        })
        
        // Save back to sessionStorage
        sessionStorage.setItem('generatedTickets', JSON.stringify(updatedTickets))
        alert("Ticket updated successfully")
      }
    } catch (err) {
      console.error("Error saving ticket changes:", err)
      alert("Failed to save changes")
    }
  }

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[50vh]">Loading ticket data...</div>
  }

  if (error) {
    return (
      <div className="p-8">
        <Button variant="ghost" className="mb-6 -ml-2 flex items-center gap-1" onClick={() => router.push("/")}>
          <ChevronLeft className="h-4 w-4" />
          Back to tasks
        </Button>
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-medium mb-4">Error</h2>
            <p className="mb-6 text-muted-foreground">{error}</p>
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!ticket) {
    return <div className="p-8">No ticket found</div>
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <Button variant="ghost" className="mb-6 -ml-2 flex items-center gap-1" onClick={() => router.push("/")}>
        <ChevronLeft className="h-4 w-4" />
        Back to tasks
      </Button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main Ticket Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{ticket.id}</span>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="outline" className="text-xs font-normal">
                {ticket.category}
              </Badge>
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none text-2xl font-semibold px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Description</h3>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <ul className="list-disc pl-5 space-y-2">
                {ticket.description && ticket.description.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Comments</h3>
              <span className="text-sm text-muted-foreground">2 comments</span>
            </div>

            <Card className="border-none shadow-none bg-muted/40">
              <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Jane Doe</span>
                    <span className="text-xs text-muted-foreground">Yesterday at 2:30 PM</span>
                  </div>
                  <p className="text-sm">Let's make sure we follow the design system for this implementation.</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-none bg-muted/40">
              <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Mike Smith</span>
                    <span className="text-xs text-muted-foreground">Today at 9:15 AM</span>
                  </div>
                  <p className="text-sm">I've started working on this. Will update with progress soon.</p>
                </div>
              </CardHeader>
            </Card>

            <div className="flex items-start gap-3 pt-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea placeholder="Add a comment..." className="min-h-[80px] resize-none focus-visible:ring-1" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="sm">Comment</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-xs font-normal text-muted-foreground">
                  STATUS
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="to-do">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Story Points */}
              <div className="space-y-2">
                <Label htmlFor="story-points" className="text-xs font-normal text-muted-foreground">
                  STORY POINTS
                </Label>
                <Input
                  id="story-points"
                  type="number"
                  value={storyPoints}
                  onChange={(e) => setStoryPoints(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Assigned To */}
              <div className="space-y-2">
                <Label htmlFor="assigned-to" className="text-xs font-normal text-muted-foreground">
                  ASSIGNED TO
                </Label>
                <Select defaultValue={ticket.assignedTo ? ticket.assignedTo.toLowerCase().replace(/\s+/g, "-") : ""}>
                  <SelectTrigger id="assigned-to" className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend-team">Frontend Team</SelectItem>
                    <SelectItem value="backend-team">Backend Team</SelectItem>
                    <SelectItem value="design-team">Design Team</SelectItem>
                    <SelectItem value="qa-team">QA Team</SelectItem>
                    <SelectItem value="alex-johnson">Alex Johnson</SelectItem>
                    <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Report To */}
              <div className="space-y-2">
                <Label htmlFor="report-to" className="text-xs font-normal text-muted-foreground">
                  REPORT TO
                </Label>
                <Select defaultValue={ticket.reportTo ? ticket.reportTo.toLowerCase().replace(/\s+/g, "-") : ""}>
                  <SelectTrigger id="report-to" className="w-full">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-manager">Project Manager</SelectItem>
                    <SelectItem value="tech-lead">Tech Lead</SelectItem>
                    <SelectItem value="design-lead">Design Lead</SelectItem>
                    <SelectItem value="qa-lead">QA Lead</SelectItem>
                    <SelectItem value="emma-davis">Emma Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Parent Ticket */}
              <div className="space-y-2">
                <Label htmlFor="parent-ticket" className="text-xs font-normal text-muted-foreground">
                  PARENT TICKET
                </Label>
                <Input
                  id="parent-ticket"
                  defaultValue={ticket.parentTicket}
                  className="w-full"
                  readOnly
                />
              </div>

              {/* Save Button */}
              <Button className="w-full mt-4" onClick={saveTicketChanges}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
