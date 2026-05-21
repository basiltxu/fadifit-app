# FadiFit — Full Developer Implementation Guide

> **Version:** 1.0 · **Date:** 2026-05-21  
> **Production repo:** https://github.com/basiltxu/fadifit-app.git  
> **Prototype repo (design reference):** current sandbox / Figma Make build  
> **Prepared for:** Codex / autonomous developer handoff

---

## Executive Summary

FadiFit is a premium mobile-first fitness application with role-based access (Member, Coach, Nutrition Specialist, Admin, Super Admin). The current prototype is a complete, high-fidelity React/TypeScript/React Router SPA running on mock data. The production repo contains real auth, database, API, subscription, and AI integrations.

**Goal of this guide:** Give Codex the information needed to transplant the Figma-designed UI/UX from the prototype onto the real production backend, screen by screen, role by role, without breaking existing data flows.

**Key constraints:**
- Do NOT replace real auth with mock auth
- Do NOT hardcode exercise, meal, or user data
- Do NOT change API contracts without explicit approval
- Do NOT modify global theme tokens until the final polish phase
- Increment safely — one phase per PR, each independently rollback-able

---

## 1. Product Architecture Overview

### End-to-End Flow

```
Internet User
  └── Splash / Language Select
        └── Welcome
              ├── Sign In  ──────────── Forgot/Reset Password
              └── Sign Up
                    └── Onboarding (6 steps)
                          └── Role Router
                                ├── Member Dashboard
                                ├── Coach Dashboard
                                ├── Nutrition Specialist Dashboard
                                ├── Admin Dashboard
                                └── Super Admin Dashboard
```

### Role Matrix

| Role | Primary Surface | Key Capabilities |
|------|----------------|-----------------|
| Member | Mobile dashboard | Workout tracking, nutrition, progress, messaging coach |
| Coach | Web + mobile | Manage clients, build workout plans, messaging |
| Nutrition Specialist | Web + mobile | Build meal plans, assign to clients |
| Admin | Web | Manage users, subscriptions, content library |
| Super Admin | Web | Everything + billing settings, platform config |

### Core Subsystems

1. **Auth** — JWT-based, role claims in token
2. **User Profile** — CRUD for personal info, body composition, goals
3. **Workout Engine** — Plans → Days → Exercises → Sets (real-time tracking)
4. **Nutrition Engine** — Meal plans → Meals → Foods → Macros
5. **Progress Engine** — Time-series weight/measurements/body-fat
6. **AI Generation** — Background job queue for workout/meal plan generation
7. **Exercise Library** — Searchable catalogue with GIF/video previews
8. **Reminders** — Push notifications (Expo / FCM / APNs)
9. **Messaging** — Coach↔Member real-time chat
10. **Subscriptions** — Stripe (or equivalent) billing tiers
11. **Admin CMS** — User management, content moderation

---

## 2. Screen-by-Screen App Flow

### 2.1 Auth & Onboarding

#### SCREEN: Splash (`/`)
| Field | Value |
|---|---|
| Purpose | Brand entry, auth check redirect |
| User Role | Any (unauthenticated) |
| Required Data | Auth token presence |
| Backend | `GET /auth/me` — if 200 redirect to role dashboard, else go to Welcome |
| Main Actions | Auto-redirect |
| Navigation Targets | Welcome (no session), Dashboard (active session) |
| Components | `SplashScreen`, `AnimatedLogo` |
| Mobile Layout | Full-screen centered logo, 2-second hold then redirect |
| Edge Cases | Expired token → force logout → Welcome |

#### SCREEN: Language Select (`/language-select`)
| Field | Value |
|---|---|
| Purpose | Choose app language (EN / AR / ES) |
| User Role | Any |
| Required Data | Supported locale list |
| Backend | Static config or `GET /config/locales` |
| Main Actions | Select language, persist to localStorage + user profile if authenticated |
| Navigation Targets | Welcome |
| Components | `LanguageCard`, `LocaleProvider` |
| Mobile Layout | Grid of language tiles, full-width CTA |
| Edge Cases | Default to device locale if supported |

#### SCREEN: Welcome (`/welcome`)
| Field | Value |
|---|---|
| Purpose | Brand intro, entry to auth |
| User Role | Unauthenticated |
| Required Data | None |
| Backend | None |
| Main Actions | Sign In, Sign Up |
| Navigation Targets | `/signin`, `/signup` |
| Components | `WelcomeHero`, `BrandLogo`, `CTAButton` |
| Mobile Layout | Logo top → headline + subtext → dual CTA buttons bottom |
| Edge Cases | None |

#### SCREEN: Sign In (`/signin`)
| Field | Value |
|---|---|
| Purpose | Authenticate existing user |
| User Role | Unauthenticated |
| Required Data | Email, password |
| Backend | `POST /auth/login` → returns JWT + role |
| Main Actions | Submit credentials, forgot password link |
| Navigation Targets | Role dashboard (on success), `/forgot-password` |
| Components | `AuthForm`, `TextInput`, `PasswordInput`, `PrimaryButton` |
| Mobile Layout | Form centered, keyboard-safe scroll |
| Edge Cases | Wrong creds (401), account locked (403), network error |

#### SCREEN: Sign Up (`/signup`)
| Field | Value |
|---|---|
| Purpose | Create new member account |
| User Role | Unauthenticated |
| Required Data | Name, email, password, password confirm |
| Backend | `POST /auth/register` → returns JWT |
| Main Actions | Submit registration |
| Navigation Targets | Onboarding step 1 |
| Components | `AuthForm`, `TextInput`, `PasswordInput` |
| Mobile Layout | Scrollable form |
| Edge Cases | Email already exists (409), weak password (422), network error |

#### SCREEN: Forgot Password (`/forgot-password`)
| Field | Value |
|---|---|
| Purpose | Initiate password reset |
| Backend | `POST /auth/forgot-password` |
| Navigation Targets | Confirmation screen → Sign In |
| Edge Cases | Unknown email → generic success message (no enumeration) |

