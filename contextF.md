# School Finder Frontend - Project Context

## Project Overview

This frontend is the internal admin dashboard for the School Finder AI Agent project. The wider system helps a relocation/education company recommend schools to students through a Telegram AI agent.

The frontend is used by company staff, advisors, and admins to manage schools, programs, student leads, conversations, advisor assignments, and recommendation outcomes.

The Telegram bot is the student-facing interface. This frontend is the company-facing operations interface.

## Current Implementation Status

The project has been scaffolded as a Vite + React + TypeScript frontend with React Router configured.

Implemented so far:

- App-level routing is centralized in `src/routes/index.tsx`.
- `src/App.tsx` renders the route tree through `AppRoutes`.
- `/login` renders `src/pages/auth/LoginPage.tsx`.
- `/` is protected and renders `src/pages/dashboard/DashboardPage.tsx` only through `src/routes/ProtectedRoute.tsx`.
- `ProtectedRoute` checks `localStorage.getItem('token')`.
- If no token exists, protected routes redirect to `/login` using React Router's `Navigate`.
- The sign-in page has been built with the School Finder AI visual direction:
  - neutral background
  - white bordered sign-in panel
  - brand color `#045A58`
  - email and password inputs
  - lucide-react icons
  - submit button with brand styling
- A small reusable UI layer has been started in `src/components/ui`:
  - `Button`
  - `Input`
  - `Card`
  - `Badge`
- Shared class name composition lives in `src/utils/cn.ts`.
- `LoginPage` now uses the reusable `Button`, `Input`, and `Card` components.
- The dashboard shell has been started:
  - `src/components/layout/AppShell.tsx` provides the protected dashboard layout wrapper.
  - `src/components/layout/Sidebar.tsx` provides the desktop sidebar navigation.
  - The sidebar uses the School Finder AI brand color, white surface, light border, rounded active states, lucide-react icons, and navigation groups for Overview, Operations, and Admin.
  - Sidebar navigation includes Dashboard, Students, Schools, Programs, Conversations, Recommendations, Advisors, and Settings.
  - Mobile sidebar navigation is implemented as an off-canvas drawer with a backdrop, close button, and automatic close on navigation item selection.
  - `src/components/layout/Topbar.tsx` provides the dashboard topbar.
  - The topbar includes global search, an Add student quick action, notification button, staff profile control, and a mobile menu trigger.
  - The staff profile control is a profile/account menu, not a role selector.
  - The current profile menu uses mock authenticated-user data (`Amina Yusuf`, `Admin`) and includes View profile, Account settings, and Sign out menu actions.
  - On mobile, the profile menu remains visible as a compact initials button; on desktop it shows the full user name, role, initials, and chevron.
  - User name, role, initials, and sign-out behavior should later come from the real authentication state/API.
  - The topbar uses a white background, bottom border, compact height, and restrained dashboard styling.
- `DashboardPage` now renders inside `AppShell` as a fuller operations dashboard using API-shaped mock data:
  - KPI cards for total student leads, new leads today, awaiting assignment, and active conversations.
  - Lead pipeline summary by status.
  - Assignment queue progress.
  - Top destination countries.
  - Advisor workload summary.
  - Pending follow-ups.
  - Recently recommended schools table.
  - Dashboard actions for report export and lead review.
- Dashboard UI uses the reusable `Card`, `Badge`, and `Button` components and follows the internal operations design direction.
- `/students` is protected and renders `src/pages/students/StudentsPage.tsx`.
- `StudentsPage` now renders inside `AppShell` as the Students / Leads operations workspace using API-shaped mock data:
  - Page header for Students / Leads with Add student and Saved views actions.
  - Lead summary cards for total leads, new today, awaiting advisor, and follow-up due.
  - Lead workspace card with search by name, email, phone, country, or program.
  - Filters for destination country, lead status, and assigned advisor.
  - Sort control for latest activity.
  - Responsive horizontal table for student leads.
  - Table columns include student name, destination, program interest, budget, intake, status, assigned advisor, last activity, and action.
  - Status badges distinguish New, Awaiting assignment, Assigned, Follow-up, and Application started.
  - Lead source badges distinguish Telegram and Manual entries.
  - Pagination controls are present as UI scaffolding.
