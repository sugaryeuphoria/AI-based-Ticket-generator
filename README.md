# Sprint Ticket Master

A powerful web application that automates the creation of project management tickets from a simple Excel file. Streamline your workflow by instantly converting task lists into fully analyzed and manageable sprint tickets.

## ⚙️ Features

*   **📁 Excel File Upload:** Upload standard `.xlsx` files containing task descriptions. The app automatically parses the relevant data.
*   **🤖 AI-Powered Analysis:** Leverages Google's Gemini AI to intelligently generate appropriate ticket titles, estimate story points, suggest potential assignees (if applicable user data were available), and categorize tickets based on the task descriptions.
*   **🧾 Interactive Ticket Management:** Provides a modern, minimal, Jira-like interface to view, edit, and manage the generated tickets.
*   **🧮 Multiple Views (Table + Cards):** Easily switch between a comprehensive **Table View** for detailed overviews and a **Card View** for a quick visual Kanban-style representation.
*   **📝 Ticket Detail Editing:** Click on any ticket to open a detailed modal where you can edit fields like title, description, story points, status, add comments, and manage other metadata.

## 🖼️ Screenshots

*Click any image for a better view.*

---

**1. Upload Excel File**
*The initial screen where users upload their Excel file containing task descriptions.*
<img src="assets/Screenshot%202025-05-01%20at%2012.35.52%E2%80%AFPM.png" width="500" alt="Upload Excel File" />

---

**2. File Uploaded + Task Extraction**
*Successfully uploaded file and shows the extracted tasks from the Excel sheet, ready for AI analysis.*
<img src="assets/Screenshot%202025-05-01%20at%2012.36.43%E2%80%AFPM.png" width="500" alt="File Upload Success" />

---

**3. Table View of Generated Tickets**
*Shows a clean, tabular layout of all generated tickets with key information like ID, title, status, story points, and assignee.*
<img src="assets/Screenshot%202025-05-01%20at%2012.42.10%E2%80%AFPM.png" width="500" alt="Table View" />

---

**4. Card View of Tickets**
*A visually compact card layout, ideal for quick scanning and mimicking modern sprint boards.*
<img src="assets/Screenshot%202025-05-01%20at%2012.42.17%E2%80%AFPM.png" width="500" alt="Card View" />

---

**5. Full Ticket Detail View**
*Expands into a detailed editable view allowing modification of all ticket fields, including comments, story points, assignments, and status.*
<img src="assets/Screenshot%202025-05-01%20at%2012.42.29%E2%80%AFPM.png" width="500" alt="Ticket Details" />

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   **Node.js:** Version 16 or higher recommended.
*   **Package Manager:** `npm` or `pnpm`.
*   **Google AI API Key:** Obtainable from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sprint-ticket-master
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

### Configuration

1.  Create a file named `.env.local` in the root directory of the project.
2.  Add your Google AI API key to this file:
    ```ini
    GOOGLE_AI_API_KEY=your_google_ai_api_key_here
    ```
    Replace `your_google_ai_api_key_here` with your actual API key.

### Run the App

1.  Start the development server:
    ```bash
    npm run dev
    # or
    pnpm dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## 🧪 How to Use

1.  **Upload Excel File:**
    *   Click the upload area on the main page.
    *   Select your `.xlsx` file. Ensure it contains at least a `Task Description` column.
    *   *A downloadable template is available within the app for convenience.*
2.  **Analyze Tasks:**
    *   Once the file is uploaded, the extracted tasks will be displayed.
    *   Review the tasks and click the **"Start Analysis"** button.
    *   The AI will process each task description to generate ticket details (title, story points, etc.). This may take a few moments depending on the number of tasks.
3.  **Manage Tickets:**
    *   After analysis, the tickets will be displayed in the chosen view (Table or Card).
    *   Use the view toggle buttons to switch between layouts.
    *   Click on any ticket row (Table View) or card (Card View) to open the detailed modal for editing.
    *   Modify fields like story points, status, assignees, add comments, etc., within the modal. Changes are saved automatically (or provide a save button confirmation).

## 📄 Excel File Format

The application expects an Excel file (`.xlsx`) with at least one column containing the task descriptions. The header for this column should ideally be named **`Task Description`** for clarity, although the app might be configured to look for the first column if the header is different.

**Example Structure:**

| Task Description              |
| :---------------------------- |
| Create user login page        |
| Set up database schema        |
| Design mobile UI              |
| Implement API authentication  |
| Write unit tests for auth     |

*Other columns might be present but will be ignored during the task extraction phase.*

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (using App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) (Primitives for accessible components), [shadcn/ui](https://ui.shadcn.com/) (likely used for pre-built components)
*   **Excel Parsing:** [XLSX (SheetJS)](https://sheetjs.com/)
*   **AI / LLM:** [Google Gemini API](https://ai.google.dev/)
*   **State Management:** (e.g., Zustand, Context API, Redux - *specify if used*)
*   **Deployment:** (e.g., Vercel, Netlify - *specify if applicable*)

## 📈 Future Enhancements

*   **✅ User Authentication:** Implement user accounts and sessions for personalized experiences and data privacy.
*   **📁 Project Organization:** Allow grouping tickets into distinct projects or sprints.
*   **🔁 Third-Party Integrations:** Add options to export/sync tickets with popular platforms like Jira, Trello, Asana, or Notion.
*   **🧠 Smarter AI Features:** Enhance AI suggestions to include estimated priority, identification of potential blockers, and recommendations for sprint planning.
*   **👥 Collaboration:** Introduce features for team collaboration, such as real-time updates and multi-user editing.
*   **📊 Reporting:** Add basic reporting features to visualize sprint progress or task distribution.