#### SCREEN: Reset Password (`/reset-password?token=`)
| Field | Value |
|---|---|
| Purpose | Set new password via email link |
| Backend | `POST /auth/reset-password` with token + new password |
| Navigation Targets | Sign In |
| Edge Cases | Expired/invalid token (400) |

#### SCREEN: Onboarding — Basic Info (`/onboarding/basic-info`)
| Field | Value |
|---|---|
| Purpose | Collect name, DOB, gender |
| Backend | `PATCH /users/me/profile` |
| Navigation Targets | Next onboarding step |

#### SCREEN: Onboarding — Body Composition (`/onboarding/body`)
| Field | Value |
|---|---|
| Purpose | Height, weight, target weight |
| Backend | `PATCH /users/me/profile` |

#### SCREEN: Onboarding — Fitness Profile (`/onboarding/fitness`)
| Field | Value |
|---|---|
| Purpose | Activity level, fitness goals |
| Backend | `PATCH /users/me/profile` |

#### SCREEN: Onboarding — Health (`/onboarding/health`)
| Field | Value |
|---|---|
| Purpose | Injuries, medical notes |
| Backend | `PATCH /users/me/profile` |

#### SCREEN: Onboarding — Nutrition (`/onboarding/nutrition`)
| Field | Value |
|---|---|
| Purpose | Dietary preferences, allergies |
| Backend | `PATCH /users/me/profile` |

#### SCREEN: Onboarding — Review (`/onboarding/review`)
| Field | Value |
|---|---|
| Purpose | Confirm all data before AI plan generation |
| Backend | `POST /ai/generate-initial-plan` (async job) |
| Navigation Targets | `/generating` → `/dashboard` |

#### SCREEN: Generating (`/generating`)
| Field | Value |
|---|---|
| Purpose | Show AI plan generation progress |
| Backend | `GET /ai/jobs/:jobId` — poll until complete |
| Navigation Targets | Dashboard on completion |
| Edge Cases | Job failure → retry option or manual setup |

### 2.2 Member Flow

#### SCREEN: Dashboard (`/dashboard`)
| Field | Value |
|---|---|
| Purpose | Daily fitness overview |
| User Role | Member |
| Required Data | Today's workout plan, meals, water, progress stats, streak |
| Backend | `GET /members/me/dashboard` (aggregated endpoint recommended) |
| Main Actions | Start workout, log meal, log water, view progress |
| Navigation Targets | `/plan`, `/nutrition`, `/progress`, `/messages` |
| Components | `DashboardHero`, `StatCard`, `WorkoutCard`, `MealCard`, `WaterTracker`, `ProgressBadge` |
| Mobile Layout | Scrollable feed: hero greeting → stats row → today's workout → today's meals → water → progress |
| Edge Cases | No plan generated yet → prompt to generate; streak reset UI |

#### SCREEN: Workout Plan (`/plan`)
| Field | Value |
|---|---|
| Purpose | View weekly workout schedule |
| Backend | `GET /members/me/workout-plans/active` |
| Main Actions | Select workout day, start workout |
| Navigation Targets | `/workout/:dayId` |
| Components | `WeekCalendar`, `WorkoutDayCard`, `RestDayCard` |
| Edge Cases | No active plan → empty state + generate CTA |

#### SCREEN: Workout Day / Detail (`/workout/:dayId`)
| Field | Value |
|---|---|
| Purpose | View exercises for a specific day |
| Backend | `GET /workout-plans/days/:dayId` |
| Main Actions | Start workout, view exercise detail |
| Navigation Targets | `/workout/:dayId/active`, `/exercise/:exerciseId` |
| Components | `ExerciseCard`, `SetPreview`, `StartWorkoutButton` |

#### SCREEN: Active Workout (`/workout/:dayId/active`)
| Field | Value |
|---|---|
| Purpose | Real-time workout tracking |
| Backend | `POST /workout-logs`, `PATCH /workout-logs/:logId/sets` |
| Required Data | Live exercise list, previous session weights (for warm-up suggestions) |
| Main Actions | Log sets, rest timer, complete exercise, finish workout, add dropsets |
| Navigation Targets | `/workout-complete/:logId` |
| Components | `ActiveExerciseCard`, `SetLogger`, `RestTimer`, `ProgressBar`, `DropsetToggle` |
| Edge Cases | App backgrounded → persist state; accidental back → confirm discard dialog |

#### SCREEN: Workout Complete (`/workout-complete/:logId`)
| Field | Value |
|---|---|
| Purpose | Post-workout summary and XP |
| Backend | `GET /workout-logs/:logId/summary` |
| Main Actions | Share, return to dashboard |

#### SCREEN: Exercise Library (`/exercises`)
| Field | Value |
|---|---|
| Purpose | Browse all exercises |
| Backend | `GET /exercises?search=&muscleGroup=&equipment=&page=` |
| Main Actions | Search, filter, open detail |
| Components | `ExerciseGrid`, `FilterChips`, `SearchBar`, `ExerciseCard` |
| Edge Cases | Empty search results |

#### SCREEN: Exercise Detail (`/exercises/:exerciseId`)
| Field | Value |
|---|---|
| Purpose | Full exercise info with GIF/video |
| Backend | `GET /exercises/:exerciseId` |
| Components | `GifPreviewFrame`, `MuscleMap`, `InstructionList`, `VideoPlayer` |
| Edge Cases | GIF not loaded → skeleton; video autoplay policy |

#### SCREEN: Nutrition Dashboard (`/nutrition`)
| Field | Value |
|---|---|
| Purpose | Daily macro overview and meal list |
| Backend | `GET /members/me/nutrition/today` |
| Main Actions | Log meal, view meal detail, add water |
| Components | `MacroRing`, `MealCard`, `WaterTracker`, `CalorieSummary` |