- Students / Leads UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- `/students/:studentId` is protected and renders `src/pages/students/StudentDetailPage.tsx`.
- The Students / Leads table `Open` action now links to the student detail route.
- `StudentDetailPage` now renders inside `AppShell` as a CRM-style student record using API-shaped mock data:
  - Back link to Students / Leads.
  - Student header with status, student ID, assign advisor action, and refresh recommendations action.
  - Basic profile card with email, phone, student ID, and assigned advisor.
  - Application status workflow card.
  - Destination, program, budget, and intake summary cards.
  - Relocation preferences.
  - Academic background.
  - AI-extracted filters.
  - Recommended schools table with fit score, reasons, and missing requirements.
  - Conversation summary.
  - Shortlisted schools.
  - Advisor notes list and note-entry UI scaffold.
- Student Detail UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- The current sign-in submit flow is development-only:
  - prevents default form submission
  - writes `development-token` to `localStorage` as `token`
  - navigates to `/`

Verification status:

- `npx tsc --noEmit` passes after the reusable UI layer, dashboard shell, sidebar, topbar, mobile navigation, profile menu, and dashboard page changes.
- `npx tsc --noEmit` passes after the Students / Leads page and `/students` route changes.
- `npx tsc --noEmit` passes after the Student Detail page and `/students/:studentId` route changes.
- `npm run build` passes and produces the Vite production build in `dist`.
- `npm run lint` currently fails because ESLint is not configured with a TypeScript parser/plugin. The failure is a tooling configuration issue, not specific to the new UI components; existing TSX syntax such as `main.tsx` and `ProtectedRoute.tsx` also fails to parse.

Known next steps:

- Replace the development-only login behavior with a real auth API call.
- Add authenticated user state and logout handling.
- Replace dashboard mock data with TanStack Query-backed API data when backend endpoints are ready.
- Replace Students / Leads mock data with TanStack Query-backed API data when backend endpoints are ready.
- Replace Student Detail mock data with TanStack Query-backed API data when backend endpoints are ready.
- Make Students / Leads search, filters, sorting, and pagination stateful once API query parameters are available.
- Make Student Detail actions functional once advisor assignment, status update, notes, recommendations, and conversation endpoints are available.
- Add Schools list page at `src/pages/schools/SchoolsPage.tsx`.
- Continue expanding the reusable UI layer with table, select, textarea, page header, loading, and empty states.
- Fix ESLint TypeScript support by adding the TypeScript ESLint parser/plugin or the current `typescript-eslint` flat config package.
- Add loading and error states around authentication once the backend is connected.

## Frontend Purpose

The frontend should help the company:

- Manage school and program data.
- Review student leads collected from Telegram.
- View student preferences and AI-extracted filters.
- See recommended schools for each student.
- Review Telegram conversation history.
- Assign students to advisors.
- Track application progress.
- Maintain a clean operational workflow for relocation support.

## Recommended Tech Stack

- Vite
- React
- TypeScript
- React Router
- TanStack Query for API data fetching and caching
- Axios or Fetch API for HTTP requests
- Tailwind CSS for styling
- React Hook Form for forms
- Zod for form validation
- Zustand or React Context for lightweight client state
- Lucide React for icons

Optional UI libraries:

- shadcn/ui
- Radix UI
- Headless UI

## Design Direction

The dashboard should feel like a practical internal operations tool, not a marketing website.

Design priorities:

- Clear navigation.
- Dense but readable information.
- Fast scanning of leads, schools, and conversations.
- Simple forms for editing data.
- Tables, filters, tabs, and status badges.
- Minimal decorative visuals.
- Consistent spacing and typography.
- Mobile-friendly where possible, but desktop should be the priority.

