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
- `/students/new` is protected and renders `src/pages/students/AddStudentPage.tsx`.
- The Students / Leads page and global topbar `Add student` actions now link to the manual lead creation route.
- `AddStudentPage` now renders inside `AppShell` as a full-page manual lead creation workflow:
  - Basic profile fields for name, email, phone, and current country.
  - Required acquisition-source selection for Facebook, Instagram, website, WhatsApp, phone call, walk-in, referral, education fair, spreadsheet import, or other.
  - Optional campaign/referral reference and source notes.
  - Destination-country choices, program interest, and study level.
  - Budget range, currency, target intake, scholarship interest, and visa priority.
  - Academic qualification and English-test information.
  - Initial lead status, advisor assignment, and internal notes.
  - Required-fields, source-handling, and post-creation guidance sidebar.
  - Responsive Add student actions in the page header and mobile sticky action bar.
  - Working cancel navigation back to Students / Leads.
- Telegram leads remain system-created records with Telegram as their source; this page is for staff entry of leads acquired through other channels.
- Add Student UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- The current Add Student submit behavior is development-only and returns to `/students` without persisting a lead.
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
- `/schools` is protected and renders `src/pages/schools/SchoolsPage.tsx`.
- `SchoolsPage` now renders inside `AppShell` as the school directory operations workspace using clearly fictional API-shaped mock data:
  - Page header with Add school and Export directory actions.
  - Summary cards for total schools, active records, partner schools, and linked programs.
  - Search by school name, city, or country.
  - Working client-side filters for country, city, school type, and partner status.
  - Responsive horizontal school records table.
  - Table columns include school name, location, type, partner status, program count, visa friendliness score, last updated, and actions.
  - Partner, prospect, non-partner, active, and inactive record states.
  - Program count links and edit/disable action scaffolding.
  - Empty state with a working Clear filters action.
  - Pagination controls are present as UI scaffolding.
- Schools UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- `/schools/new` is protected and renders `src/pages/schools/AddSchoolPage.tsx`.
- The Schools directory `Add school` action now links to the dedicated school creation page.
- `AddSchoolPage` now renders inside `AppShell` as a full-page school creation workflow:
  - Required school name, school type, city, and country fields.
  - Record status and school description.
  - Website, admissions email, and phone contact fields.
  - Street address and postal code fields.
  - Partner status, partner-since date, and relationship manager fields.
  - Visa friendliness score, visa notes, and reputation notes.
  - Required-fields checklist and post-creation program guidance sidebar.
  - Responsive Add school actions in the page header and mobile sticky action bar.
  - Working cancel navigation back to the Schools directory.
- Add School UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- The current Add School submit behavior is development-only and returns to `/schools` without persisting a school.
- `/schools/:schoolId` is protected and renders `src/pages/schools/SchoolDetailPage.tsx`.
- School names and edit actions in the Schools directory now link to the school detail route.
- `SchoolDetailPage` now renders inside `AppShell` as a school record workspace using clearly fictional API-shaped mock data:
  - Back link to the Schools directory.
  - School header with active status, partner status, school ID, Edit school, and Update status actions.
  - Summary cards for school type, location, active programs, and visa friendliness score.
  - School profile and record metadata.
  - Contact and website information.
  - Registered location details.
  - Partner status, relationship manager, and partner-since information.
  - Visa friendliness score and internal assessment notes.
  - Internal reputation notes.
  - Related programs table with level, tuition, intake, deadline, and scholarship status.
  - Add program and view-all-programs action scaffolding.
- School Detail UI uses the reusable `Card`, `Badge`, and `Button` components and follows the internal operations design direction.
- `/schools/:schoolId/edit` is protected and renders `src/pages/schools/EditSchoolPage.tsx`.
- The School Detail `Edit school` action now links to the dedicated school edit page.
- `EditSchoolPage` now renders inside `AppShell` as a full-page school editing workflow using prefilled API-shaped mock data:
  - School profile fields for name, type, record status, and description.
  - Contact fields for website, admissions email, and phone.
  - Location fields for address, city, country, and postal code.
  - Partnership fields for partner status, partner-since date, and relationship manager.
  - Internal assessment fields for visa friendliness score, visa notes, and reputation notes.
  - Record summary and related-program guidance sidebar.
  - Cancel navigation back to School Detail.
  - Responsive Save changes actions in the page header and mobile sticky action bar.
