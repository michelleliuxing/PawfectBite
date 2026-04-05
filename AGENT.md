# AGENT.md — PawfectBite

## 1. Project Overview

**PawfectBite** is a web application that helps pet owners generate **personalized homemade daily meal recipes** for dogs and cats.

The system combines:

* structured pet profiles
* rule-based safety engine
* curated ingredient and nutrition knowledge base
* LLM-based recipe writing
* calendar-based meal planning

The system is **not** a veterinary diagnostic tool. It provides **guided, safety-aware recipe suggestions** and escalates high-risk cases.

---

## 2. Tech Stack

### Frontend (implemented)

* Next.js 15 App Router
* TypeScript
* Tailwind CSS v4
* Auth.js v5 (next-auth) with Google provider
* React Hook Form + Zod
* TanStack Query v5
* Lucide React icons
* date-fns

### Backend (implemented)

* Java 21
* Spring Boot 4.0.5
* Spring Web
* Spring Security (stateless JWT)
* Spring Data JPA / Hibernate
* Flyway
* Jackson
* Bean Validation (Jakarta)
* JJWT (io.jsonwebtoken) for JWT issuance/validation
* Google Auth Library for ID token verification

### Database

* PostgreSQL 16 (via Docker: pgvector/pgvector:pg16)
* pgvector extension for semantic retrieval

### AI Layer

* OpenAI API, backend only
* structured JSON outputs only (response_format: json_object)
* retrieval-augmented generation via knowledge base

---

## 3. System Architecture

### High-Level Flow

User -> Frontend -> Backend API -> Safety Engine -> Knowledge Retrieval -> Recipe Planning -> LLM Writer -> Structured Validation -> Database -> Frontend

### Key Principle

The LLM **never operates alone**.
It only writes recipes from **validated, structured, backend-approved context**.

### Architecture Style

PawfectBite is built as a **modular monolith**.

This means:

* one backend service (Spring Boot)
* one frontend app (Next.js)
* clear internal module boundaries
* no microservices
* strong separation of concerns
* business logic kept out of controllers

### Auth Flow

1. Frontend uses Auth.js with Google provider
2. On sign-in, Auth.js callback exchanges the Google ID token with the backend (`POST /api/auth/google`)
3. Backend verifies the Google ID token, auto-creates the user on first sign-in, and returns an app JWT
4. JWT is stored in the Auth.js session and sent as `Authorization: Bearer <token>` on all API calls
5. Backend `JwtAuthFilter` validates the token and sets `AuthenticatedUser` in the security context

---

## 4. Backend Layered Architecture

The backend follows these layers strictly:

1. **controller** -- thin REST endpoints
2. **middleware/security** -- JWT validation, ownership enforcement
3. **application** -- use-case orchestration
4. **domain** -- business models, enums, rules
5. **repository** -- persistence abstraction (interfaces)
6. **database** -- JPA entities, Spring Data implementations

Each module contains its own sub-packages for these layers plus a `dto/` package for request/response objects.

---

## 5. Responsibilities of Each Backend Layer

### 5.1 Controller Layer

Expose HTTP APIs to the frontend.

* define REST endpoints with `@RestController`
* receive and validate request DTOs (`@Valid @RequestBody`)
* extract authenticated user via `@AuthenticationPrincipal AuthenticatedUser`
* delegate to application services
* return `ApiResponse<T>` envelopes
* map exceptions to HTTP responses via `GlobalExceptionHandler`

Rules:
* controllers must stay thin
* controllers must not contain business logic
* controllers must not directly query the database
* controllers must not call the LLM directly

### 5.2 Middleware / Security Layer

Located in `infrastructure/security/`.

* `SecurityConfig` -- Spring Security filter chain (stateless, CORS, JWT filter)
* `JwtAuthFilter` -- extracts Bearer token, validates, sets `AuthenticatedUser` principal
* `JwtService` -- generates and parses JWT tokens
* `GoogleTokenVerifier` -- verifies Google ID tokens via Google API client
* `AuthenticatedUser` -- implements `UserDetails`, carries userId/email/name
* `OwnershipEnforcer` -- reusable component to enforce resource ownership

Rules:
* no product business logic in this layer
* ownership enforcement is reusable across modules
* security checks belong here, not in controllers

