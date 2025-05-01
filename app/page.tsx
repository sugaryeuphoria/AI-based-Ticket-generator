"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Upload, Table2, LayoutGrid, FileSpreadsheet } from "lucide-react"
import { Loader2 } from "lucide-react"
import { analyzeTasks, TasksResponse } from "@/lib/api"
import * as XLSX from 'xlsx'
import { parseExcelFile, formatTasksAsNumberedList } from "@/lib/excel-helper"
import { createTemplateFile } from "@/lib/createTemplateFile"

export default function Home() {
  const [fileUploaded, setFileUploaded] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [excelContent, setExcelContent] = useState("")
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)
  const [apiWarning, setApiWarning] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError(null)
    
    if (e.target.files && e.target.files.length > 0) {
      console.log("File selected")
      const file = e.target.files[0]
      setFileName(file.name)

      // Read Excel file using xlsx library
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          if (!event.target || !event.target.result) {
            setParseError("Failed to read file content")
            return
          }
          
          console.log("File content loaded")
          
          // Use the helper function to parse Excel
          const result = event.target.result as ArrayBuffer
          const taskDescriptions = parseExcelFile(result)
          
          // Format tasks as a numbered list
          const content = formatTasksAsNumberedList(taskDescriptions)
          
          setExcelContent(content)
          setFileUploaded(true)
        } catch (error) {
          console.error("Error parsing Excel file:", error)
          setParseError(error instanceof Error ? error.message : "Failed to parse Excel file")
        }
      }
      reader.onerror = () => {
        setParseError("Error reading file. Please try again.")
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const startAnalysis = async () => {
    console.log("Starting analysis")
    setIsLoading(true)
    setAnalysisComplete(false)
    setApiWarning(null)

    try {
      console.log("Calling API")
      const apiResponse = await analyzeTasks(excelContent)
      console.log("API response received", apiResponse)

      // Set tasks from the response
      setTasks(apiResponse.tasks)
      
      // Set warning if present
      if (apiResponse.warning) {
        setApiWarning(apiResponse.warning)
      }
      
      setAnalysisComplete(true)
      
      // Store the generated tickets in sessionStorage for access from ticket page
      sessionStorage.setItem('generatedTickets', JSON.stringify(apiResponse.tasks))
    } catch (error) {
      console.error("Error analyzing tasks:", error)
      alert("An error occurred while analyzing tasks. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardClick = (taskId: string) => {
    router.push(`/ticket/${taskId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-slate-100 text-slate-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Done":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const resetUpload = () => {
    console.log("Resetting upload")
    setFileUploaded(false)
    setFileName("")
    setExcelContent("")
    setAnalysisComplete(false)
    setParseError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Function to download a template Excel file
  const downloadTemplate = () => {
    try {
      const blob = createTemplateFile();
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tasks_template.xlsx';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error creating template:", error);
      alert("Failed to create template file. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Sprint Ticket Master</h1>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full border-4 border-muted-foreground/20"></div>
              <div className="absolute inset-0 h-32 w-32 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
            </div>
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
          <h3 className="text-xl font-medium mt-8 mb-2">Analyzing Tasks</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Our AI is processing your tasks and creating detailed tickets. This may take a moment...
          </p>
        </div>
      ) : !fileUploaded ? (
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Upload Excel File</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                Upload your Excel file containing the task descriptions. We'll analyze it and create detailed tickets
                for each task.
              </p>
              {parseError && (
                <div className="w-full max-w-md bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
                  {parseError}
                </div>
              )}
              <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                <div className="relative w-full">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx, .xls"
                    className="w-full"
                    onChange={handleFileUpload}
                  />
                  <div className="absolute inset-0 opacity-0">
                    <Input type="file" accept=".xlsx, .xls" className="h-full" onChange={handleFileUpload} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  <span>Drag and drop your file here, or click to browse</span>
                </div>
                <Button variant="outline" size="sm" onClick={downloadTemplate} className="mt-2">
                  Download Template File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : !analysisComplete ? (
        <Card className="w-full max-w-3xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <FileSpreadsheet className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-1">File Uploaded Successfully</h3>
              <p className="text-sm text-muted-foreground mb-4">{fileName}</p>
              <div className="w-full max-w-md bg-muted p-4 rounded-md mb-6 text-left">
                <h4 className="text-sm font-medium mb-2">Extracted Tasks:</h4>
                <pre className="text-xs whitespace-pre-wrap">{excelContent}</pre>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={resetUpload}>
                  Upload Different File
                </Button>
                <Button onClick={startAnalysis}>Start Analysis</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Generated Tickets</h2>
            <Button variant="outline" onClick={resetUpload}>
              Upload New File
            </Button>
          </div>

          {apiWarning && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-4">
              <p className="text-sm">{apiWarning}</p>
            </div>
          )}

          <Tabs defaultValue="cards">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <Table2 className="h-4 w-4" />
                  Table View
                </TabsTrigger>
                <TabsTrigger value="cards" className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  Card View
                </TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">{tasks.length} tickets generated</div>
            </div>

            <TabsContent value="table" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Story Points</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow
                        key={task.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleCardClick(task.id)}
                      >
                        <TableCell className="font-medium">{task.id}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.storyPoints}</TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{task.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleCardClick(task.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">{task.id}</span>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                      <h3 className="text-lg font-medium mb-2">{task.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{task.category}</Badge>
                        <div className="bg-slate-100 text-slate-700 rounded-full px-2 py-0.5 text-xs font-medium">
                          {task.storyPoints} points
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Assigned to: {task.assignedTo}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