#### SCREEN: Meal Detail (`/nutrition/meals/:mealId`)
| Field | Value |
|---|---|
| Purpose | Foods in a meal, macros breakdown |
| Backend | `GET /nutrition/meals/:mealId` |
| Main Actions | Mark as eaten, swap food |

#### SCREEN: Progress (`/progress`)
| Field | Value |
|---|---|
| Purpose | Body metrics over time |
| Backend | `GET /members/me/progress?range=30d` |
| Main Actions | Add measurement, view charts |
| Components | `ProgressChart`, `MetricCard`, `AddProgressFAB` |

#### SCREEN: Add Progress (`/progress/add`)
| Field | Value |
|---|---|
| Purpose | Log weight/measurements/body fat |
| Backend | `POST /members/me/progress` |

#### SCREEN: Messages (`/messages`)
| Field | Value |
|---|---|
| Purpose | Chat with coach |
| Backend | WebSocket or `GET /messages?channel=:channelId` + `POST /messages` |
| Components | `ChatBubble`, `MessageInput`, `AttachmentButton` |

#### SCREEN: Profile (`/profile`)
| Field | Value |
|---|---|
| Purpose | View user stats and profile |
| Backend | `GET /users/me` |

#### SCREEN: Settings (`/settings`)
| Field | Value |
|---|---|
| Purpose | App configuration hub |
| Backend | None (navigation only) |
| Navigation Targets | Personal info, goals, notifications, subscription, language |

#### SCREEN: Personal Info (`/settings/personal-info`)
| Field | Value |
|---|---|
| Backend | `GET/PATCH /users/me/profile` |

#### SCREEN: Goals & Preferences (`/settings/goals`)
| Field | Value |
|---|---|
| Backend | `GET/PATCH /users/me/goals` |

#### SCREEN: Notification Settings (`/settings/notifications`)
| Field | Value |
|---|---|
| Backend | `GET/PATCH /users/me/notification-preferences` |

#### SCREEN: Subscription / Billing (`/settings/subscription`)
| Field | Value |
|---|---|
| Purpose | View plan, manage billing |
| Backend | `GET /billing/subscription`, `POST /billing/portal-session` |
| Edge Cases | No active subscription → upgrade CTA |

### 2.3 Coach Flow

#### SCREEN: Coach Dashboard (`/coach/dashboard`)
| Field | Value |
|---|---|
| Purpose | Overview of all clients |
| Backend | `GET /coaches/me/dashboard` |
| Components | `ClientSummaryCard`, `PendingActionsPanel`, `ScheduleWidget` |

#### SCREEN: Client List (`/coach/clients`)
| Field | Value |
|---|---|
| Backend | `GET /coaches/me/clients?page=` |
| Main Actions | Search, filter, open client detail |

#### SCREEN: Client Detail (`/coach/clients/:clientId`)
| Field | Value |
|---|---|
| Backend | `GET /coaches/clients/:clientId/overview` |
| Main Actions | View progress, assign plan, message |

#### SCREEN: Coach Workout Builder (`/coach/workout-builder`)
| Field | Value |
|---|---|
| Backend | `POST/PATCH /workout-plans`, `GET /exercises` |
| Main Actions | Drag-and-drop exercises, set reps/sets/rest, assign to client |

### 2.4 Nutrition Specialist Flow

#### SCREEN: NS Dashboard (`/nutrition-specialist/dashboard`)
| Field | Value |
|---|---|
| Backend | `GET /nutrition-specialists/me/dashboard` |

#### SCREEN: Meal Plan Builder (`/nutrition-specialist/meal-plans/builder`)
| Field | Value |
|---|---|
| Backend | `POST/PATCH /nutrition/meal-plans`, `GET /foods` |
| Main Actions | Build meals, assign macros, assign to client |

### 2.5 Admin / Super Admin Flow

#### SCREEN: Admin Dashboard (`/admin/dashboard`)
| Field | Value |
|---|---|
| Backend | `GET /admin/metrics` |
| Components | `MetricCard`, `UserTable`, `ActivityFeed` |

#### SCREEN: Super Admin Dashboard (`/super-admin/dashboard`)
| Field | Value |
|---|---|
| Backend | `GET /super-admin/platform-metrics` |
| Additional | Platform config, billing settings, feature flags |

---

## 3. Real-Data Implementation Mapping

| Screen | Real Auth | Real Profile | Real API Data | Real Exercise | Real Workout | Real Nutrition | Real Billing | Real AI Job |
|--------|-----------|-------------|--------------|--------------|-------------|---------------|-------------|------------|
| Splash | ✅ | — | — | — | — | — | — | — |
| Sign In/Up | ✅ | — | — | — | — | — | — | — |
| Onboarding | ✅ | ✅ | — | — | — | — | — | — |
| Generating | ✅ | ✅ | — | — | — | — | — | ✅ |
| Dashboard | ✅ | ✅ | ✅ | — | ✅ | ✅ | — | — |
| Active Workout | ✅ | — | — | ✅ | ✅ | — | — | — |
| Exercise Library | ✅ | — | — | ✅ | — | — | — | — |
| Nutrition | ✅ | — | — | — | — | ✅ | — | — |
| Progress | ✅ | ✅ | — | — | — | — | — | — |
| Subscription | ✅ | — | — | — | — | — | ✅ | — |
| Coach Clients | ✅ | — | ✅ | — | ✅ | — | — | — |
| Admin | ✅ | — | ✅ | — | — | — | — | — |

**Must NOT be fake or hardcoded:**
- JWT token and role claims
- User profile fields used in workout calculations (weight, fitness level)
- Exercise GIF/video URLs
- Workout log writes (sets, reps, weights)
- Billing/subscription state (gate premium features)
- AI job polling

---

## 4. Backend / API Connection Plan

### 4.1 Auth Endpoints