Avoid:

- Landing page style hero sections.
- Large marketing cards.
- Heavy gradients.
- Decorative background blobs.
- Overly playful styling.

## Main User Roles

### Admin

Can:

- Manage schools.
- Manage programs.
- Manage advisors.
- View all students.
- View all conversations.
- Assign leads.
- Manage system data.

### Advisor

Can:

- View assigned students.
- Review conversations.
- View recommendations.
- Update student status.
- Add notes.
- Request follow-up.

### Operations Staff

Can:

- Import or update school data.
- Review incomplete records.
- Track application progress.

## Core Pages

### Login Page

Purpose:

- Authenticate internal users.

Fields:

- Email.
- Password.

Actions:

- Login.
- Store auth token securely.
- Redirect to dashboard.

### Dashboard Page

Purpose:

- Show high-level company activity.

Widgets:

- Total student leads.
- New leads today.
- Leads awaiting advisor assignment.
- Active conversations.
- Top destination countries.
- Recently recommended schools.
- Pending follow-ups.

### Students / Leads Page

Purpose:

- List students collected from Telegram and manual entry.

Features:

- Search by name, email, phone, country, or program.
- Filter by destination country.
- Filter by status.
- Filter by assigned advisor.
- Sort by latest activity.
- Open student detail page.

Table columns:

- Student name.
- Destination.
- Program interest.
- Budget.
- Intake.
- Status.
- Assigned advisor.
- Last activity.

### Student Detail Page

Purpose:

- Show complete student context.

Sections:

- Basic profile.
- Relocation preferences.
- Academic background.
- Budget and intake.
- English test status.
- AI-extracted filters.
- Recommended schools.
- Shortlisted schools.
- Conversation summary.
- Advisor notes.
- Application status.

Actions:

- Assign advisor.
- Update status.
- Add internal note.
- Generate or refresh recommendations.
- Mark for follow-up.

### Schools Page

Purpose:

- Manage school records.

Features:

- Search schools.
- Filter by country, city, type, partner status.
- Add school.
- Edit school.
- View programs under a school.
- Disable inactive schools.

Table columns:

- School name.
- Country.
- City.
- Type.
- Partner status.
- Program count.
- Visa friendliness score.
- Last updated.

### School Detail Page

Purpose:

- Show and edit one school.

Sections:

- School profile.
- Contact/website information.
- Location.
- Partner status.
- Ranking/reputation notes.
- Visa friendliness notes.
- Related programs.

Actions:

- Edit school.
- Add program.
- Update status.

### Programs Page

Purpose:

- Manage available programs/courses.

Features:

- Search by program name.
- Filter by country, school, level, tuition range, intake, scholarship availability.
- Add program.
- Edit program.

Table columns:

- Program name.
- School.
- Country.
- Level.
- Tuition.
- Currency.
- Intake periods.
- Deadline.
- Scholarship.

### Conversations Page

Purpose:

- Review Telegram conversations between students and the AI agent.

Features:

- List conversations.
- Filter by active, escalated, resolved, unassigned.
- View message history.
- View AI-generated summary.
- View extracted filters.
- Assign advisor.

### Recommendations Page

Purpose:

- Review generated recommendations.

Features:

- View recommendations by student.
- View score breakdown.
- View recommendation reasons.
- View missing requirements.
- Compare schools.
- Mark school as shortlisted.

### Advisors Page

Purpose:

- Manage company advisors.

Features:

- Add advisor.
- Edit advisor.
- Activate/deactivate advisor.
- View assigned students.
- View workload.

### Settings Page

Purpose:

- Manage operational settings.

Settings:

- Destination countries.
- Program categories.
- Study levels.
- Lead statuses.
- Application statuses.
- Recommendation scoring weights.

## Suggested Folder Structure