- School editing uses a dedicated page instead of a modal because the record contains multiple operational sections.
- Edit School UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- The current Edit School submit behavior is development-only and returns to the School Detail page without persisting changes.
- `src/components/forms/ProgramForm.tsx` provides the reusable program create/edit form foundation.
- `ProgramForm` supports two school-assignment modes while preserving one field and payload contract:
  - Fixed-school mode supplies a hidden `schoolId` and shows the school as read-only.
  - Select-school mode requires the user to choose a school and submits the selected `schoolId`.
- `ProgramForm` also accepts optional initial values so the same component supports create and edit workflows without duplicating fields.
- `/schools/:schoolId/programs/new` is protected and renders `src/pages/programs/AddProgramPage.tsx`.
- The School Detail `Add program` action now links to the school-scoped program creation route.
- `AddProgramPage` now renders inside `AppShell` as a school-scoped program creation workflow:
  - The parent school is fixed and displayed as read-only context.
  - Program name, study level, category, and duration fields.
  - Tuition amount, currency, and scholarship availability fields.
  - Intake-period checkboxes, primary intake year, and application deadline.
  - Academic and English entry requirements.
  - Internal operational notes.
  - School summary sidebar with location, current program count, and record status.
  - Ownership guidance explaining that the new program belongs to the school and will appear in the global Programs directory.
  - Working cancel navigation back to School Detail.
- Add Program UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- The current Add Program submit behavior is development-only and returns to School Detail without persisting a program.
- `/programs` is protected and renders `src/pages/programs/ProgramsPage.tsx`.
- `ProgramsPage` now renders inside `AppShell` as the global program directory using clearly fictional API-shaped mock data:
  - Summary cards for total programs, study levels, scholarship options, and upcoming deadlines.
  - Working client-side search by program name, school, or category.
  - Working filters for country, school, study level, maximum tuition, intake, and scholarship availability.
  - Responsive horizontal program records table.
  - Table columns include program name, school, country, level, tuition and currency, intake periods, deadline, scholarship, and action.
  - School names link to their associated School Detail route.
  - Program level, intake, and scholarship badges support fast scanning.
  - Empty state with a working Clear filters action.
  - Pagination controls are present as UI scaffolding.
  - Global Add program, sorting, and row edit actions are present as UI scaffolding.
- Programs UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- `/programs/:programId` is protected and renders `src/pages/programs/ProgramDetailPage.tsx`.
- Program names in both the global Programs directory and the School Detail related-programs table now link to the same shared Program Detail route.
- `ProgramDetailPage` now renders inside `AppShell` as the single program record view regardless of where the user opens it:
  - Program header with active status, study level, program ID, Edit program, and Update status actions.
  - Summary cards for study level, tuition, duration, and next deadline.
  - Program profile and record metadata.
  - Linked school ownership card with navigation to School Detail.
  - Intake periods and application deadline.
  - Tuition and scholarship information.
  - Academic and English entry requirements.
  - Internal operational notes.
- Program Detail UI uses the reusable `Card`, `Badge`, and `Button` components and follows the internal operations design direction.
- `/programs/:programId/edit` is protected and renders `src/pages/programs/EditProgramPage.tsx`.
- The Program Detail `Edit program` action and Programs directory row edit actions now link to the same shared Program Edit route.
- `EditProgramPage` reuses `ProgramForm` with prefilled API-shaped mock data:
  - Program name, level, category, and duration.
  - Current school ownership with the option to select another school.
  - Tuition, currency, and scholarship availability.
  - Intake periods, primary intake year, and application deadline.
  - Academic and English requirements.
  - Internal operational notes.
  - Record summary, school-ownership guidance, and directory-impact sidebar.
  - Working cancel navigation back to Program Detail.
- Program editing updates the same conceptual program record regardless of whether it was opened from School Detail or the global Programs directory.
- The current Edit Program submit behavior is development-only and returns to Program Detail without persisting changes.
- `/conversations` is protected and renders `src/pages/conversations/ConversationsPage.tsx`.
- `ConversationsPage` now renders inside `AppShell` as the Telegram conversation operations queue using clearly fictional API-shaped mock data:
  - Summary cards for active, escalated, unassigned, and resolved conversations.
  - Working search by student, student ID, AI summary, or extracted filter.
  - Working status tabs for All, Active, Escalated, Resolved, and Unassigned.
  - Working advisor filter.
  - Conversation rows with student identity, unread count, status, message count, AI-generated summary, and extracted-filter badges.
  - Assigned-advisor state, latest activity, conversation start date, and Open action scaffolding.
  - Empty state with a working Clear filters action.
  - Pagination and latest-activity sorting controls are present as UI scaffolding.
