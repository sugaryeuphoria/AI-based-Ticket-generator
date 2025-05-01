import * as XLSX from 'xlsx';

/**
 * Create a sample Excel template file with the required structure
 * @returns The Excel file as a Blob
 */
export function createTemplateFile(): Blob {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Sample task descriptions
  const sampleData = [
    { "Task Description": "Create user login page" },
    { "Task Description": "Set up database schema" },
    { "Task Description": "Design user interface for dashboard" },
    { "Task Description": "Implement API authentication" },
    { "Task Description": "Write unit tests for core features" }
  ];
  
  // Create a worksheet from the sample data
  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Convert to Blob
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
} 