```text
school-finder-frontend/
  README.md
  contextF.md
  package.json
  vite.config.ts
  tsconfig.json
  .env.example

  public/

  src/
    main.tsx
    App.tsx

    assets/

    components/
      layout/
        AppShell.tsx
        Sidebar.tsx
        Topbar.tsx
      ui/
        Button.tsx
        Input.tsx
        Select.tsx
        Badge.tsx
        Modal.tsx
        Table.tsx
        Tabs.tsx
        EmptyState.tsx
        LoadingState.tsx
      forms/
        SchoolForm.tsx
        ProgramForm.tsx
        StudentNoteForm.tsx

    pages/
      auth/
        LoginPage.tsx
      dashboard/
        DashboardPage.tsx
      students/
        StudentsPage.tsx
        StudentDetailPage.tsx
      schools/
        SchoolsPage.tsx
        SchoolDetailPage.tsx
      programs/
        ProgramsPage.tsx
        ProgramDetailPage.tsx
      conversations/
        ConversationsPage.tsx
        ConversationDetailPage.tsx
      recommendations/
        RecommendationsPage.tsx
      advisors/
        AdvisorsPage.tsx
      settings/
        SettingsPage.tsx

    routes/
      index.tsx
      ProtectedRoute.tsx

    services/
      apiClient.ts
      authApi.ts
      studentsApi.ts
      schoolsApi.ts
      programsApi.ts
      conversationsApi.ts
      recommendationsApi.ts
      advisorsApi.ts

    hooks/
      useAuth.ts
      useStudents.ts
      useSchools.ts
      usePrograms.ts
      useRecommendations.ts

    store/
      authStore.ts

    types/
      auth.ts
      student.ts
      school.ts
      program.ts
      conversation.ts
      recommendation.ts
      advisor.ts

    utils/
      formatCurrency.ts
      formatDate.ts
      statusLabels.ts

    styles/
      globals.css
```

## API Integration

The frontend should communicate with the backend API using a shared API client.

Expected environment variable:

```text
VITE_API_BASE_URL=http://localhost:4000
```

Example API routes the frontend may consume:

```text
POST   /api/auth/login
GET    /api/auth/me

GET    /api/students
GET    /api/students/:id
PATCH  /api/students/:id

GET    /api/schools
POST   /api/schools
GET    /api/schools/:id
PATCH  /api/schools/:id
DELETE /api/schools/:id

GET    /api/programs
POST   /api/programs
GET    /api/programs/:id
PATCH  /api/programs/:id
DELETE /api/programs/:id

POST   /api/recommendations/search
GET    /api/recommendations/student/:studentId

GET    /api/conversations
GET    /api/conversations/:id

GET    /api/advisors
POST   /api/advisors
PATCH  /api/advisors/:id
```

## Frontend Data Models

### Student

```ts
type Student = {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  currentCountry?: string;
  destinationCountries: string[];
  preferredProgram?: string;
  studyLevel?: string;
  budgetMin?: number;
  budgetMax?: number;
  currency?: string;
  englishTestType?: string;
  englishTestScore?: string;
  targetIntake?: string;
  scholarshipInterest?: boolean;
  visaPriority?: boolean;
  status: string;
  assignedAdvisorId?: string;
  createdAt: string;
  updatedAt: string;
};
```

### School

```ts
type School = {
  id: string;
  name: string;
  country: string;
  city?: string;
  type?: string;
  website?: string;
  ranking?: string;
  partnerStatus?: string;
  visaFriendlinessScore?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
};
```

### Program

```ts
type Program = {
  id: string;
  schoolId: string;
  name: string;
  level: string;
  category?: string;
  tuitionAmount?: number;
  tuitionCurrency?: string;
  duration?: string;
  intakePeriods: string[];
  applicationDeadline?: string;
  scholarshipAvailable?: boolean;
  englishRequirement?: string;
  academicRequirement?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
```

### Recommendation

```ts
type Recommendation = {
  id: string;
  studentId: string;
  schoolId: string;
  programId: string;
  score: number;
  reasons: string[];
  missingRequirements: string[];
  createdAt: string;
};
```