- Conversations UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- `/conversations/:conversationId` is protected and renders `src/pages/conversations/ConversationDetailPage.tsx`.
- The Conversations queue `Open` action now links to the conversation detail route.
- `ConversationDetailPage` now renders inside `AppShell` as a Telegram conversation review workspace using clearly fictional API-shaped mock data:
  - Back link to the Conversations queue.
  - Conversation header with student name, active status, conversation ID, Escalate, and Mark resolved actions.
  - Full message history with distinct student, AI-agent, and advisor message styling.
  - Advisor reply composer UI scaffold.
  - Student contact card with navigation to Student Detail.
  - AI-generated conversation summary.
  - AI-extracted filter badges.
  - Advisor assignment selector.
  - Conversation metadata for message count, start date, and latest activity.
- Conversation Detail UI uses the reusable `Card`, `Badge`, and `Button` components and follows the internal operations design direction.
- `/recommendations` is protected and renders `src/pages/recommendations/RecommendationsPage.tsx`.
- `RecommendationsPage` now renders inside `AppShell` as the global recommendation review workspace using clearly fictional API-shaped mock data:
  - Summary cards for generated recommendations, shortlisted options, strong matches, and missing requirements.
  - Working search by student, school, or program.
  - Working student and country filters.
  - Recommendation records grouped with student identity, school, program, country, tuition, and generation time.
  - Overall fit score and score breakdown for program, budget, intake, and visa factors.
  - Recommendation reasons and missing-requirement indicators.
  - Navigation to Student Detail, School Detail, and Program Detail.
  - Working local shortlist toggles.
  - Working two-recommendation comparison selection and comparison panel.
  - Empty state with a working Clear filters action.
  - Pagination and score-sorting controls are present as UI scaffolding.
- Recommendations UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- The sidebar Admin section now includes Team, Advisors, and Settings.
- The sidebar workspace description now includes team access management alongside operational and advisor workflows.
- `/team` is protected and renders `src/pages/team/TeamPage.tsx`.
- `TeamPage` now renders inside `AppShell` as the internal account-management directory using clearly fictional API-shaped mock data:
  - Summary cards for total team members, active accounts, pending invitations, and disabled accounts.
  - Working search by name, email, or user ID.
  - Working role and account-status filters.
  - Team-member table with role, account status, last login, invitation date, and account actions.
  - Working row meatball menu that closes on outside click or Escape.
  - Shared account actions for viewing an account and editing its role and permissions.
  - Status-aware actions: resend or cancel an invitation, disable an active account, or activate a disabled account.
  - Row actions are UI scaffolding until the Team detail route and backend endpoints are connected.
  - Empty state with a working Clear filters action.
  - Pagination controls are present as UI scaffolding.
  - Role summaries distinguish Admin, Advisor, and Operations responsibilities.
  - Invite team member action navigates to the protected `/team/invite` workflow.
- Team UI uses the reusable `Card`, `Badge`, `Button`, and `Input` components and follows the internal operations design direction.
- `/team/invite` is protected and renders `src/pages/team/InviteTeamMemberPage.tsx`.
- `InviteTeamMemberPage` provides:
  - Required full name and work email fields, with an optional phone number.
  - Role selection for Admin, Advisor, and Operations.
  - A dynamic permission summary for the selected role.
  - Clear invitation-state and account-activation guidance.
  - No password input; the invited member sets their own password through the secure email link.
  - Desktop header actions and a responsive mobile action bar.
- The invitation submission is UI scaffolding that returns to Team until `POST /api/team/invitations` is connected.
- `/team/:memberId` is protected and renders `src/pages/team/TeamMemberDetailPage.tsx`.
- `TeamMemberDetailPage` provides an account-focused view separate from advisor workload:
  - Internal identity, work email, phone number, user ID, role, status, and last login.
  - Invitation sender, sent date, acceptance state, account creation date, and last update.
  - Role-based permission visibility for Admin, Advisor, and Operations accounts.
  - Recent invitation, access, and authentication activity.
  - Status-aware controls to resend an invitation, disable an active account, or activate a disabled account.
  - Clear password-security guidance without exposing or collecting another user's password.