| Endpoint | Method | Screens | Notes |
|----------|--------|---------|-------|
| `/auth/login` | POST | Sign In | Returns `{ token, refreshToken, user, role }` |
| `/auth/register` | POST | Sign Up | Returns same |
| `/auth/me` | GET | Splash, all protected | Validates token |
| `/auth/refresh` | POST | All (silent) | Use refresh token on 401 |
| `/auth/logout` | POST | Settings | Revoke refresh token |
| `/auth/forgot-password` | POST | Forgot Password | |
| `/auth/reset-password` | POST | Reset Password | Body: `{ token, newPassword }` |

**Loading state:** Spinner on submit button  
**Error state:** Toast with error.message  
**Retry:** Manual re-submit  

### 4.2 User Profile Endpoints

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/users/me` | GET | Profile, Settings |
| `/users/me/profile` | PATCH | Onboarding steps, Personal Info |
| `/users/me/goals` | GET/PATCH | Goals & Preferences |
| `/users/me/notification-preferences` | GET/PATCH | Notification Settings |

### 4.3 Member Dashboard

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/members/me/dashboard` | GET | Dashboard |
| `/members/me/streak` | GET | Dashboard stat card |
| `/members/me/water` | GET/POST | Dashboard, Nutrition |

### 4.4 Workout Endpoints

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/members/me/workout-plans/active` | GET | Plan |
| `/workout-plans/days/:dayId` | GET | Workout Day |
| `/workout-logs` | POST | Active Workout (start) |
| `/workout-logs/:logId/sets` | PATCH | Active Workout (log set) |
| `/workout-logs/:logId/complete` | POST | Active Workout (finish) |
| `/workout-logs/:logId/summary` | GET | Workout Complete |
| `/workout-logs` | GET | Progress history |

### 4.5 Exercise Library

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/exercises` | GET | Exercise Library (`?search&muscleGroup&equipment&page`) |
| `/exercises/:id` | GET | Exercise Detail |
| `/exercises/:id/previous-performance` | GET | Active Workout (warm-up suggestion) |

### 4.6 Nutrition

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/members/me/nutrition/today` | GET | Nutrition Dashboard |
| `/nutrition/meals/:mealId` | GET | Meal Detail |
| `/nutrition/meals/:mealId/complete` | POST | Meal Detail (mark eaten) |
| `/nutrition/meal-plans/active` | GET | Nutrition (plan view) |

### 4.7 Progress

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/members/me/progress` | GET | Progress (`?range=30d`) |
| `/members/me/progress` | POST | Add Progress |

### 4.8 Reminders

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/users/me/reminders` | GET/POST/PATCH/DELETE | Notification Settings |
| `/users/me/push-token` | POST | App startup (register device) |

### 4.9 Messaging

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/messages/channels` | GET | Messages (channel list) |
| `/messages/channels/:id/messages` | GET | Messages (history) |
| `/messages/channels/:id/messages` | POST | Messages (send) |
| WebSocket `/ws/messages` | WS | Real-time delivery |

### 4.10 Coach / Client

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/coaches/me/dashboard` | GET | Coach Dashboard |
| `/coaches/me/clients` | GET | Client List |
| `/coaches/clients/:id/overview` | GET | Client Detail |
| `/workout-plans` | POST | Workout Builder |
| `/workout-plans/:id/assign/:clientId` | POST | Client Detail |

### 4.11 Nutrition Specialist

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/nutrition-specialists/me/dashboard` | GET | NS Dashboard |
| `/nutrition/meal-plans` | POST/PATCH | Meal Plan Builder |
| `/nutrition/meal-plans/:id/assign/:clientId` | POST | Client meal assignment |

### 4.12 Admin / Super Admin

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/admin/metrics` | GET | Admin Dashboard |
| `/admin/users` | GET/PATCH | User management |
| `/admin/content/exercises` | POST/PATCH/DELETE | Exercise library CMS |
| `/super-admin/platform-metrics` | GET | Super Admin Dashboard |
| `/super-admin/config` | GET/PATCH | Platform config |

### 4.13 AI Generation

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/ai/generate-initial-plan` | POST | Onboarding Review |
| `/ai/generate-workout-plan` | POST | Plan (regenerate) |
| `/ai/generate-meal-plan` | POST | Nutrition (regenerate) |
| `/ai/jobs/:jobId` | GET | Generating (poll) |

**Polling strategy:** GET every 3s, max 120s, then show "still working" with cancel option.

### 4.14 Billing / Subscription

| Endpoint | Method | Screens |
|----------|--------|---------|
| `/billing/subscription` | GET | Subscription settings |
| `/billing/plans` | GET | Upgrade screen |
| `/billing/portal-session` | POST | Manage billing (Stripe portal) |
| `/billing/checkout-session` | POST | Upgrade flow |
| `/billing/webhook` | POST | Stripe webhook (server-side only) |

---

## 5. Component System Plan

### 5.1 Shared UI (mobile + web)

| Component | Props | Used In | Notes |
|-----------|-------|---------|-------|
| `PrimaryButton` | `label, onClick, loading, disabled, variant` | All CTAs | Orange fill, dark text |
| `TextInput` | `label, value, onChange, error, type` | All forms | |
| `PasswordInput` | extends TextInput | Auth forms | Show/hide toggle |
| `Toast` | `message, type` | All error/success | Sonner-based |
| `LoadingSkeleton` | `width, height, variant` | All data screens | Pulse animation |
| `ErrorPanel` | `message, onRetry` | All async screens | |
| `EmptyState` | `title, description, ctaLabel, onCta, icon` | Lists with no data | |
| `Avatar` | `src, name, size` | Profile, Chat, Clients | Fallback to initials |
| `Chip` | `label, selected, onPress` | Filters, tags | |
| `MacroBar` | `protein, carbs, fats, calories` | Nutrition, Dashboard | |
| `ProgressRing` | `value, max, color, label` | Dashboard, Nutrition | |

