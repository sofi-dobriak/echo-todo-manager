# 🌀 "Luna" — Todo manager & Time Tracker

"Luna" is a clean, intuitive application for organizing tasks, tracking the time spent on each, and analyzing your productivity.

Perfect for those who value focus, structure, and results.

---

## 🔧 Key Features

### 📅 Current Date & Day of the Week

Always visible — no need to open a calendar to check what day it is.

### 🔍 Task Filtering

Powerful, flexible filtering system:

- By status: created, in progress, resumed, paused, completed, deleted
- By date range: from / to, with modal warning if the range is invalid
- By name: case-insensitive search

🔄 Filters can be applied independently or combined. Each filter can be reset separately or all at once.

### ➕ Add New Task

Modal window with input:

- Character limit enforcement
- Real-time character counter
- Validation and warning messages if the limit is exceeded

### 🗑️ Delete All Tasks

Confirmation modal to prevent accidental mass deletion.

### 📊 Task Table

- A detailed table showing:
- Creation date
- Stop date
- Resume date
- Completion date
- Task name
- Status

Clicking any row opens a context menu with actions (varies by status).

- Tasks "In Progress" have a green background
- Deleted tasks have a grey background

### 🚧 Focus Mode Lock

When a task is marked as In Progress or Resumed, all other interactions are disabled to encourage deep focus until the task is completed.

### ✏️ Edit Task

Modal window with:

- Pre-filled task name
- Character counter
- Option to save updates

### 📈 Task Analytics

For each task you can view:

- Name
- Status
- Start and end time
- Number of work sessions
- Total time spent
- Average time per session

📌 Clicking the analytics button automatically scrolls to the task table

### 📊 Global Analytics

Shows stats for all tasks:

- Count per status
- Table view of filtered tasks
- Custom date range supported

### ⬆️ Extra Convenience Features

🔝 Back-to-top button

📱 Mobile/tablet modals for:

- task creation / deletion
- filters
- analytics navigation

### 💾 Data Persistence

All tasks and filters are saved to localStorage

## 🛠️ Tech Stack

- React
- Redux Toolkit — app logic
- Redux Persist — state persistence
- React Responsive — adaptive layout
- Formik — form management
- Yup — form validation
- React Icons — icon library

---

📌 Luna is more than a simple todo list — it's a focused workspace for meaningful, time-aware productivity.