- Team row actions now navigate to the member detail page and its role-and-permissions section.
- Team member detail actions are UI scaffolding until `GET /api/team/:userId`, `PATCH /api/team/:userId`, and `PATCH /api/team/:userId/status` are connected.
- `/team/:memberId/edit` is protected and renders `src/pages/team/EditTeamMemberPage.tsx`.
- `EditTeamMemberPage` provides:
  - Prefilled full name, work email, and optional phone fields.
  - Role selection for Admin, Advisor, and Operations accounts.
  - Role-aware permission checkboxes with a live selected-permission summary.
  - Read-only account status, user ID, current role, and last-login context.
  - No password or account-status fields; passwords remain private and access status stays a separate explicit action.
  - Cancel and development-only save behavior returning to the member detail page.
- Team Detail `Edit account` and `Edit permissions` actions, plus the Team row menu, now navigate to the shared account edit page.
- `/programs/new` is protected and renders `src/pages/programs/GlobalAddProgramPage.tsx`.
- The Programs page `Add program` action now links to the global program creation route.
- `GlobalAddProgramPage` reuses `ProgramForm` with a required school selector:
  - The user selects the parent school before submitting.
  - All remaining program fields are shared with the school-scoped Add Program workflow.
  - The sidebar explains school ownership and global directory visibility.
  - Cancel navigation returns to the Programs directory.
- The current global Add Program submit behavior is development-only and returns to `/programs` without persisting a program.
- The current sign-in submit flow is development-only:
  - prevents default form submission
  - writes `development-token` to `localStorage` as `token`
  - navigates to `/`

Verification status:

- `npx tsc --noEmit` passes after the reusable UI layer, dashboard shell, sidebar, topbar, mobile navigation, profile menu, and dashboard page changes.
- `npx tsc --noEmit` passes after the Students / Leads page and `/students` route changes.
- `npx tsc --noEmit` passes after the Add Student page and `/students/new` route changes.
- `npx tsc --noEmit` passes after the Student Detail page and `/students/:studentId` route changes.
- `npx tsc --noEmit` passes after the Schools page and `/schools` route changes.
- `npx tsc --noEmit` passes after the Add School page and `/schools/new` route changes.
- `npx tsc --noEmit` passes after the School Detail page and `/schools/:schoolId` route changes.
- `npx tsc --noEmit` passes after the Edit School page and `/schools/:schoolId/edit` route changes.
- `npx tsc --noEmit` passes after the reusable Program form and `/schools/:schoolId/programs/new` route changes.
- `npx tsc --noEmit` passes after the Programs page and `/programs` route changes.
- `npx tsc --noEmit` passes after the Program Detail page and `/programs/:programId` route changes.
- `npx tsc --noEmit` passes after the Edit Program page, reusable form prefilling, and `/programs/:programId/edit` route changes.
- `npx tsc --noEmit` passes after the shared Program form modes and `/programs/new` route changes.
- `npx tsc --noEmit` passes after the Conversations page and `/conversations` route changes.
- `npx tsc --noEmit` passes after the Conversation Detail page and `/conversations/:conversationId` route changes.
- `npx tsc --noEmit` passes after the Recommendations page and `/recommendations` route changes.
- `npx tsc --noEmit` passes after the Team page, sidebar navigation, and `/team` route changes.
- `npm run build` passes and produces the Vite production build in `dist`.
- `npm run lint` currently fails because ESLint is not configured with a TypeScript parser/plugin. The failure is a tooling configuration issue, not specific to the new UI components; existing TSX syntax such as `main.tsx` and `ProtectedRoute.tsx` also fails to parse.

Known next steps:

