# TaskFlow

### A full-stack Todo Management Application

[![Laravel2]][laravel] [![Nextjs2]][nextjs] [![PostgreSQL2]][postgresql] [![TypeScript2]][typescript] [![PHP2]][php]

[laravel]: https://laravel.com
[nextjs]: https://nextjs.org
[postgresql]: https://postgresql.org
[typescript]: https://typescriptlang.org
[php]: https://php.net

[Laravel2]: https://img.shields.io/badge/Laravel-13-FF2D20?style=flat&logo=laravel&logoColor=white
[Nextjs2]: https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white
[PostgreSQL2]: https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white
[TypeScript2]: https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white
[PHP2]: https://img.shields.io/badge/PHP-8.4-777BB4?style=flat&logo=php&logoColor=white


*Built as a technical assessment for a full-stack developer role.*

---

## Overview

TaskFlow is a full-stack task management application with a Laravel REST API (Sanctum token auth) and a Next.js frontend. Users can register, log in, and manage personal todos with search, filters, pagination, and status toggling.

## Repository Structure

```
todo-app/
├── backend/          # Laravel 13 REST API
├── frontend/         # Next.js 16 App Router
└── README.md         # You are here
```

## Feature Highlights

| Feature | Details |
|---|---|
| Authentication | Register · Login · Logout · Protected routes |
| Todo CRUD | Create · Read (list) · Update · Delete |
| Status Control | Toggle pending ↔ completed |
| Search & Filter | Full-text search · Status filter · Priority filter · Pagination |
| Security | Bcrypt hashing · Sanctum bearer tokens · Policy-based authorization |
| Architecture | Service layer · Form Requests · API Resources · Custom API response wrapper |
| Testing | Pest feature tests for auth and todo endpoints |

## Tech Stack

### Backend
- **Laravel 13** — PHP 8.3+, REST API, Eloquent ORM
- **PostgreSQL 15** — Primary database (SQLite used in tests)
- **Laravel Sanctum** — Token-based API authentication
- **Pest** — Feature and unit tests

### Frontend
- **Next.js 16** — App Router, client components
- **React 19** — UI library
- **TypeScript 5** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** — Component library
- **Axios** — HTTP client with interceptors
- **Sonner** — Toast notifications

---

## Quick Start

### Prerequisites

| Tool | Version | Download |
|---|---|---|
| PHP | 8.3+ | [php.net](https://www.php.net/downloads) |
| Composer | Latest | [getcomposer.org](https://getcomposer.org) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| PostgreSQL | 15+ | [postgresql.org](https://www.postgresql.org/download) |
| Git | Latest | [git-scm.com](https://git-scm.com) |

### 1 — Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

### 2 — Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Update `.env` with your database credentials and frontend URL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo-app
DB_USERNAME=postgres
DB_PASSWORD=your_password

FRONTEND_URL=http://localhost:3000
```

```bash
php artisan migrate
php artisan serve
# API running at http://localhost:8000
```

### 3 — Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

```bash
npm run dev
# App running at http://localhost:3000
```

### 4 — Run Tests

```bash
cd backend
php artisan test
```

---

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/register` | ❌ | Register new user |
| POST | `/api/login` | ❌ | Login and get token |
| POST | `/api/logout` | ✅ | Revoke token |
| GET | `/api/user` | ✅ | Get authenticated user |
| GET | `/api/todos` | ✅ | List todos (search/filter) |
| POST | `/api/todos` | ✅ | Create todo |
| GET | `/api/todos/{id}` | ✅ | Get single todo |
| PUT | `/api/todos/{id}` | ✅ | Update todo |
| DELETE | `/api/todos/{id}` | ✅ | Delete todo |
| PATCH | `/api/todos/{id}/complete` | ✅ | Mark as completed |
| PATCH | `/api/todos/{id}/pending` | ✅ | Mark as pending |

Full API documentation is available in [`backend/README.md`](./backend/README.md).

---

## Author

**Sameera Sanjeewa**

---

## License

This project was developed as part of a technical assessment and is not licensed for public distribution.