# School Finder Frontend - Project Context

## Project Overview

This frontend is the internal admin dashboard for the School Finder AI Agent project. The wider system helps a relocation/education company recommend schools to students through a Telegram AI agent.

The frontend is used by company staff, advisors, and admins to manage schools, programs, student leads, conversations, advisor assignments, and recommendation outcomes.

The Telegram bot is the student-facing interface. This frontend is the company-facing operations interface.

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