## Authentication Flow

1. User logs in with email and password.
2. Backend returns access token and user profile.
3. Frontend stores token.
4. API client attaches token to protected requests.
5. Protected routes redirect unauthenticated users to login.
6. Logout clears token and user state.

## UI Flow

```text
Login
  |
  v
Dashboard
  |
  +--> Students
  |       |
  |       v
  |   Student Detail
  |       |
  |       +--> Recommendations
  |       +--> Conversation
  |       +--> Advisor Notes
  |
  +--> Schools
  |       |
  |       v
  |   School Detail
  |       |
  |       v
  |   Programs
  |
  +--> Conversations
  |
  +--> Advisors
  |
  +--> Settings
```

## MVP Frontend Scope

The first frontend version should include:

- Login page.
- Protected dashboard layout.
- Students list.
- Student detail page.
- Schools list.
- School create/edit form.
- Programs list.
- Program create/edit form.
- Conversation detail page.
- Recommendations section on student detail page.
- Basic advisor assignment.

## Recommended Development Order

1. Create Vite React TypeScript app.
2. Configure routing.
3. Build app shell with sidebar and topbar.
4. Add authentication state.
5. Add API client.
6. Build login page.
7. Build dashboard page.
8. Build students list and detail pages.
9. Build schools and programs pages.
10. Build conversations page.
11. Build recommendation display.
12. Add advisor assignment and status updates.
13. Add loading, empty, and error states.
14. Add form validation.
15. Add final responsive polish.

## Frontend Quality Requirements

- Use TypeScript types for all API data.
- Keep API calls inside service files or hooks.
- Avoid hardcoding backend URLs.
- Show loading states during API requests.
- Show useful empty states when no data exists.
- Handle API errors clearly.
- Keep forms validated.
- Keep dashboard pages readable on common laptop screens.
- Avoid unnecessary global state.
- Use reusable UI components for repeated controls.
- Keep components focused and easy to test.

## Example Admin Navigation

```text
Dashboard
Students
Schools
Programs
Conversations
Recommendations
Advisors
Settings
```

## Notes for Codex

- This is not a public landing page.
- Build the actual internal dashboard experience first.
- Prefer practical tables, filters, forms, and detail views.
- Use the backend API as the source of truth.
- Do not invent school facts in the frontend.
- Keep the frontend ready to connect to the separate backend repository.
- The frontend repository may be uploaded separately to GitHub.

# DESIGN CONTEXT
# Design System & UI Direction

## Product Design Philosophy

School Finder AI is an internal operations platform used by education advisors, relocation consultants, and administrative staff to manage students, schools, recommendations, and application workflows.

The interface should prioritize:

* Clarity over decoration
* Speed of navigation
* Information density without clutter
* Efficient operational workflows
* Readability and consistency
* Fast decision making

The product should feel like software users spend hours inside every day, not a marketing website.

Whenever there is a design decision between aesthetics and usability, prioritize usability.

---

## Brand Personality

School Finder AI should feel:

* Professional
* Trustworthy
* Organized
* Global
* Educational
* Data-driven
* Reliable

The interface should inspire confidence in both the data and the workflow.

The product should visually resemble a premium CRM, admissions management platform, or operational dashboard rather than a startup landing page.

---

## Visual Style

The visual language should resemble modern SaaS platforms such as:

* Linear
* Stripe Dashboard
* Mercury
* Ramp
* Brex
* Notion
* Attio

Design characteristics:

* Clean and minimal
* Modern enterprise aesthetics
* Soft neutral backgrounds
* White content surfaces
* Large rounded corners
* Subtle shadows
* Consistent spacing
* Strong visual hierarchy
* Minimal decorative elements

Avoid:

* Hero sections
* Marketing-style layouts
* Heavy gradients
* Decorative blobs
* Excessive animations
* Overly playful interfaces

---

## Brand Colors

### Primary Brand Color

#045A58

This is the primary visual identity color and should be used consistently throughout the application.

