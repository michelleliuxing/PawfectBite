# PawfectBite

Personalized homemade meal recipes for your pets. PawfectBite helps pet owners generate safe, customized daily meal plans for dogs and cats using a rule-based safety engine backed by LLM recipe writing.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Auth.js v5, TanStack Query v5, React Hook Form + Zod |
| Backend | Java 21, Spring Boot 4.0.5, Spring Security, Spring Data JPA, Flyway, Bean Validation, JJWT |
| Database | PostgreSQL 16 with pgvector extension |
| AI | OpenAI API (backend-only, structured JSON outputs) |
| Infrastructure | Docker Compose |

## Prerequisites

- Java 21+
- Node.js 20+
- Docker (for PostgreSQL)
- Google OAuth client credentials (from Google Cloud Console)
- OpenAI API key

## Quick Start

### 1. Start the database

```bash
docker compose up -d
```

This starts PostgreSQL 16 with the pgvector extension on port `5432`.

### 2. Configure environment

Backend:

```bash
cp server/.env.example server/.env
# Edit server/.env with your credentials
```

Required variables: `DATABASE_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `OPENAI_API_KEY`

Frontend:

```bash
cp client/.env.local.example client/.env.local
# Edit client/.env.local with your credentials
```

Required variables: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BACKEND_URL`

### 3. Run the backend

```bash
cd server
./mvnw spring-boot:run
```

The API starts at `http://localhost:8080`. Flyway auto-runs all 7 migrations on first startup.

### 4. Run the frontend

```bash
cd client
npm install
npm run dev
```

The app starts at `http://localhost:3000`.

## Project Structure

```
PawfectBite/
├── server/                         # Spring Boot backend
│   └── src/main/java/com/pawfectbite/server/
│       ├── auth/                   # Google token exchange, JWT issuance
│       │   ├── controller/
│       │   ├── application/
│       │   ├── domain/
│       │   └── dto/
│       ├── users/                  # User profiles
│       │   ├── controller/
│       │   ├── application/
│       │   ├── domain/
│       │   ├── repository/
│       │   ├── database/
│       │   └── dto/
│       ├── pets/                   # Pet CRUD (profiles, allergies, conditions)
│       │   ├── controller/
│       │   ├── application/
│       │   ├── domain/
│       │   ├── repository/
│       │   ├── database/
│       │   └── dto/
│       ├── safety/                 # Rule-based safety engine (5 rules)
│       │   ├── application/
│       │   └── domain/
│       │       └── rules/
│       ├── knowledge/              # Ingredient & nutrition knowledge base
│       │   ├── application/
│       │   ├── domain/
│       │   ├── repository/
│       │   └── database/
│       ├── recipes/                # Recipe generation pipeline
│       │   ├── controller/
│       │   ├── application/
│       │   ├── domain/
│       │   ├── repository/
│       │   ├── database/
│       │   └── dto/
│       ├── ai/                     # LLM integration (prompt building, OpenAI calls)
│       │   ├── application/
│       │   └── domain/
│       ├── calendar/               # Meal calendar management
│       │   ├── controller/
│       │   ├── application/
│       │   ├── domain/
│       │   ├── repository/
│       │   ├── database/
│       │   └── dto/
│       ├── common/                 # Shared config, exceptions, response envelope
│       │   ├── config/
│       │   ├── exception/
│       │   └── response/
│       └── infrastructure/         # Cross-cutting infrastructure
│           ├── security/           # JWT, Google token, ownership enforcement
│           ├── persistence/        # AuditableEntity base class
│           └── openai/             # OpenAI HTTP client
│   └── src/main/resources/
│       ├── application.properties
│       ├── application-dev.properties
│       └── db/migration/           # 7 Flyway migrations (V1–V7)
├── client/                         # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── (auth)/sign-in/     # Google sign-in page
│       │   ├── (main)/             # Cozy Kawaii main app interface
│       │   │   ├── pets/           # Pet management pages (Publicly accessible)
│       │   │   ├── recipes/        # Recipe generation & history pages (Publicly accessible)
│       │   │   └── calendar/       # Monthly calendar page
│       │   └── api/auth/           # Auth.js API route handler
│       ├── components/
│       │   ├── layout/             # Main navbar, page header
│       │   ├── pets/               # Pet card, form, profile summary
│       │   ├── recipes/            # Recipe card, detail view, safety badge, wizard (4 steps)
│       │   ├── calendar/           # Calendar grid, entry dialog
│       │   └── shared/             # Loading, empty state, error, confirm dialog
│       ├── lib/
│       │   ├── api/                # Typed API client + module-specific API functions
│       │   ├── auth/               # Auth.js config + types
│       │   ├── hooks/              # TanStack Query hooks (pets, recipes, calendar)
│       │   ├── schemas/            # Zod form validation schemas
│       │   ├── types/              # TypeScript interfaces for API/domain types
│       │   └── utils/              # Utility functions (cn, date formatting)
│       ├── providers/              # React context providers (Query, Session, Theme)
│       └── styles/                 # Tailwind CSS globals
└── docker-compose.yml              # PostgreSQL 16 + pgvector
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/google` | Exchange Google ID token for app JWT |
| GET | `/api/me` | Get current authenticated user |