### 5.3 Application Layer

Orchestrate use cases.

* coordinate domain services, repositories, and external integrations
* manage transaction boundaries (`@Transactional`)
* convert controller inputs into domain actions
* invoke safety engine, retrieval service, and AI service in the correct order

Key implementations:
* `AuthService` -- Google token exchange + user bootstrap
* `PetService` -- pet CRUD orchestration
* `SafetyService` -- delegates to `SafetyEvaluator`
* `RecipeGenerationService` -- THE pipeline orchestrator (normalize -> safety -> retrieve -> plan -> LLM -> validate -> persist)
* `RecipeHistoryService` -- recipe listing, save/delete
* `RecipePlanBuilder` -- builds structured context from safety result + knowledge + pet profile
* `KnowledgeRetrievalService` -- retrieves ingredient and guidance data
* `CalendarService` -- calendar entry CRUD

### 5.4 Domain Layer

Core business logic and business rules.

* domain record types: `User`, `Pet`, `RecipeRequest`, `RecipePlan`, `GeneratedRecipe`, `CalendarEntry`
* enums: `Species`, `Sex`, `ActivityLevel`, `LivingEnvironment`, `RecipeStatus`, `RiskLevel`, `AuthProvider`
* value objects: `SafetyResult`, `SafetyWarning`
* safety engine: `SafetyEvaluator` runs all `SafetyRule` implementations
* 5 safety rules: `ToxicIngredientRule`, `AllergyConflictRule`, `SpeciesRestrictionRule`, `LifeStageRule`, `MedicalConditionRule`
* `RecipeValidator` -- post-LLM validation

If a rule affects whether the system **should** allow or block a recipe, it belongs in the **domain layer**.

### 5.5 Repository Layer

Abstract persistence access.

* `UserRepository` / `UserRepositoryImpl`
* `PetRepository` / `PetRepositoryImpl`
* `RecipeRepository` / `RecipeRepositoryImpl`
* `CalendarEntryRepository` / `CalendarEntryRepositoryImpl`
* `IngredientKnowledgeRepository` / `IngredientKnowledgeRepositoryImpl`
* `NutritionGuidanceRepository` / `NutritionGuidanceRepositoryImpl`

Repository interfaces are business-oriented. Implementations live alongside the database layer and use JPA.

### 5.6 Database Layer

JPA entities and Spring Data interfaces.

* `UserEntity`, `PetEntity`, `RecipeEntity`, `CalendarEntryEntity`
* `IngredientKnowledgeEntity`, `NutritionGuidanceEntity`
* `JpaUserRepository`, `JpaPetRepository`, `JpaRecipeRepository`, `JpaCalendarEntryRepository`
* `JpaIngredientKnowledgeRepository`, `JpaNutritionGuidanceRepository`
* `AuditableEntity` base class with `createdAt`/`updatedAt` via `@PrePersist`/`@PreUpdate`
* 7 Flyway migrations (V1-V7)

---

## 6. Layer Interaction Rules

**controller -> application -> domain / repository -> database**

**middleware/security** supports controller and application access control but stays separate from domain business rules.

### Allowed

* controller calls application
* application calls domain services
* application calls repository interfaces
* repository implementations use JPA database entities
* security layer injects authenticated user context

### Not allowed

* controller directly calling repository
* controller directly calling database
* controller containing safety logic
* domain depending on controller
* domain depending on JPA entities
* application bypassing repository abstractions

---

## 7. Core Backend Modules (implemented)

### 7.1 auth

* `AuthController` -- `POST /api/auth/google`
* `AuthService` -- Google token exchange, user bootstrap, JWT issuance
* `AuthProvider` enum, `GoogleAuthRequest`/`AuthResponse` DTOs

### 7.2 users

* `UserController` -- `GET /api/me`
* `UserService` -- get user by ID, get-or-create by Google ID
* `User` domain model, `UserEntity`, `UserRepository`/`UserRepositoryImpl`

### 7.3 pets

* `PetController` -- full CRUD (`GET`, `POST`, `PUT`, `DELETE` on `/api/pets`)
* `PetService` -- create, update, delete, list, get
* `Pet` domain model with `Species`, `Sex`, `ActivityLevel`, `LivingEnvironment` enums
* `PetEntity` with `@ElementCollection` for allergies, medicalConditions, medications
* `CreatePetRequest`, `UpdatePetRequest`, `PetResponse` DTOs