Use for:

* Primary buttons
* Active navigation states
* Selected tabs
* Focus states
* Charts and analytics
* KPI highlights
* Progress indicators
* Links
* Important actions

### Hover State

#034A48

### Light Brand Background

#E6F4F3

Use for:

* Active sidebar backgrounds
* Selected rows
* Informational badges
* Highlighted states

### Background

#F5F6F8

### Surface

#FFFFFF

### Border

#E5E7EB

### Primary Text

#111827

### Secondary Text

#6B7280

### Success

#16A34A

### Warning

#F59E0B

### Error

#DC2626

---

## Layout Principles

The application uses a dashboard shell layout.

Structure:

Sidebar → Topbar → Content Area

Desktop-first design.

The layout should maximize productivity and information visibility.

---

## Sidebar

The sidebar is the primary navigation system.

Characteristics:

* White background
* Fixed position on desktop
* Rounded navigation items
* Icon and label navigation
* Active state uses the brand color (#045A58)
* Clean spacing and visual grouping

Navigation should feel similar to the reference dashboard image.

---

## Topbar

Contains:

* Search
* Notifications
* User profile
* Quick actions

Characteristics:

* White background
* Bottom border
* Clean and compact
* Fixed height
* Minimal distractions

---

## Cards

Cards are the primary content container throughout the platform.

Card Style:

* White background
* Light border
* Soft shadow
* Rounded corners
* Clear content hierarchy

Cards should be used for:

* Metrics
* Analytics
* Student information
* Recommendations
* Forms
* Tables
* Workflow summaries

---

## Border Radius

Use a consistent radius system:

Small: 12px

Medium: 16px

Large: 20px

Extra Large: 24px

Avoid sharp corners.

---

## Typography

Font Family:

Inter

Weights:

* 400
* 500
* 600
* 700

Scale:

* Page Titles: 32px
* Section Titles: 24px
* Card Titles: 18px
* Body Text: 14px–16px
* Caption Text: 12px

Typography should feel calm, professional, and highly readable.

Avoid oversized marketing typography.

---

## Tables

Tables are a core part of the product.

Requirements:

* Search
* Filters
* Sorting
* Pagination
* Hover states
* Sticky headers when appropriate

Tables should prioritize operational efficiency and data visibility.

---

## Forms

Forms should be simple, predictable, and consistent.

Input characteristics:

* Comfortable height
* Clear labels
* Visible focus states
* Inline validation messages

Forms should feel fast and efficient for daily operational use.

---

## Status Badges

Status badges should be used extensively across students, applications, schools, recommendations, and workflows.

Examples:

* New
* Pending
* Assigned
* Completed
* Rejected
* Follow-up Required

Badges should be visually distinct while maintaining consistency with the overall design system.

---

## Dashboard Design

The dashboard should resemble a premium analytics and operations dashboard.

Use:

* KPI cards
* Analytics widgets
* Activity feeds
* Progress indicators
* Status summaries
* Workload overviews

The dashboard should be highly scannable.

Every widget should provide operational value.

Avoid decorative content that does not support decision making.

---

## Student Detail Experience

Student pages should feel similar to a CRM.

Display:

* Student profile
* Academic information
* Preferences
* Recommendations
* Conversation summaries
* Advisor notes
* Application progress
* Activity timeline

Users should understand a student's status within seconds.

---

## Spacing System

Use an 8px spacing scale.

Examples:

* 8px
* 16px
* 24px
* 32px
* 40px
* 48px

Maintain generous whitespace while preserving information density.

---

## Dashboard Inspiration

Use the attached dashboard reference image as inspiration for:

* Sidebar structure
* Widget layout
* Card styling
* Border radius
* Shadows
* Information hierarchy
* Overall spacing

However, all generated interfaces must use the School Finder AI brand color (#045A58) as the primary accent color.

The final result should feel like a premium education operations platform built specifically for managing student placement, school recommendations, and relocation workflows.
