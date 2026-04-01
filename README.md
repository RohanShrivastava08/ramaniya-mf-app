# 🏦 Ramaniya — Mutual Fund Investment Platform

A full-stack mutual fund investment application built with **Nuxt 4**, **PostgreSQL**, and **Tailwind CSS**.
Similar to Groww.in — lets users browse, invest in, and track Indian mutual funds.

## Tech Stack

- **Frontend**: Nuxt 4 + Vue 3 + Tailwind CSS + ApexCharts
- **Backend**: Nuxt Nitro (built-in server) + Prisma ORM
- **Database**: PostgreSQL 16 (via Docker)
- **Auth**: BCrypt + H3 encrypted session cookies
- **Live Data**: [mfapi.in](https://api.mfapi.in) — India's public MF NAV API

## Quick Start

> Requires: Docker Desktop running, Node.js 18+, pnpm

```bash
# 1. Start the database
docker compose up -d

# 2. Install dependencies
pnpm install

# 3. Set up database
pnpm prisma generate
pnpm prisma db push

# 4. Start development server
pnpm run dev
```

Open **http://localhost:3000**

## Pages

| URL | Page |
|---|---|
| `/` | Landing Page |
| `/onboarding` | KYC Setup |
| `/dashboard` | Portfolio |
| `/funds` | Browse Funds |
| `/invest/:id` | Fund Detail + Invest |
| `/news` | Financial News |

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register` | POST | Create user account |
| `/api/auth/login` | POST | Login with email + password |
| `/api/auth/me` | GET | Get current session user |
| `/api/auth/logout` | POST | Clear session |
| `/api/transactions` | GET | Get user's investments |
| `/api/transactions` | POST | Add new investment |
| `/api/transactions/:id` | DELETE | Withdraw investment |

## Project Documentation

See **[explanation.md](./explanation.md)** for a complete, beginner-friendly explanation of every file and concept in this project.

## Environment Variables

Copy `.env` and fill in your values:

```env
DATABASE_URL="postgresql://ramaniya_user:ramaniya_password@localhost:5432/ramaniya_db"
SESSION_SECRET="your-32-char-minimum-secret-here"
```