### 7.4 recipes

* `RecipeController` -- precheck, generate, list, get, save, delete
* `RecipeGenerationService` -- full pipeline orchestrator
* `RecipeHistoryService` -- CRUD for saved recipes
* `RecipePlanBuilder` -- assembles structured context for LLM
* `RecipeValidator` -- post-LLM output validation
* Domain: `RecipeRequest`, `RecipePlan`, `GeneratedRecipe`, `RecipeStatus`
* `RecipeEntity` with JSONB columns for ingredients, steps, warnings, etc.

### 7.5 safety

* `SafetyEvaluator` -- runs all `SafetyRule` implementations, produces `SafetyResult`
* `SafetyService` -- application-layer wrapper with logging
* 5 rules: `ToxicIngredientRule`, `AllergyConflictRule`, `SpeciesRestrictionRule`, `LifeStageRule`, `MedicalConditionRule`
* `RiskLevel` enum: GREEN, AMBER, RED, BLOCKED (with `escalate()` method)
* `SafetyWarning` value object

### 7.6 knowledge

* `KnowledgeRetrievalService` -- retrieves ingredient + guidance data for recipe planning
* `IngredientKnowledge` / `NutritionGuidance` domain models
* `IngredientKnowledgeEntity` / `NutritionGuidanceEntity` with pgvector-ready columns
* Repository interfaces + implementations (vector search stubs ready for native query impl)

### 7.7 calendar

* `CalendarController` -- GET entries by pet/month, POST/PUT/DELETE entries
* `CalendarService` -- CRUD with `YearMonth` parsing
* `CalendarEntry` domain model
* `CalendarEntryEntity`, `JpaCalendarEntryRepository`

### 7.8 ai

* `LLMRecipeWriter` -- sends structured plan to OpenAI, parses JSON response
* `PromptBuilder` -- assembles system prompt + user prompt from `RecipePlan`
* `StructuredRecipeOutput` -- expected JSON schema from LLM
* Infrastructure: `OpenAIClient` (HTTP client wrapper), `OpenAIProperties` (config)

### 7.9 common

* `ApiResponse<T>` -- standard envelope `{data, error, meta}`
* `AppException`, `ResourceNotFoundException`, `SafetyBlockedException`
* `GlobalExceptionHandler` -- `@RestControllerAdvice` mapping all exception types
* `CorsConfig`, `JacksonConfig`

### 7.10 infrastructure

* `infrastructure/security/` -- SecurityConfig, JwtAuthFilter, JwtService, GoogleTokenVerifier, AuthenticatedUser, OwnershipEnforcer
* `infrastructure/persistence/` -- AuditableEntity
* `infrastructure/openai/` -- OpenAIClient, OpenAIProperties

---

## 8. Implemented Backend Package Structure

