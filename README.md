# CampusLMS — GEC Madhubani / BEU CSE (IoT)

Working prototype for Government Engineering College Madhubani, Bihar Engineering University, B.Tech CSE (IoT), Semester I.

## Role-based workflows
- Student: academic dashboard, real syllabus reference, structured Resource Vault, assignments, question practice, records, certificates, support and notifications.
- CR: class announcements, assignments, attendance, support/issues, polls and notification center.
- Faculty: faculty-specific courses, assignment creation/evaluation, PDF preview, grading, similarity flags, Resource Vault publishing, analytics, attendance, schedules and notification webhooks.

## Structured Resource Vault
Every resource is stored as:
`Department > Semester > Subject > Module > Resource Type`

## Assignment Evaluation Engine
- Server-side deadline lockout at 23:59:59 IST on the deadline date.
- PDF/browser preview before submission.
- Persistent submission records.
- SHA-256 duplicate fingerprinting plus optional answer-text similarity detection.
- Faculty in-browser PDF preview and grade/feedback saving.

## Notification Webhooks
New assignments and newly published resources create notification outbox records. Optional Telegram Bridge, WhatsApp Bridge or Generic Webhook endpoints can be configured from the Notification Center.

The prototype does not include real college WhatsApp/Telegram credentials. A bridge URL must be supplied by the deployer before external messages are sent.

## Database
The prototype uses a persistent local JSON database at `server-data/data.json` with schema migration/normalization, atomic writes, assignment/resource/submission/notification records, and a health endpoint at `/api/database/health`.

## Official BEU syllabus reference
The UI links to the current Bihar Engineering University B.Tech syllabus portal for 2026 onwards:
https://beu-bih.ac.in/academics/Syllabus/B.Tech

The detailed local faculty/course mapping is clearly separated from the official university reference.

## Run
```bash
npm install
npm run dev
```

The API runs on `http://localhost:4000` and Vite uses the configured `/api` proxy.

## v10 Student UX / Information Architecture
- Student dashboard reorganized into a learning-platform style flow: Study Hub (Subjects, Syllabus, Resource Vault, Question Practice, Tests, Assignments) -> Continue Learning -> Deadlines & Classes -> Progress -> Community -> Academic Records/Certificates/Support.
- Removed the large CampusAI dashboard card and individual AI feature cards from the home screen.
- Added a single persistent CampusAI floating launcher in the lower-right corner. It provides Chat, AI Summary, Viva Practice, 30-Min Study Rescue and Exam Readiness without crowding the dashboard.
- Student Community redesigned with batch overview, discussion composer, study spaces, live feed, likes and comments.
- The redesign is inspired by common information architecture patterns visible in current learning platforms such as Physics Wallah and Unacademy: study content grouped by course/subject, practice/tests grouped together, planner/progress kept near learning flow, and AI exposed as an assistant entry point rather than a large dashboard block.