- Replace the development-only login behavior with a real auth API call.
- Add authenticated user state and logout handling.
- Replace dashboard mock data with TanStack Query-backed API data when backend endpoints are ready.
- Replace Students / Leads mock data with TanStack Query-backed API data when backend endpoints are ready.
- Connect Add Student to `POST /api/students` and persist acquisition source metadata.
- Replace Student Detail mock data with TanStack Query-backed API data when backend endpoints are ready.
- Replace Schools mock data with TanStack Query-backed API data when backend endpoints are ready.
- Connect Add School to `POST /api/schools`.
- Replace School Detail mock data with TanStack Query-backed API data when backend endpoints are ready.
- Connect Edit School to the school detail query and `PATCH /api/schools/:id`.
- Connect Add Program to `POST /api/programs` with the route school ID supplied as `schoolId`.
- Replace Programs mock data with TanStack Query-backed API data when backend endpoints are ready.
- Replace Program Detail mock data with a TanStack Query-backed `GET /api/programs/:id` request.
- Connect Edit Program to the program detail query and `PATCH /api/programs/:id`.
- Replace Conversations mock data with TanStack Query-backed API data when backend endpoints are ready.
- Replace Conversation Detail mock data with a TanStack Query-backed `GET /api/conversations/:id` request.
- Replace Recommendations mock data with TanStack Query-backed recommendation API data when backend endpoints are ready.
- Replace Team mock data with TanStack Query-backed team API data when backend endpoints are ready.
- Make Students / Leads search, filters, sorting, and pagination stateful once API query parameters are available.
- Add form validation and API loading, success, and error states to Add Student.
- Make Student Detail actions functional once advisor assignment, status update, notes, recommendations, and conversation endpoints are available.
- Make Schools add, export, sorting, pagination, program navigation, edit, and status actions functional once backend endpoints are available.
- Add form validation and API loading, success, and error states to Add School.
- Make School Detail edit, status, external website, and program actions functional once backend endpoints and forms are available.
- Add form validation and API loading, success, and error states to Edit School.
- Add form validation and API loading, success, and error states to Add Program.
- Connect global Add Program to `POST /api/programs` using the selected `schoolId`.
- Add form validation and API loading, success, and error states to Edit Program.
- Make Programs sorting and pagination functional once API query parameters are available.
- Make Conversations sorting, pagination, advisor assignment, and status actions functional once backend endpoints are available.
- Make Conversation Detail reply, advisor assignment, escalation, and resolution actions functional once backend endpoints are available.
- Make Recommendations shortlist, comparison persistence, sorting, and pagination functional once backend endpoints are available.
- Connect `InviteTeamMemberPage` to `POST /api/team/invitations` with validation, loading, success, and error states.
- Connect `TeamMemberDetailPage` to `GET /api/team/:userId`.
- Connect `EditTeamMemberPage` profile, role, and permission changes to `PATCH /api/team/:userId`.
- Connect Team invitation resend/cancel and account activation/disable actions when backend endpoints are available.
- Make Team pagination functional once API query parameters are available.
- Add Advisors page at `src/pages/advisors/AdvisorsPage.tsx`.
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

## Package Status

### Installed and Currently Used

Runtime packages:

- `react` - component rendering, hooks, and application UI.
- `react-dom` - mounts the React application in the browser.
- `react-router-dom` - routes, protected-page navigation, links, route parameters, and redirects.
- `lucide-react` - interface icons used throughout the dashboard.

Build and development packages:

- `vite` - development server and production build tool.
- `typescript` - static typing and `tsc --noEmit` verification.
- `tailwindcss` - utility-first styling used across all pages and components.
- `@tailwindcss/vite` - integrates Tailwind CSS with Vite.
- `@vitejs/plugin-react` - React support for Vite.
- `eslint` - JavaScript/TypeScript lint command runner, although TypeScript parsing is not fully configured yet.
- `@eslint/js` - base ESLint JavaScript rules.
- `eslint-plugin-react-hooks` - React Hooks lint rules.
- `eslint-plugin-react-refresh` - Vite React Fast Refresh lint rules.
- `globals` - browser global definitions for ESLint.
- `@types/react` and `@types/react-dom` - React TypeScript declarations.
- `@types/node` - Node.js type declarations available for build/configuration files.

### Installed but Not Yet Integrated

- `@tanstack/react-query` - intended for API fetching, caching, loading states, error states, and query invalidation once backend integration starts.
- `axios` - intended for the shared API client and authenticated HTTP requests.
- `react-hook-form` - intended to replace the current native development-only form handling.
- `zod` - intended for form schemas, API payload validation, and typed validation errors.
- `zustand` - available for lightweight authentication or shared client state, but should only be used when local state or React Context is insufficient.