```text
com.pawfectbite.server
├── ServerApplication.java
├── common
│   ├── config          (CorsConfig, JacksonConfig)
│   ├── exception       (AppException, ResourceNotFoundException, SafetyBlockedException, GlobalExceptionHandler)
│   └── response        (ApiResponse)
├── infrastructure
│   ├── security        (SecurityConfig, JwtAuthFilter, JwtService, GoogleTokenVerifier, AuthenticatedUser, OwnershipEnforcer)
│   ├── persistence     (AuditableEntity)
│   └── openai          (OpenAIClient, OpenAIProperties)
├── auth
│   ├── controller      (AuthController)
│   ├── application     (AuthService)
│   ├── domain          (AuthProvider)
│   └── dto             (GoogleAuthRequest, AuthResponse)
├── users
│   ├── controller      (UserController)
│   ├── application     (UserService)
│   ├── domain          (User)
│   ├── repository      (UserRepository, UserRepositoryImpl)
│   ├── database        (UserEntity, JpaUserRepository)
│   └── dto             (UserResponse)
├── pets
│   ├── controller      (PetController)
│   ├── application     (PetService)
│   ├── domain          (Pet, Species, Sex, ActivityLevel, LivingEnvironment)
│   ├── repository      (PetRepository, PetRepositoryImpl)
│   ├── database        (PetEntity, JpaPetRepository)
│   └── dto             (CreatePetRequest, UpdatePetRequest, PetResponse)
├── safety
│   ├── application     (SafetyService)
│   └── domain          (SafetyEvaluator, SafetyResult, SafetyWarning, SafetyRule, RiskLevel,
│                         rules/ToxicIngredientRule, AllergyConflictRule, SpeciesRestrictionRule,
│                         LifeStageRule, MedicalConditionRule)
├── knowledge
│   ├── application     (KnowledgeRetrievalService)
│   ├── domain          (IngredientKnowledge, NutritionGuidance)
│   ├── repository      (IngredientKnowledgeRepository, IngredientKnowledgeRepositoryImpl,
│                         NutritionGuidanceRepository, NutritionGuidanceRepositoryImpl)
│   └── database        (IngredientKnowledgeEntity, NutritionGuidanceEntity,
│                         JpaIngredientKnowledgeRepository, JpaNutritionGuidanceRepository)
├── recipes
│   ├── controller      (RecipeController)
│   ├── application     (RecipeGenerationService, RecipeHistoryService, RecipePlanBuilder)
│   ├── domain          (RecipeRequest, RecipePlan, GeneratedRecipe, RecipeStatus, RecipeValidator)
│   ├── repository      (RecipeRepository, RecipeRepositoryImpl)
│   ├── database        (RecipeEntity, JpaRecipeRepository)
│   └── dto             (RecipePrecheckRequest, RecipePrecheckResponse, RecipeGenerateRequest, RecipeResponse)
├── ai
│   ├── application     (LLMRecipeWriter, PromptBuilder)
│   └── domain          (StructuredRecipeOutput)
└── calendar
    ├── controller      (CalendarController)
    ├── application     (CalendarService)
    ├── domain          (CalendarEntry)
    ├── repository      (CalendarEntryRepository, CalendarEntryRepositoryImpl)
    ├── database        (CalendarEntryEntity, JpaCalendarEntryRepository)
    └── dto             (CreateCalendarEntryRequest, UpdateCalendarEntryRequest, CalendarEntryResponse)
```

---

## 9. Recipe Generation Pipeline (implemented)

The pipeline is orchestrated by `RecipeGenerationService.generate()`:

### Step 1: Load Pet

Fetch pet by ID via `PetService`.

### Step 2: Normalize Input

Null-safe the ingredient lists from the request DTO.

### Step 3: Safety Evaluation

`SafetyService.evaluate()` runs `SafetyEvaluator` which iterates all `SafetyRule` implementations:
* `ToxicIngredientRule` -- checks against a hardcoded set of toxic substances (chocolate, xylitol, grapes, etc.)
* `AllergyConflictRule` -- cross-references requested ingredients with pet's allergy list
* `SpeciesRestrictionRule` -- species-specific ingredient restrictions (e.g., citrus for cats)
* `LifeStageRule` -- flags very young (<6 months) and senior pets
* `MedicalConditionRule` -- classifies conditions as high-risk (kidney disease, diabetes, etc.) or moderate-risk (obesity, IBD, etc.)

Each rule returns `SafetyWarning` objects with a `RiskLevel`. The evaluator escalates to the highest level.

### Step 4: Block if Unsafe

If `SafetyResult.canProceed()` is false (BLOCKED), throw `SafetyBlockedException`.

### Step 5: Build Recipe Plan

`RecipePlanBuilder.build()` retrieves knowledge from the knowledge base and assembles a `RecipePlan` containing pet profile, approved ingredients, exclusions, budget, safety result, and knowledge context strings.

### Step 6: LLM Writing

`LLMRecipeWriter.generateRecipe()` uses `PromptBuilder` to assemble system + user prompts, calls `OpenAIClient.chatCompletion()`, and parses the JSON response into `StructuredRecipeOutput`.

### Step 7: Validation

`RecipeValidator.validate()` checks that the LLM output has a title, ingredients, steps, and valid calorie count.

### Step 8: Persistence

The validated recipe is mapped to a `GeneratedRecipe` domain object and saved via `RecipeRepository`.

---

## 10. LLM Guidelines

### Role

The LLM is a **pet meal planning writer**, not a veterinarian.

