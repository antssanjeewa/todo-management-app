# TaskFlow - Todo Management Application

A full-stack Todo Management Application built with Next.js, Laravel, PostgreSQL, Tailwind CSS, and Laravel Sanctum.

## Features

### Authentication

* User Registration
* User Login
* User Logout
* Protected Routes
* Protected APIs
* Password Hashing
* Form Validation
* Error Handling

### Todo Management

* Create Todo
* Update Todo
* Delete Todo
* Mark Todo as Completed
* Mark Todo as Pending
* Search Todos
* Filter Todos

## Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS v4
* shadcn/ui
* Axios
* Zustand
* React Query
* Sonner

### Backend

* Laravel 12
* PHP 8.4
* Laravel Sanctum

### Database

* PostgreSQL

## Project Structure

```text
todo-app-assessment/
├── backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/todo-app-assessment.git

cd todo-app-assessment
```

---

## Backend Setup

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
composer install
```

### Create Environment File

```bash
cp .env.example .env
```

### Generate Application Key

```bash
php artisan key:generate
```

### Configure Database

Update the following values in `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_db
DB_USERNAME=postgres
DB_PASSWORD=password
```

### Run Migrations

```bash
php artisan migrate
```

### Start Backend Server

```bash
php artisan serve
```

Backend URL:

```text
http://localhost:8000
```

---

## Frontend Setup

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Start Frontend Server

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

## API Endpoints

### Authentication

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| POST   | /api/register | Register User      |
| POST   | /api/login    | Login User         |
| POST   | /api/logout   | Logout User        |
| GET    | /api/user     | Authenticated User |

### Todos

| Method | Endpoint                 | Description    |
| ------ | ------------------------ | -------------- |
| GET    | /api/todos               | Get Todos      |
| POST   | /api/todos               | Create Todo    |
| GET    | /api/todos/{id}          | Get Todo       |
| PUT    | /api/todos/{id}          | Update Todo    |
| DELETE | /api/todos/{id}          | Delete Todo    |
| PATCH  | /api/todos/{id}/complete | Mark Completed |
| PATCH  | /api/todos/{id}/pending  | Mark Pending   |

---

## Search and Filter

### Search

```http
GET /api/todos?search=meeting
```

### Filter Completed

```http
GET /api/todos?status=completed
```

### Filter Pending

```http
GET /api/todos?status=pending
```

### Combined Search and Filter

```http
GET /api/todos?search=meeting&status=pending
```

---

## Screenshots

### Landing Page

Add screenshot here.

### Login Page

Add screenshot here.

### Dashboard

Add screenshot here.

### Todo Management

Add screenshot here.

---

## Author

Sameera Sanjeewa

## License

This project was developed as part of a technical assessment.