### 5.2 Mobile-Only Components

| Component | Props | Used In | Notes |
|-----------|-------|---------|-------|
| `MobileShell` | `children, showNav, showBack` | All mobile screens | Safe area, bottom nav |
| `BottomNav` | `activeTab, onTabChange` | Main app | 5 tabs |
| `AuthShell` | `children, title, subtitle` | Auth screens | |
| `OnboardingShell` | `children, step, totalSteps` | Onboarding | Progress indicator |
| `DashboardHero` | `userName, greeting, streak` | Dashboard | |
| `StatCard` | `label, value, unit, icon, trend` | Dashboard | |
| `WorkoutCard` | `day, name, exercises, duration, completed` | Dashboard, Plan | |
| `ExerciseCard` | `name, muscleGroup, equipment, gifUrl, sets` | Library, Workout Day | |
| `ActiveExerciseCard` | `exercise, currentSet, onLogSet` | Active Workout | |
| `SetLogger` | `setNumber, previousWeight, onSubmit` | Active Workout | |
| `RestTimer` | `duration, onComplete` | Active Workout | |
| `GifPreviewFrame` | `url, autoPlay, loop` | Exercise Detail | |
| `MealCard` | `meal, macros, eaten, onPress` | Nutrition, Dashboard | |
| `WaterTracker` | `consumed, target, onAdd` | Dashboard, Nutrition | |
| `ProgressChart` | `data, range, metric` | Progress | Recharts-based |
| `MetricCard` | `label, value, change, unit` | Progress | |
| `ChatBubble` | `message, isOwn, timestamp` | Messages | |
| `ReminderCard` | `title, time, days, enabled, onToggle` | Notifications | |
| `SubscriptionCard` | `plan, renewDate, features` | Subscription | |

### 5.3 Web-Only Components

| Component | Props | Used In | Notes |
|-----------|-------|---------|-------|
| `WebShell` | `children, sidebar` | All web screens | |
| `Sidebar` | `role, activeRoute` | All coach/admin | |
| `ClientCard` | `client, lastActive, plan, onOpen` | Coach Clients | |
| `AdminMetricCard` | `label, value, delta, chart` | Admin Dashboard | |
| `WorkoutBuilderCanvas` | `days, exercises, onChange` | Coach Builder | Drag-and-drop |
| `MealPlanBuilder` | `days, meals, onChange` | NS Builder | |
| `DataTable` | `columns, rows, onSort, onFilter` | Admin user table | |

### 5.4 Accessibility Notes

- All interactive elements: `aria-label` required
- Focus trap in modals (Radix Dialog handles this)
- Color contrast: orange on dark passes AA at font-size ≥ 14px
- RTL support: use `dir="rtl"` on root when locale is Arabic; CSS `logical` properties preferred

---

## 6. Design System Rules

### Colors

```css
/* Dark mode (default) */
--background: #020B14;       /* deep navy */
--foreground: #F5F7FA;       /* near-white text */
--primary: #FF751F;          /* orange CTA */
--primary-foreground: #020B14;
--secondary: #17324A;        /* cool-blue border/card edge */
--muted: #0D1F2D;            /* card background */
--accent: #06B6D4;           /* cyan accent */
--destructive: #EF4444;      /* error red */
--border: #17324A;

/* Light mode */
--background: #FFFFFF;
--foreground: #111827;
--primary: #FF6A00;
--muted: #F3F4F6;
--border: #E5E7EB;
```

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | `Inter, system-ui, sans-serif` | Body, UI |
| `--font-heading` | `Inter` (700) | Screen titles |
| Base size | 16px | |
| Heading 1 | 28px / 700 | Screen titles |
| Heading 2 | 22px / 600 | Section headers |
| Body | 16px / 400 | Default text |
| Caption | 12px / 400 | Metadata, labels |
| Button | 16px / 500 | All CTAs |

### Spacing

Base unit = 4px. Common values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Chips, badges |
| `--radius` | 12px | Cards, inputs |
| `--radius-lg` | 16px | Modals, bottom sheets |
| `--radius-xl` | 24px | Hero cards |
| `--radius-full` | 9999px | Avatars, pills |

### Shadows

```css
--shadow-card: 0 2px 12px rgba(0,0,0,0.3);
--shadow-modal: 0 8px 40px rgba(0,0,0,0.6);
```

### Navigation

- Mobile: Bottom tab bar (5 tabs: Home, Plan, Nutrition, Progress, Profile)
- Web: Left sidebar with role-specific nav items
- Mobile safe areas: `env(safe-area-inset-bottom)` on bottom nav

---

## 7. Codex Implementation Phases

### Phase 0 — Repository Safety

**Objective:** Protect the working production app before any changes.

**Steps:**
1. `git checkout main && git pull`
2. `git checkout -b backup/pre-fadifit-redesign`
3. `git push origin backup/pre-fadifit-redesign`
4. `git checkout -b feature/fadifit-redesign`
5. Audit `package.json` — document current deps
6. Run test suite — record baseline pass rate

**Files involved:** All  
**Test checklist:** All existing tests pass  
**Commit message:** `chore: create backup branch before redesign`  
**Rollback:** `git checkout backup/pre-fadifit-redesign`

---

### Phase 1 — Codebase Audit

**Objective:** Map existing routes, APIs, auth, roles, data flows.

**Steps:**
1. List all route definitions (`find . -name "*.router.*" -o -name "routes.*"`)
2. List all API endpoint files
3. Document auth middleware and role guards
4. List all environment variables
5. Document database schema or ORM models
6. Note any feature flags

**Output:** `docs/audit.md` with full map  
**Files involved:** `src/routes/`, `src/api/`, `src/middleware/`, `src/models/`  
**Commit message:** `docs: codebase audit before redesign`

---

### Phase 2 — Route and Design Mapping

**Objective:** Map every Figma screen to a production route.