### System Prompt Rules (enforced in `PromptBuilder`)

Must not:
* diagnose or prescribe medication
* override veterinarians
* claim complete and balanced nutrition
* include blocked or excluded ingredients
* ignore species differences
* bypass safety results

Must:
* respect the safety result and warnings
* use only the approved structured context provided
* output structured JSON only
* include caution notes where appropriate
* recommend vet consultation for risky cases

### Output Format

Returns JSON with: `title`, `description`, `ingredients[]`, `steps[]`, `estimatedCalories`, `feedingPortions`, `shoppingList[]`, `prepTimeMinutes`, `storageGuidance`, `cautionNotes[]`.

---

## 11. Ingredient Safety Rules (implemented)

### Hard Block (ToxicIngredientRule)

chocolate, xylitol, grapes, raisins, onion, onions, garlic, alcohol, caffeine, coffee, cooked bones, macadamia nuts, macadamia, avocado pit, nutmeg, raw yeast dough, apple seeds, cherry pits

### Species Restrictions (SpeciesRestrictionRule)

* CAT: onion powder, garlic powder, raw fish, dog food, citrus
* DOG: cat food, raw salmon, raw trout

### Medical Condition Risk (MedicalConditionRule)

* HIGH RISK (RED): kidney disease, renal failure, CKD, liver disease, hepatic disease, diabetes, pancreatitis, cancer, heart disease, epilepsy, Cushing's disease
* MODERATE RISK (AMBER): obesity, arthritis, IBD, inflammatory bowel disease, urinary crystals, hypothyroidism, hyperthyroidism, food intolerance, skin allergies

---

## 12. Database Schema (implemented)

7 Flyway migrations create:

* `V1` -- `users` table (UUID PK, email, name, picture_url, google_id)
* `V2` -- `pets` table + `pet_allergies`, `pet_medical_conditions`, `pet_medications` (element collections)
* `V3` -- `recipe_requests` table (with TEXT[] and JSONB columns), `recipes` table (with JSONB for ingredients, steps, warnings, shopping list, caution notes)
* `V4` -- `calendar_entries` table
* `V5` -- `ingredient_knowledge` table, `nutrition_guidance` table
* `V6` -- enables pgvector extension, adds `embedding vector(1536)` columns with IVFFlat indexes
* `V7` -- `prompt_versions` table

---

## 13. API Design (implemented)

### Auth

* `POST /api/auth/google` -- exchange Google ID token for app JWT
* `GET /api/me` -- get current authenticated user

### Pets

* `GET /api/pets` -- list all pets for current user
* `POST /api/pets` -- create a new pet
* `GET /api/pets/{petId}` -- get pet detail
* `PUT /api/pets/{petId}` -- update pet profile
* `DELETE /api/pets/{petId}` -- delete a pet

### Recipes

* `POST /api/recipes/precheck` -- run safety precheck (returns risk level + warnings)
* `POST /api/recipes/generate` -- generate a recipe (full pipeline)
* `GET /api/recipes` -- list recipes (optional `?petId=` filter)
* `GET /api/recipes/{recipeId}` -- get recipe detail
* `POST /api/recipes/{recipeId}/save` -- save/bookmark a recipe
* `DELETE /api/recipes/{recipeId}` -- delete a recipe

### Calendar

* `GET /api/calendar?petId={id}&month={YYYY-MM}` -- get entries for a pet/month
* `POST /api/calendar/entries` -- assign a recipe to a date
* `PUT /api/calendar/entries/{entryId}` -- update a calendar entry
* `DELETE /api/calendar/entries/{entryId}` -- remove a calendar entry

All endpoints except `/api/auth/**` require authentication (Bearer JWT).

### Standard Response Envelope

```json
{
  "data": { ... },
  "error": { "code": "...", "message": "..." },
  "meta": { "timestamp": "..." }
}
```

---

## 14. Frontend Architecture (implemented)

### Route Structure

* `(auth)/sign-in` -- Google sign-in page (unauthenticated)
* `(main)/pets` -- pet list, create, detail, edit (List is public, create/edit requires auth)
* `(main)/recipes` -- recipe history, generate wizard, recipe detail (List is public, generate requires auth)
* `(main)/calendar` -- monthly calendar grid with meal assignment (Requires auth)

