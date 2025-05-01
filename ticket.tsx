"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, MessageSquare, Paperclip } from "lucide-react"

export default function TicketComponent() {
  const [title, setTitle] = useState("Implement user authentication flow")
  const [storyPoints, setStoryPoints] = useState("5")
  const [status, setStatus] = useState("in-progress")

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main Ticket Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>TICKET-1234</span>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="outline" className="text-xs font-normal">
                Feature
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
                <li>Implement login form with email and password fields</li>
                <li>Add social login options (Google, GitHub)</li>
                <li>Create password reset functionality</li>
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
                  <p className="text-sm">
                    We should consider adding two-factor authentication as well. This would enhance security.
                  </p>
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
                  <p className="text-sm">
                    I agree with Jane. Let's add 2FA to the scope. I can help with the implementation.
                  </p>
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
                <Select defaultValue="alex">
                  <SelectTrigger id="assigned-to" className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Report To */}
              <div className="space-y-2">
                <Label htmlFor="report-to" className="text-xs font-normal text-muted-foreground">
                  REPORT TO
                </Label>
                <Select defaultValue="emma">
                  <SelectTrigger id="report-to" className="w-full">
                    <SelectValue placeholder="Select reporter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emma">Emma Davis</SelectItem>
                    <SelectItem value="james">James Wilson</SelectItem>
                    <SelectItem value="olivia">Olivia Taylor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Parent Ticket */}
              <div className="space-y-2">
                <Label className="text-xs font-normal text-muted-foreground">PARENT TICKET</Label>
                <div className="flex items-center gap-2 rounded-md border p-2">
                  <span className="text-sm font-medium">TICKET-1000</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-muted-foreground">Training</span>
                  <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button variant="outline" size="sm">
                Clone
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
