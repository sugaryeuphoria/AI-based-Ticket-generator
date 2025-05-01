import * as XLSX from 'xlsx';

/**
 * Parse an Excel file from an ArrayBuffer
 * @param buffer The ArrayBuffer containing the Excel file data
 * @returns An array of task descriptions extracted from the Excel file
 */
export function parseExcelFile(buffer: ArrayBuffer): string[] {
  try {
    // Parse the Excel file data
    const data = new Uint8Array(buffer);
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Get the first worksheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Check if there's any data and if it has the required column
    if (jsonData.length === 0) {
      throw new Error("Excel file is empty");
    }
    
    // Check if the Task Description column exists
    const firstRow = jsonData[0] as Record<string, unknown>;
    if (!('Task Description' in firstRow)) {
      throw new Error("Excel file must contain a column named 'Task Description'");
    }
    
    // Extract the task descriptions
    const taskDescriptions = jsonData
      .map((row: unknown) => {
        const typedRow = row as Record<string, unknown>;
        return typedRow['Task Description'] as string;
      })
      .filter(Boolean);
    
    if (taskDescriptions.length === 0) {
      throw new Error("No tasks found in the Excel file");
    }
    
    return taskDescriptions;
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    throw error;
  }
}

/**
 * Format task descriptions as a numbered list
 * @param tasks Array of task descriptions
 * @returns Formatted string with numbered tasks
 */
export function formatTasksAsNumberedList(tasks: string[]): string {
  return tasks
    .map((task, index) => `${index + 1}. ${task}`)
    .join('\n');
} 