**Steps:**
1. For each screen in Section 2 of this guide, confirm the production route exists
2. If route is missing, note it for creation
3. Map each screen's backend dependencies from Section 4
4. Flag any API endpoints that don't exist yet

**Output:** `docs/screen-route-map.md`  
**Commit message:** `docs: screen-to-route mapping`

---

### Phase 3 — Auth and Onboarding Shell

**Objective:** Replace auth/onboarding UI with Figma design; preserve real auth.

**Screens:** Splash, Language Select, Welcome, Sign In, Sign Up, Forgot/Reset Password, all Onboarding steps, Generating

**Implementation steps:**
1. Install any new UI deps if needed (should already have tailwind, lucide-react, motion)
2. Rebuild `Splash.tsx` — add auth check with `GET /auth/me`
3. Rebuild `Welcome.tsx` — brand logo top, text, dual CTA
4. Rebuild `SignIn.tsx` — connect to `POST /auth/login`, store JWT, role redirect
5. Rebuild `SignUp.tsx` — connect to `POST /auth/register`
6. Rebuild Forgot/Reset password screens
7. Rebuild all 6 onboarding step screens — each `PATCH /users/me/profile` on Next
8. Rebuild `Generating.tsx` — poll `GET /ai/jobs/:jobId` every 3s
9. Update `AuthContext` to use real JWT (not localStorage mock)
10. Add token refresh interceptor to all API calls

**Data dependencies:** `POST /auth/login`, `POST /auth/register`, all onboarding PATCH, AI job poll  
**Must NOT touch:** Role routing logic, existing dashboard components  
**Test checklist:**
- [ ] Sign in with real credentials → correct role dashboard
- [ ] Sign up → onboarding → plan generation → dashboard
- [ ] Expired token → redirect to sign in
- [ ] Forgot password email sent
- [ ] Reset password link works

**Commit message:** `feat(auth): redesign auth and onboarding shell with real API`  
**Rollback:** Revert to Phase 0 backup branch

---

### Phase 4 — Member Dashboard

**Objective:** Rebuild Dashboard with real data from `GET /members/me/dashboard`.

**Screens:** Dashboard

**Implementation steps:**
1. Create `useDashboard` hook calling `GET /members/me/dashboard`
2. Implement loading skeleton for each card section
3. Implement error panel with retry
4. Rebuild `DashboardHero` with real user name and streak
5. Rebuild `StatCard` row (calories, workouts, weight trend)
6. Rebuild today's workout card with real plan data
7. Rebuild meal summary cards
8. Rebuild water tracker (GET/POST)
9. Add progress badges from real completion data

**Data dependencies:** `GET /members/me/dashboard`, `GET /members/me/streak`, `GET /members/me/water`  
**Test checklist:**
- [ ] Dashboard loads with real data
- [ ] Loading skeletons show during fetch
- [ ] Error state with retry works
- [ ] Water log persists

**Commit message:** `feat(dashboard): connect member dashboard to real API`

---

### Phase 5 — Workout Flow

**Objective:** Rebuild workout plan, active workout, exercise library.

**Screens:** Plan, Workout Day, Active Workout, Workout Complete, Exercise Library, Exercise Detail

**Implementation steps:**
1. Create `useWorkoutPlan` hook → `GET /members/me/workout-plans/active`
2. Rebuild `Plan.tsx` with real week calendar and day cards
3. Rebuild `WorkoutDetail.tsx` with real exercises per day
4. Rebuild `ActiveWorkout.tsx`:
   - Start: `POST /workout-logs`
   - Log set: `PATCH /workout-logs/:logId/sets`
   - Rest timer (local state)
   - Dropset toggle
   - Persist state to `sessionStorage` to survive background
5. Rebuild `WorkoutComplete.tsx` with real summary data
6. Rebuild `ExerciseLibrary.tsx` — paginated search with real data
7. Rebuild `ExerciseDetail.tsx` — GIF/video from real URL

**Data dependencies:** All workout endpoints from Section 4.4 and 4.5  
**Test checklist:**
- [ ] Full workout flow start to complete
- [ ] Sets persist if app is backgrounded
- [ ] Exercise search returns real results
- [ ] GIF previews load
- [ ] Previous performance shown in set logger

**Commit message:** `feat(workout): connect workout flow to real API`

---

### Phase 6 — Nutrition, Progress, Reminders

**Screens:** Nutrition, Meal Detail, Progress, Add Progress, Notification Settings

**Implementation steps:**
1. Create `useNutrition` hook → `GET /members/me/nutrition/today`
2. Rebuild `Nutrition.tsx` with real macro ring and meal cards
3. Rebuild `MealDetail.tsx` with real food breakdown
4. Create `useProgress` hook → `GET /members/me/progress`
5. Rebuild `Progress.tsx` with Recharts line chart on real data
6. Rebuild `AddProgress.tsx` → `POST /members/me/progress`
7. Rebuild `NotificationsSettings.tsx` → real reminders CRUD
8. Register push token on startup → `POST /users/me/push-token`

**Test checklist:**
- [ ] Macro ring reflects real daily targets
- [ ] Meal eaten state persists
- [ ] Progress chart shows last 30 days
- [ ] Reminders toggle persists

**Commit message:** `feat(nutrition-progress): connect nutrition and progress to real API`

---

### Phase 7 — Settings, Profile, Billing

**Screens:** Settings, Personal Info, Goals, Subscription

**Implementation steps:**
1. Rebuild `PersonalInfo.tsx` → PATCH profile
2. Rebuild `GoalsPreferences.tsx` → PATCH goals
3. Rebuild `Subscription.tsx`:
   - Show real plan from `GET /billing/subscription`
   - "Manage" button → `POST /billing/portal-session` → redirect to Stripe portal
   - Gate premium features on subscription status
4. Language setting → persist to profile + i18n context

