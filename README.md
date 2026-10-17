# Employee Directory

A simple, responsive Employee Directory application built using React, TypeScript, Node.js, Express, and MySQL.

## Features

- Add new employees
- View all employees
- Edit employee details
- Delete employees
- Search employees by name
- Responsive UI for desktop and mobile devices
- REST API integration using Axios

## Tech Stack

**Frontend:** React, TypeScript, Vite, Axios, CSS

**Backend:** Node.js, Express.js

**Database:** MySQL

## Project Structure

```text
employer-directory/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- MySQL Server
- A code editor such as Visual Studio Code

## Database Setup

1. Start your MySQL server.
2. Create a database named `employee_directory`.
3. Create an `employees` table with the following fields:
   - `id` — Primary key, auto-increment
   - `name` — VARCHAR
   - `email` — VARCHAR
   - `role` — VARCHAR
   - `created_at` — TIMESTAMP

## Backend Setup

Open a terminal in the `backend` directory:

```bash
cd backend
npm install
```

Configure your local `.env` file with your MySQL connection details:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=employee_directory
```

Start the backend:

```bash
node server.js
```

The API runs at `http://localhost:5000`.

## Frontend Setup

Open another terminal in the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in your terminal by Vite.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Fetch all employees |
| POST | `/employees` | Add an employee |
| PUT | `/employees/:id` | Update an employee |
| DELETE | `/employees/:id` | Delete an employee |

## Security

Database credentials are stored in a local `.env` file and should not be committed to the repository.

## Author

Employee Directory — Full Stack CRUD Application