These packages should not be imported only because they are installed. They should be introduced when the related API, validation, or shared-state work begins.

### Not Installed but Needed

Immediate planned additions:

- `@hookform/resolvers` - connects Zod schemas to React Hook Form through `zodResolver`.
- `typescript-eslint` - provides the TypeScript parser and ESLint rules required to lint `.ts` and `.tsx` files correctly.

Expected installation:

```bash
npm install @hookform/resolvers
npm install --save-dev typescript-eslint
```

### Testing Packages Not Yet Installed

These are recommended when automated component and workflow tests are introduced:

- `vitest` - unit and component test runner compatible with Vite.
- `jsdom` - browser-like DOM environment for tests.
- `@testing-library/react` - React component testing utilities.
- `@testing-library/jest-dom` - DOM-focused assertions.
- `@testing-library/user-event` - realistic user interaction simulation.

Expected installation when test work begins:

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Optional Packages Not Currently Required

- `shadcn/ui`, Radix UI, and Headless UI are not installed.
- The current reusable UI layer is custom-built, so these libraries should only be added if a future component requires their accessibility or interaction primitives.
- A separate Tailwind class-conflict package such as `tailwind-merge` is not currently required. The existing `cn` helper only removes falsy class values and joins class names.

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

- Manage advisor workload and student assignment.

Features:

- View assigned students.
- View workload.
- View availability.
- View specializations.
- Review follow-ups.

### Team Page

Purpose:

- Manage all internal user accounts separately from advisor workload.

User roles:

- Admin.
- Advisor.
- Operations staff.

Features:

- Invite team member.
- Select role.
- View invitation and account status.
- Edit profile and permissions.
- Activate or disable an account.
- Resend an invitation.
- Review last login.

Account flow:

1. Admin invites a team member using their name, email, and role.
2. The backend creates an account with `invited` status.
3. The team member receives an invitation link.
4. The team member sets their own password.
5. The account becomes active.
6. The team member signs in through the shared login page.

Administrators must not create, store, or view another team member's password.

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
        AddStudentPage.tsx
        StudentDetailPage.tsx
      schools/
        SchoolsPage.tsx
        AddSchoolPage.tsx
        SchoolDetailPage.tsx
        EditSchoolPage.tsx
      programs/
        ProgramsPage.tsx
        AddProgramPage.tsx
        GlobalAddProgramPage.tsx
        ProgramDetailPage.tsx
        EditProgramPage.tsx
      conversations/
        ConversationsPage.tsx
        ConversationDetailPage.tsx
      recommendations/
        RecommendationsPage.tsx
      team/
        TeamPage.tsx
        InviteTeamMemberPage.tsx
        TeamMemberDetailPage.tsx
        EditTeamMemberPage.tsx
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
      teamApi.ts
      advisorsApi.ts

    hooks/
      useAuth.ts
      useStudents.ts
      useSchools.ts
      usePrograms.ts
      useRecommendations.ts
      useTeam.ts

    store/
      authStore.ts

    types/
      auth.ts
      student.ts
      school.ts
      program.ts
      conversation.ts
      recommendation.ts
      user.ts
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

GET    /api/team
POST   /api/team/invitations
POST   /api/team/invitations/:id/resend
GET    /api/team/:userId
PATCH  /api/team/:userId
PATCH  /api/team/:userId/status

GET    /api/advisors
POST   /api/advisors
PATCH  /api/advisors/:id
```

## Frontend Data Models

### User

```ts
type User = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'advisor' | 'operations';
  status: 'invited' | 'active' | 'disabled';
  permissions?: string[];
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
};
```

All internal users authenticate through the same login page. Role and permissions determine which records and actions they can access.

An advisor may also have an advisor-specific profile linked through `userId` for workload, availability, specializations, and student assignments.

### Student

```ts
type Student = {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  source?: string;
  sourceReference?: string;
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
  +--> Team
  |       |
  |       +--> Invite Team Member
  |       +--> Team Member Detail
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
- Team list and invitation flow.
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
12. Build Team account and invitation management.
13. Build advisor workload and assignment views.
14. Add advisor assignment and status updates.
15. Add loading, empty, and error states.
16. Add form validation.
17. Add final responsive polish.

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
Team
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