**Test checklist:**
- [ ] Profile edits persist after reload
- [ ] Stripe portal opens on manage click
- [ ] Free tier users see upgrade prompt on premium features

**Commit message:** `feat(settings): connect settings and billing to real API`

---

### Phase 8 — Web Public Auth and Dashboards

**Objective:** Rebuild web-facing auth screens and base dashboard shells.

**Screens:** Web Sign In, Web Sign Up, Web Dashboard (member landing)

**Implementation steps:**
1. Create responsive web shell with sidebar
2. Rebuild web auth pages (larger layout, desktop-optimized)
3. Rebuild web member dashboard

**Test checklist:**
- [ ] Web auth works on 1280px+ viewport
- [ ] Sidebar shows correct nav for role
- [ ] Mobile and web auth share same API logic

**Commit message:** `feat(web): rebuild web auth and dashboard shells`

---

### Phase 9 — Coach, Nutrition Specialist, Admin Flows

**Screens:** Coach Dashboard, Client List, Client Detail, Workout Builder, NS Dashboard, Meal Plan Builder, Admin Dashboard, Super Admin Dashboard

**Implementation steps:**
1. Build coach shell with client list and detail
2. Implement workout builder drag-and-drop
3. Build NS meal plan builder
4. Build admin user management table
5. Build super admin platform metrics

**Test checklist:**
- [ ] Coach can assign workout to client
- [ ] NS can create and assign meal plan
- [ ] Admin can deactivate user
- [ ] Role guards prevent wrong-role access

**Commit message:** `feat(coach-admin): implement coach, NS, and admin flows`

---

### Phase 10 — AI Generation UX Polish

**Screens:** Generating, AI generation prompts in Plan / Nutrition

**Implementation steps:**
1. Add progress animation to Generating screen
2. Implement real job polling with visual steps
3. Add "Regenerate" buttons to Plan and Nutrition screens
4. Handle AI job failure gracefully

**Test checklist:**
- [ ] Job polling shows incremental progress
- [ ] Failure shows actionable error message
- [ ] Regenerate creates new job and polls

**Commit message:** `feat(ai): polish AI generation UX with real job polling`

---

### Phase 11 — Responsive QA and Final Cleanup

**Objective:** Test all breakpoints, fix regressions, final polish.

**Steps:**
1. Test all screens at 320px, 375px, 390px, 430px, 768px, 1280px
2. Test RTL Arabic layout
3. Run Lighthouse performance audit
4. Fix any a11y violations
5. Remove all mock data and `TODO` comments
6. Final design token pass (ensure consistency)

**Commit message:** `chore(qa): responsive QA and final cleanup`

---

## 8. Codex-Ready Prompts

### Phase 3 Prompt (Auth & Onboarding)

```
Repo: https://github.com/basiltxu/fadifit-app.git
Branch: feature/fadifit-redesign
Scope: Rebuild all auth and onboarding screens to match the Figma design prototype.
     Connect to real backend APIs. Do NOT use mock auth or localStorage for tokens.

Files to inspect:
  - src/routes/ (find auth route definitions)
  - src/contexts/AuthContext.* or equivalent
  - src/pages/auth/ or src/screens/auth/
  - src/api/ (find existing API client setup)

Rules:
  1. Keep all existing role-routing logic intact
  2. JWT must be stored in httpOnly cookie or secure memory, NOT localStorage
  3. Every form must show loading state on submit and error state on failure
  4. Onboarding must PATCH /users/me/profile on each step
  5. Generating screen must poll GET /ai/jobs/:jobId every 3 seconds
  6. Do NOT change global theme tokens
  7. Do NOT delete any existing passing tests
  8. Do NOT touch dashboard or post-auth screens

What not to touch:
  - Any dashboard, plan, nutrition, progress screens
  - Backend/API files
  - Database models or migrations
  - CI/CD config

Verification commands:
  npm run lint && npm run test && npm run build

Expected output:
  - All auth and onboarding screens rebuilt with Figma design
  - Real API calls wired up
  - All existing tests still passing
  - Build succeeds

Commit boundaries:
  One commit per screen group (auth, onboarding, generating)
```

### Phase 4 Prompt (Dashboard)

```
Repo: https://github.com/basiltxu/fadifit-app.git
Branch: feature/fadifit-redesign
Scope: Rebuild the member Dashboard screen with real API data from GET /members/me/dashboard.

Files to inspect:
  - src/pages/Dashboard.* or equivalent
  - src/api/memberApi.*
  - src/hooks/useDashboard.*

Rules:
  1. Create a useDashboard() hook that calls GET /members/me/dashboard
  2. Show loading skeletons during fetch (one per card section)
  3. Show error panel with retry button on fetch failure
  4. All displayed values must come from API response, not hardcoded
  5. Water log must call POST /members/me/water
  6. Do NOT change auth or routing logic

What not to touch:
  - Auth context or token handling
  - Any non-Dashboard screens
  - Backend/API files

Verification commands:
  npm run lint && npm run test && npm run build

Expected output:
  Dashboard fully connected to real API with proper loading/error/empty states.
  Commit message: "feat(dashboard): connect member dashboard to real API"
```

*(Repeat this pattern for Phases 5–11 by substituting scope, files, rules, and verification.)*

---

## 9. GitHub Issue Plan

### Issue 1: Auth Shell Redesign

**Title:** `[Phase 3] Redesign auth and onboarding shell — connect to real API`  
**Labels:** `ui`, `auth`, `phase-3`, `priority-high`  
**Description:** Replace mock auth with real JWT flow. Rebuild all auth and onboarding screens to match Figma design.  
**Acceptance criteria:**
- [ ] Sign in with real credentials works
- [ ] JWT stored securely (not localStorage)
- [ ] Onboarding PATCHes real profile
- [ ] AI plan generation job is polled until complete
- [ ] All existing tests pass

**Files likely involved:** `src/pages/auth/`, `src/contexts/AuthContext.*`, `src/api/`  
**Dependencies:** Phase 0, Phase 1  
**Priority:** P0