### Component Organization

* `components/ui/` -- shadcn/ui primitives (to be added via CLI)
* `components/layout/` -- app-sidebar, nav-bar, page-header, token-setter
* `components/pets/` -- pet-card, pet-form (with tag inputs for allergies/conditions/meds), pet-profile-summary
* `components/recipes/` -- recipe-card, recipe-detail-view, safety-badge, recipe-wizard/ (4 steps)
* `components/calendar/` -- calendar-grid (monthly), calendar-entry-dialog
* `components/shared/` -- empty-state, loading-spinner, error-alert, confirm-dialog

### Data Layer

* `lib/api/client.ts` -- singleton `ApiClient` with Bearer token injection
* `lib/api/pets.api.ts` / `recipes.api.ts` / `calendar.api.ts` -- typed API functions
* `lib/hooks/use-pets.ts` / `use-recipes.ts` / `use-calendar.ts` -- TanStack Query hooks
* `lib/schemas/` -- Zod schemas for form validation
* `lib/types/` -- TypeScript interfaces matching backend DTOs

### Auth Integration

* Auth.js v5 with Google provider
* JWT callback exchanges Google ID token with backend, stores app JWT in session
* `TokenSetter` client component syncs session token to `apiClient`
* Dashboard layout fetches session server-side and redirects unauthenticated users

### Design Tokens

Warm color palette with oklch colors:
* Primary: warm amber/brown tones (oklch 0.55 0.12 45)
* Background: soft warm off-white
* Light/dark mode support via CSS custom properties

---

## 15. AI Integration Rules

* never expose API keys to frontend
* all AI calls go through backend (`OpenAIClient` in `infrastructure/openai/`)
* always enforce strict JSON output validation (`StructuredRecipeOutput`)
* log prompt version, safety result, and generation metadata
* never let frontend directly compose raw model prompts
* system prompt is hardcoded in `PromptBuilder.buildSystemPrompt()`

---

## 16. Security Rules

* validate all user input (Bean Validation + Zod)
* enforce resource ownership via `OwnershipEnforcer`
* authenticate all private endpoints (JWT filter)
* store secrets in environment variables (JWT_SECRET, GOOGLE_CLIENT_ID, OPENAI_API_KEY)
* treat all client input as untrusted
* CORS restricted to configured origins

---

## 17. Coding Standards

### Backend

* use Java records for DTOs and domain models
* use DTOs at controller boundaries
* keep controllers thin (delegate immediately to services)
* put orchestration in application services
* put business rules in domain layer
* use repository interface + impl pattern for persistence abstraction
* keep JPA entities in database layer only

### Frontend

* use typed forms with React Hook Form + Zod
* keep components reusable and feature-scoped
* separate public `(auth)` and main app `(main)` route groups
* keep API access in dedicated `lib/api/*.api.ts` modules
* wrap API calls in TanStack Query hooks (`lib/hooks/`)
* use `ApiResponse<T>` envelope pattern in the API client

---

## 18. Logging and Observability

Log:
* recipe generation requests (start + completion with recipe ID)
* safety decisions (risk level, warning count, canProceed)
* blocked cases (with reasons)
* knowledge retrieval counts
* LLM failures
* auth events (user authenticated)
* ownership violations

---

## 19. MVP Scope

### Implemented

* Google login with JWT
* pet profiles (full CRUD with allergies, conditions, medications)
* safety precheck (5 deterministic rules)
* recipe generation (full pipeline with safety -> knowledge -> LLM -> validation)
* recipe history (list, detail, save/bookmark, delete)
* calendar (monthly grid, assign/edit/delete entries per pet)

### Excluded

* payments
* social features
* Google Calendar sync
* vet portal
* admin knowledge ingestion UI (data layer ready, no admin endpoints yet)
* rate limiting (to be added)

---

## 20. Guiding Principles

1. Safety over creativity
2. Deterministic logic before AI
3. Structured data over free text
4. Domain rules must be explicit
5. Layer boundaries must stay clean
6. Simplicity first, scale later

---

## 21. Final Rule for Agents

If unsure:

* fail safely
* do not guess on medical-risk behavior
* do not bypass domain safety rules
* recommend veterinarian review where appropriate
