# React Project Dashboard

This project is a simple testing application built to validate that the React setup, routing, API integration, and UI components are working correctly.  
It fetches mock project data from JSONPlaceholder, displays them in a dashboard, allows basic search, and shows project details.

# Note 

I worked really hard to complete the authentication feature, where I created a login page that requires the email "admin@example.com" and the password "admin". Users must enter these credentials to access the application.

After that, I developed the dashboard page, which includes a table displaying all projects with the following columns: ID, Title, Description, Owner, Status, and Date of Creation. On this page, users can filter the projects by any of these columns, and there is also a search bar that allows users to search for projects by title or owner.

When a user clicks on any project row, they are taken to a project details page, where they can view the full description and update the project’s status based on its progress.

Finally, I added a “+” button at the corner of the dashboard. This button allows users to create new projects by entering the project’s title, description, owner, status, and date of creation

---

## 🚀 Features

### ✅ **Dashboard**
- Fetches projects from JSONPlaceholder:
  - `GET https://jsonplaceholder.typicode.com/posts`
  - `GET https://jsonplaceholder.typicode.com/users`
- Maps API data into project objects:
  - `id = post.id`
  - `title = post.title`
  - `description = post.body`
  - `owner = matched user name`
  - `status = randomly assigned (active / pending / completed)`
  - `createdAt = randomly generated date`
- Search by **title** or **owner**
- Simple and clean project cards

### ✅ **Project Details**
- Clicking a project takes you to `/project/:id`
- Placeholder details view (expandable later)

### ✅ **Add New Project**
- A Floating Action Button (“+”) lets users create projects.
- Opens a Material UI dialog with fields:
    - Title
    - Description
    - Owner
    - Status
    - Date of creation
- Form validation ensures all fields are required.
- Newly created projects appear instantly in the dashboard.


---
# Folder Structure
src/
 ├── components/
 │    ├── ProjectTable.jsx
 ├── pages/
 │    ├── Login.jsx
 │    ├── Dashboard.jsx
 │    ├── ProjectDetails.jsx
 └── App.jsx
# Setup & Installation Instructions
- Prerequisites
  - Before starting, make sure you have the following installed on your machine:
      - Node.js (v16 or later Download from: https://nodejs.org)
      - npm (comes with Node.js)
      - Git (Download from: https://git-scm.com)

- Clone the Repository from GitHub
    - Open Terminal (Mac) or Command Prompt (Windows)
    - enter this command: "git clone 