---

### Issue 2: Member Dashboard — Real Data

**Title:** `[Phase 4] Connect member dashboard to real API`  
**Labels:** `ui`, `member`, `phase-4`, `priority-high`  
**Acceptance criteria:**
- [ ] Dashboard loads real user data
- [ ] Loading skeletons present
- [ ] Error state with retry
- [ ] Water log persists

**Dependencies:** Issue 1 (auth must be real)  
**Priority:** P0

---

### Issue 3: Workout Flow — Real Data

**Title:** `[Phase 5] Connect full workout flow to real API`  
**Labels:** `ui`, `workout`, `phase-5`, `priority-high`  
**Acceptance criteria:**
- [ ] Full workout start → log sets → complete flow works
- [ ] Exercise library loads from real catalogue
- [ ] GIF previews load from real URLs
- [ ] Workout log persisted to backend

**Dependencies:** Issues 1, 2  
**Priority:** P0

---

### Issue 4: Nutrition and Progress — Real Data

**Title:** `[Phase 6] Connect nutrition and progress to real API`  
**Labels:** `ui`, `nutrition`, `progress`, `phase-6`  
**Priority:** P1

---

### Issue 5: Settings and Billing

**Title:** `[Phase 7] Connect settings and Stripe billing`  
**Labels:** `ui`, `billing`, `phase-7`  
**Acceptance criteria:**
- [ ] Stripe portal opens on manage click
- [ ] Premium features gated by subscription status

**Priority:** P1

---

### Issue 6: Coach and Admin Flows

**Title:** `[Phase 9] Build coach, nutrition specialist, and admin flows`  
**Labels:** `ui`, `coach`, `admin`, `phase-9`  
**Priority:** P2

---

### Issue 7: AI Generation UX

**Title:** `[Phase 10] Polish AI generation with real job polling`  
**Labels:** `ui`, `ai`, `phase-10`  
**Priority:** P2

---

### Issue 8: Responsive QA

**Title:** `[Phase 11] Responsive QA — all breakpoints and RTL`  
**Labels:** `qa`, `a11y`, `phase-11`  
**Priority:** P2

---

## 10. QA Checklist

### Auth Flows
- [ ] Sign in: valid credentials → correct role dashboard
- [ ] Sign in: wrong password → error toast, no redirect
- [ ] Sign in: expired token → silent refresh, no visible interruption
- [ ] Sign up: new account → onboarding → plan generation → dashboard
- [ ] Forgot password: email sent toast
- [ ] Reset password: new password accepted → sign in

### Role Routing
- [ ] Member token → member dashboard only
- [ ] Coach token → coach dashboard
- [ ] Admin token → admin dashboard
- [ ] Wrong-role URL → 403 or redirect

### Workout Flow
- [ ] Start workout → log all sets → complete → summary shown
- [ ] Rest timer counts down, sound/haptic on complete
- [ ] Dropset toggle adds extra sets
- [ ] Background then foreground → state preserved
- [ ] Accidental back → confirm dialog

### Exercise Library
- [ ] Search returns relevant results
- [ ] Filter by muscle group works
- [ ] GIF plays on detail screen
- [ ] No GIF → skeleton placeholder, not broken image

### Nutrition Flow
- [ ] Macro ring matches today's logged intake
- [ ] Mark meal eaten → ring updates
- [ ] Water intake increments and persists

### AI Generation
- [ ] Generating screen polls until job complete
- [ ] Progress animation visible
- [ ] Job failure → actionable error message
- [ ] Regenerate creates new job

### Billing Flow
- [ ] Free user → premium feature → upgrade prompt shown
- [ ] Upgrade → Stripe checkout loads
- [ ] Post-upgrade → premium features unlocked
- [ ] Manage billing → Stripe portal opens

### Responsive — Mobile
- [ ] 320px: no horizontal scroll, no clipped text
- [ ] 375px: iPhone SE layout
- [ ] 390px: iPhone 14 Pro (primary target)
- [ ] 430px: iPhone 14 Pro Max

### Responsive — Web
- [ ] 768px: tablet layout
- [ ] 1280px: desktop with sidebar

### RTL (Arabic)
- [ ] Text is right-aligned
- [ ] Back arrow points left → right in RTL
- [ ] No broken layouts in forms or cards
- [ ] Exercise names remain in English

### Expo / Native (if applicable)
- [ ] iOS build succeeds
- [ ] Android build succeeds
- [ ] Push notifications received
- [ ] Camera/photo permissions for avatar upload

### Accessibility
- [ ] All buttons have `aria-label`
- [ ] Color contrast ≥ AA
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces workout progress

---

## 11. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Real backend endpoints differ from assumed paths | High | High | Audit in Phase 1 before writing any UI code |
| AI job API doesn't exist yet | Medium | Medium | Build UI with graceful fallback to manual plan setup |
| Stripe billing env vars missing | Medium | High | Document required env vars in Phase 7 kickoff |
| RTL layout regressions | Medium | Medium | RTL smoke test after each phase |
| Performance regression on mobile | Low | Medium | Lighthouse audit in Phase 11 |
| Role guards bypassed after redesign | Low | High | Automated role-routing test suite in Phase 3 |
| Data loss on workout log write failure | Medium | High | Optimistic local state + retry queue |

---

## 12. Recommended First Phase

**Start with Phase 0 (backup) → Phase 1 (audit) → Phase 3 (auth).**

Rationale:
- Auth is the foundation every other screen depends on
- Replacing mock auth with real JWT is the highest-risk change — do it first when the codebase is clean
- Phase 1 audit will surface any API path mismatches before you write UI code
- The audit only takes a few hours and prevents days of wrong assumptions

**First commit message for Codex:** `chore: backup branch + Phase 1 audit report`

---

*Document generated: 2026-05-21. Update after each phase is complete.*
