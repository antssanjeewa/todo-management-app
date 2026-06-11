# TaskFlow — Backend API

### Laravel 12 REST API with Sanctum Authentication

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.4-777BB4?style=flat&logo=php&logoColor=white)](https://php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Sanctum](https://img.shields.io/badge/Sanctum-Token_Auth-FF2D20?style=flat&logo=laravel&logoColor=white)](https://laravel.com/docs/sanctum)

</div>

---

## Overview

This is the backend API for TaskFlow, built with Laravel 12. It provides secure RESTful endpoints for user authentication and todo management, following best practices including the Service pattern, Policy-based authorization, Form Request validation, and API Resource transformation.

## Architecture

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── API/
│   │   │       ├── AuthController.php
│   │   │       └── TodoController.php
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginRequest.php
│   │   │   │   └── RegisterRequest.php
│   │   │   └── Todo/
│   │   │       ├── StoreTodoRequest.php
│   │   │       └── UpdateTodoRequest.php
│   │   └── Resources/
│   │       └── TodoResource.php
│   ├── Models/
│   │   ├── User.php
│   │   └── Todo.php
│   ├── Policies/
│   │   └── TodoPolicy.php
│   ├── Providers/
│   │   └── AppServiceProvider.php    # Response macros
│   └── Services/
│       └── TodoService.php
├── database/
│   └── migrations/
├── routes/
│   └── api.php
└── .env.example
```

## Design Patterns Used

| Pattern | Purpose |
|---|---|
| **Service Layer** | Isolates business logic from controllers |
| **Form Requests** | Encapsulates validation rules and authorization |
| **API Resources** | Controls the shape of API responses |
| **Policies** | Centralizes model authorization logic |
| **Response Macros** | Standardizes API response format |

---

## Setup

### Requirements

- PHP 8.4+
- Composer
- PostgreSQL 15+

### Installation

```bash
# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Database Configuration

Update the following in your `.env` file:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### Run Migrations

```bash
php artisan migrate
```

### Start Server

```bash
php artisan serve
# Listening at http://localhost:8000
```

---

## API Reference

### Base URL

```
http://localhost:8000/api
```

### Authentication Header

All protected endpoints require:

```http
Authorization: Bearer {token}
Accept: application/json
Content-Type: application/json
```

---

### Authentication Endpoints

#### Register

```http
POST /api/register
```

**Request Body**

```json
{
    "name": "Sameera Sanjeewa",
    "email": "sameera@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Response** `201 Created`

```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "user": {
            "id": 1,
            "name": "Sameera Sanjeewa",
            "email": "sameera@example.com"
        },
        "token": "1|abc123xyz..."
    }
}
```

---

#### Login

```http
POST /api/login
```

**Request Body**

```json
{
    "email": "sameera@example.com",
    "password": "password123"
}
```

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "Sameera Sanjeewa",
            "email": "sameera@example.com"
        },
        "token": "1|abc123xyz..."
    }
}
```

---

#### Logout

```http
POST /api/logout
```

*Requires authentication.*

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Logged out successfully",
    "data": null
}
```

---

#### Get Authenticated User

```http
GET /api/user
```

*Requires authentication.*

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Success",
    "data": {
        "id": 1,
        "name": "Sameera Sanjeewa",
        "email": "sameera@example.com"
    }
}
```

---

### Todo Endpoints

#### List Todos

```http
GET /api/todos
```

*Requires authentication.*

**Query Parameters**

| Parameter | Type | Description |
|---|---|---|
| `search` | `string` | Search in title and description |
| `status` | `string` | Filter by `pending` or `completed` |
| `priority` | `string` | Filter by `low`, `medium`, or `high` |

**Examples**