### Pets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pets` | List all pets for current user |
| POST | `/api/pets` | Create a new pet profile |
| GET | `/api/pets/{petId}` | Get pet details |
| PUT | `/api/pets/{petId}` | Update pet profile |
| DELETE | `/api/pets/{petId}` | Delete a pet |

### Recipes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recipes/precheck` | Run safety precheck |
| POST | `/api/recipes/generate` | Generate a recipe (full pipeline) |
| GET | `/api/recipes` | List recipes (optional `?petId=` filter) |
| GET | `/api/recipes/{recipeId}` | Get recipe detail |
| POST | `/api/recipes/{recipeId}/save` | Save/bookmark a recipe |
| DELETE | `/api/recipes/{recipeId}` | Delete a recipe |

### Calendar

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calendar?petId={id}&month={YYYY-MM}` | Get calendar entries for a pet/month |
| POST | `/api/calendar/entries` | Assign a recipe to a date |
| PUT | `/api/calendar/entries/{entryId}` | Update a calendar entry |
| DELETE | `/api/calendar/entries/{entryId}` | Remove a calendar entry |

All endpoints except `/api/auth/**` require a `Authorization: Bearer <jwt>` header.

## Safety-First Design

PawfectBite enforces a strict safety pipeline before any recipe is generated:

1. **Toxic ingredient check** -- blocks known harmful substances (chocolate, xylitol, grapes, onion, garlic, alcohol, caffeine, macadamia nuts, etc.)
2. **Allergy conflict detection** -- cross-references requested ingredients against the pet's allergy list
3. **Species restriction validation** -- ensures species-appropriate ingredients (e.g., no citrus for cats, no raw salmon for dogs)
4. **Life stage assessment** -- flags very young (<6 months) and senior pets for veterinary guidance
5. **Medical condition review** -- escalates high-risk health profiles (kidney disease, diabetes, pancreatitis, etc.)

Risk levels: **GREEN** (safe) | **AMBER** (caution, proceed with warnings) | **RED** (high risk, proceed with warnings) | **BLOCKED** (generation denied)

## Recipe Generation Pipeline

```
User Request
    ↓
Load Pet Profile
    ↓
Safety Evaluation (5 deterministic rules)
    ↓ BLOCKED? → Reject
Knowledge Retrieval (ingredients + nutrition guidance)
    ↓
Build Recipe Plan (structured context)
    ↓
LLM Writing (OpenAI, structured JSON output)
    ↓
Post-LLM Validation
    ↓
Persist to Database
    ↓
Return to Frontend
```

## Database Migrations

| Migration | Description |
|-----------|-------------|
| V1 | Users table |
| V2 | Pets table + allergies, conditions, medications collections |
| V3 | Recipe requests + recipes tables (with JSONB columns) |
| V4 | Calendar entries table |
| V5 | Ingredient knowledge + nutrition guidance tables |
| V6 | Enable pgvector extension + embedding columns with IVFFlat indexes |
| V7 | Prompt versions table |

## Architecture Principles

- **Safety over creativity** -- deterministic rules always run before AI
- **The LLM never operates alone** -- it only writes from validated, backend-approved context
- **Modular monolith** -- clear module boundaries, no microservices
- **Layered architecture** -- controller -> application -> domain -> repository -> database
- **Structured data over free text** -- JSON schemas for all LLM outputs
- **Resource ownership enforced** -- users can only access their own pets, recipes, and calendar entries
