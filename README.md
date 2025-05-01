# Sprint Ticket Master

A powerful web application that automates the creation of project management tickets from a simple Excel file.

## Features

- **Excel File Upload**: Upload Excel sheets with task descriptions and convert them into detailed tickets
- **AI-Powered Analysis**: Uses Google's Gemini AI to intelligently generate ticket details
- **Interactive Ticket Management**: View, edit, and manage tickets in a clean, modern interface
- **Multiple Views**: Switch between card and table views for better visualization
- **Ticket Detail Editing**: Edit ticket details like story points, assignees, status, etc.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sprint-ticket-master
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory with your Google AI API key:
```
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How to Use

1. **Upload Excel File**: 
   - The Excel file should have a column named "Task Description"
   - You can download a template file from the app for the correct format

2. **Process Tasks**:
   - After uploading, review the extracted tasks
   - Click "Start Analysis" to generate detailed tickets

3. **View and Edit Tickets**:
   - Browse tickets in card or table view
   - Click on a ticket to view and edit its details
   - Make changes and save them

## Excel File Format

The application expects an Excel file with at least one column:
- `Task Description`: Contains the task descriptions to be processed

Example:

| Task Description |
|------------------|
| Create user login page |
| Set up database schema |
| Design mobile UI |
| Implement API authentication |

## Development

The project is built with:
- Next.js (App Router)
- Tailwind CSS
- Radix UI for components
- Google Gemini AI API
- XLSX library for Excel processing

## Future Enhancements

- User authentication and multi-user support
- Project management and organization features
- Export functionality to various project management tools
- Advanced AI suggestions for ticket optimization

## License

This project is licensed under the MIT License. 