```http
GET /api/todos?search=meeting
GET /api/todos?status=pending
GET /api/todos?priority=high
GET /api/todos?search=meeting&status=pending&priority=high
```

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Success",
    "data": {
        "todos": [
            {
                "id": 1,
                "title": "Team meeting",
                "description": "Weekly sync with the team",
                "priority": "high",
                "status": "pending",
                "is_overdue": false,
                "due_date": "2025-06-15",
                "created_at": "2025-06-10 09:00:00",
                "updated_at": "2025-06-10 09:00:00"
            }
        ],
        "counts": {
            "total": 10,
            "completed": 4,
            "pending": 6
        }
    }
}
```

---

#### Get Single Todo

```http
GET /api/todos/{id}
```

*Requires authentication. User must own the todo.*

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Success",
    "data": {
        "id": 1,
        "title": "Team meeting",
        "description": "Weekly sync with the team",
        "priority": "high",
        "status": "pending",
        "is_overdue": false,
        "due_date": "2025-06-15",
        "created_at": "2025-06-10 09:00:00",
        "updated_at": "2025-06-10 09:00:00"
    }
}
```

---

#### Create Todo

```http
POST /api/todos
```

*Requires authentication.*

**Request Body**

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Max 255 characters |
| `description` | `string` | ❌ | Max 1000 characters |
| `priority` | `string` | ❌ | `low`, `medium`, or `high`. Default: `medium` |
| `due_date` | `date` | ❌ | Format: `YYYY-MM-DD` |

```json
{
    "title": "Team meeting",
    "description": "Weekly sync with the team",
    "priority": "high",
    "due_date": "2025-06-15"
}
```

**Response** `201 Created`

```json
{
    "success": true,
    "message": "Todo created successfully",
    "data": {
        "id": 1,
        "title": "Team meeting",
        "description": "Weekly sync with the team",
        "priority": "high",
        "status": "pending",
        "is_overdue": false,
        "due_date": "2025-06-15",
        "created_at": "2025-06-10 09:00:00",
        "updated_at": "2025-06-10 09:00:00"
    }
}
```

---

#### Update Todo

```http
PUT /api/todos/{id}
```

*Requires authentication. User must own the todo.*

**Request Body** — all fields are optional:

```json
{
    "title": "Updated title",
    "description": "Updated description",
    "priority": "medium",
    "due_date": "2025-06-20",
    "status": "completed"
}
```

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Todo updated successfully",
    "data": { ... }
}
```

---

#### Delete Todo

```http
DELETE /api/todos/{id}
```

*Requires authentication. User must own the todo.*

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Todo deleted successfully",
    "data": null
}
```

---

#### Mark as Completed

```http
PATCH /api/todos/{id}/complete
```

*Requires authentication. User must own the todo.*

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Todo marked as completed",
    "data": { ... }
}
```

---

#### Mark as Pending

```http
PATCH /api/todos/{id}/pending
```

*Requires authentication. User must own the todo.*

**Response** `200 OK`

```json
{
    "success": true,
    "message": "Todo marked as pending",
    "data": { ... }
}
```

---

## Error Responses

### Validation Error — `422 Unprocessable Entity`

```json
{
    "success": false,
    "message": "The given data was invalid.",
    "errors": {
        "title": ["The title field is required."],
        "priority": ["The selected priority is invalid."]
    }
}
```

### Authentication Error — `401 Unauthorized`

```json
{
    "success": false,
    "message": "Unauthenticated.",
    "errors": {}
}
```

### Authorization Error — `403 Forbidden`

```json
{
    "success": false,
    "message": "This action is unauthorized.",
    "errors": {}
}
```

### Not Found — `404 Not Found`

```json
{
    "success": false,
    "message": "No query results for model [Todo].",
    "errors": {}
}
```

---

## Data Models

### User

| Field | Type | Description |
|---|---|---|
| `id` | integer | Primary key |
| `name` | string | Full name |
| `email` | string | Unique email address |
| `password` | string | Bcrypt hashed |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

### Todo

| Field | Type | Description |
|---|---|---|
| `id` | integer | Primary key |
| `user_id` | integer | Foreign key → users |
| `title` | string | Max 255 chars |
| `description` | text / null | Max 1000 chars |
| `priority` | enum | `low`, `medium`, `high` |
| `status` | enum | `pending`, `completed` |
| `due_date` | date / null | |
| `is_overdue` | boolean | Virtual — pending and past due date |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |