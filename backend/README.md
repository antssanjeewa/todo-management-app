# TaskFlow — Backend API

### Laravel 13 REST API with Sanctum Authentication

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=flat&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?style=flat&logo=php&logoColor=white)](https://php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Sanctum](https://img.shields.io/badge/Sanctum-Token_Auth-FF2D20?style=flat&logo=laravel&logoColor=white)](https://laravel.com/docs/sanctum)

---

## Overview

Backend API for TaskFlow. Provides RESTful endpoints for user authentication and todo management using the Service pattern, Policy-based authorization, Form Request validation, and API Resource transformation.

## Architecture

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/API/
│   │   │   ├── AuthController.php
│   │   │   └── TodoController.php
│   │   ├── Requests/
│   │   │   ├── Auth/          # LoginRequest, RegisterRequest
│   │   │   └── Todo/          # StoreTodoRequest, UpdateTodoRequest
│   │   ├── Resources/
│   │   │   └── TodoResource.php
│   │   └── Responses/
│   │       └── ApiResponse.php
│   ├── Models/
│   │   ├── User.php
│   │   └── Todo.php
│   ├── Policies/
│   │   └── TodoPolicy.php
│   └── Services/
│       ├── AuthService.php
│       └── TodoService.php
├── database/migrations/
├── routes/api.php
└── tests/Feature/             # Pest tests
```

## Design Patterns

| Pattern | Purpose |
|---|---|
| **Service Layer** | Business logic isolated from controllers |
| **Form Requests** | Validation and per-route authorization |
| **API Resources** | Consistent response shape for todos |
| **Policies** | Model-level authorization (`view`, `update`, `delete`) |
| **ApiResponse** | Standardized `{ success, message, data }` envelope |

---

## Setup

### Requirements

- PHP 8.3+
- Composer
- PostgreSQL 15+ (SQLite in-memory for tests)

### Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
```

### Database Configuration

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo-app
DB_USERNAME=postgres
DB_PASSWORD=your_password

FRONTEND_URL=http://localhost:3000
```

`FRONTEND_URL` is used by CORS (`config/cors.php`) to allow the Next.js origin.

### Run Migrations & Server

```bash
php artisan migrate
php artisan serve
# http://localhost:8000
```

### Run Tests

```bash
php artisan test
```

Tests use SQLite in-memory (`phpunit.xml`). Covers registration, login, logout, todo CRUD, filtering, authorization, and status toggle.

---

## API Reference

### Base URL

```
http://localhost:8000/api
```

### Authentication Header

Protected endpoints require:

```http
Authorization: Bearer {access_token}
Accept: application/json
Content-Type: application/json
```

### Response Envelope

All responses follow:

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { }
}
```

Errors include an `errors` object for validation failures.

---

### Authentication Endpoints

#### Register — `POST /api/register`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response** `201` — `data` is the user object with `access_token` appended:

```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "access_token": "1|abc123..."
  }
}
```

#### Login — `POST /api/login`

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Response** `200` — same shape as register.

**Response** `401` on invalid credentials:

```json
{
  "success": false,
  "message": "Invalid credentials.",
  "errors": { "email": ["The provided credentials are incorrect."] }
}
```

#### Logout — `POST /api/logout` (auth required)

Revokes the current bearer token.

#### Get User — `GET /api/user` (auth required)

Returns the authenticated user (`id`, `name`, `email`).

---

### Todo Endpoints

#### List — `GET /api/todos` (auth required)

| Query Param | Type | Description |
|---|---|---|
| `search` | string | Case-insensitive match in title and description |
| `status` | string | `pending` or `completed` |
| `priority` | string | `low`, `medium`, or `high` |
| `page` | integer | Pagination page (default per-page: 15) |

**Response** `200`:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Team meeting",
      "description": "Weekly sync",
      "priority": "high",
      "status": "pending",
      "is_overdue": false,
      "due_date": "2026-06-15",
      "created_at": "2026-06-10 09:00:00"
    }
  ],
  "meta": {
    "total": 10,
    "current_page": 1,
    "last_page": 2,
    "per_page": 15
  },
  "links": {
    "next": "http://localhost:8000/api/todos?page=2",
    "prev": null
  }
}
```

Results are scoped to the authenticated user. Pending todos are sorted before completed.

#### Create — `POST /api/todos` (auth required)

| Field | Required | Rules |
|---|---|---|
| `title` | Yes | string, max 255 |
| `description` | No | string, max 1000 |
| `priority` | No | `low`, `medium`, `high` (default: `medium`) |
| `due_date` | No | date, `after_or_equal:today` |

**Response** `201`

#### Update — `PUT /api/todos/{id}` (auth required, must own todo)

All validated fields are required in the request body (not a partial PATCH). Authorization enforced via `TodoPolicy`.

#### Delete — `DELETE /api/todos/{id}` (auth required, must own todo)

Soft-deletes the todo.

#### Toggle Status — `PATCH /api/todos/{id}/toggle` (auth required, must own todo)

Flips `pending` ↔ `completed`.

---

## Error Responses

| Status | When |
|---|---|
| `401` | Missing or invalid token |
| `403` | Authenticated but not authorized (e.g. another user's todo) |
| `404` | Todo not found |
| `422` | Validation failed |
| `500` | Server error (message hidden in production) |

Validation example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": ["The title field is required."]
  }
}
```

---

## Data Models

### User

| Field | Type | Notes |
|---|---|---|
| `id` | integer | Primary key |
| `name` | string | |
| `email` | string | Unique |
| `password` | string | Bcrypt hashed (cast) |

### Todo

| Field | Type | Notes |
|---|---|---|
| `id` | integer | Primary key |
| `user_id` | integer | FK → users, cascade delete |
| `title` | string | Max 255 |
| `description` | text | Nullable, max 1000 |
| `priority` | enum | `low`, `medium`, `high` |
| `status` | enum | `pending`, `completed` |
| `due_date` | date | Nullable |
| `is_overdue` | boolean | Computed: pending + past due date |
| `deleted_at` | timestamp | Soft delete |
