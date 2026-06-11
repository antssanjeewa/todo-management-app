# TaskFlow — Frontend

### Next.js 16 App Router with TypeScript

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## Overview

Client application for TaskFlow. Communicates with the Laravel API via Axios. Provides landing page, authentication, and a dashboard for managing todos with search, filters, infinite-style pagination, and status toggling.

## Architecture

```
frontend/
├── app/
│   ├── (auth)/              # Login, Register
│   ├── (home)/              # Dashboard (protected)
│   ├── layout.tsx           # Root layout + AuthProvider
│   └── page.tsx             # Landing page
├── components/
│   ├── todo/                # TodoForm, TodoList, TodoItem, TodoFilters
│   ├── user/                # UserInfo, UserSkeleton
│   ├── landing/             # Hero, Features, Header
│   └── ui/                  # shadcn/ui primitives
├── context/
│   └── AuthContext.tsx      # User session state
├── hooks/
│   ├── useTodos.ts          # Todo CRUD + pagination
│   └── useFilters.ts        # Debounced search/filters
├── lib/
│   ├── api.ts               # Axios instance + interceptors
│   └── cookies.ts           # Token storage
├── services/
│   ├── authService.ts
│   └── todoService.ts
├── types/                   # TypeScript interfaces
└── proxy.ts                 # Route guard (see Known Issues)
```

## Tech Stack

| Library | Purpose |
|---|---|
| Next.js 16 | App Router, client-side routing |
| React 19 | UI |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | Accessible UI components |
| Axios | HTTP client with auth interceptor |
| js-cookie | Bearer token persistence |
| Sonner | Toast notifications |
| date-fns / react-day-picker | Date picker |

---

## Setup

### Requirements

- Node.js 18+
- Running backend API (see [`backend/README.md`](../backend/README.md))

### Installation

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Development

```bash
npm run dev
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page with features |
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/dashboard` | Protected | Todo management dashboard |

---

## Key Behaviors

### Authentication Flow

1. Login/register calls the API and stores `access_token` in a cookie via `js-cookie`.
2. `AuthContext` fetches `/api/user` on mount if a token exists.
3. Axios request interceptor attaches `Authorization: Bearer {token}`.
4. Axios response interceptor redirects to `/login` on `401` (except on auth pages).
5. Logout revokes the token server-side and clears the cookie.

### Todo Dashboard

- **Filters:** Debounced search (400ms), status, and priority filters.
- **Pagination:** "Load More" appends the next page; aborts in-flight requests on filter change.
- **CRUD:** Create, edit, delete, and toggle status with optimistic local state updates.
- **Toasts:** Success/error feedback via Sonner.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL for the Laravel API (e.g. `http://localhost:8000/api`) |

---

## Project Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
