# SRS - Mini Startup Incubation Portal

## 1. Purpose

The Mini Startup Incubation Portal is a web-based platform designed to facilitate student
entrepreneurship by enabling students to submit startup ideas, form teams, seek mentorship,
and track mentoring sessions. This system aims to streamline startup incubation activities within a
campus environment.

## 2. Scope

The system will support three user roles: students, mentors, and administrators. Features
include idea submission, team management, mentorship session tracking, messaging, and
administrative controls.

## 3. Functional Requirements + Acceptance Criteria

### FR1: User registration with role selection

- **Requirement:** The system shall allow users to register with role selection.
- **Acceptance Criteria:**
  - Registration form validates email format.
  - Password must be at least 8 characters.
  - Role ∈ {student, mentor, admin}.
  - Successful registration saves data in DB and returns confirmation.

### FR2: Authentication on login

- **Requirement:** The system shall authenticate users during login.
- **Acceptance Criteria:**
  - Correct credentials log in successfully.
  - Incorrect credentials show error (401 Unauthorized).
  - Session token/JWT is generated on success.

### FR3: Student submits startup idea

- **Requirement:** Students shall submit startup ideas with title, description, domain, and pitch file.
- **Acceptance Criteria:**
  - Form validates required fields.
  - File size ≤ 5 MB.
  - Idea saved with status `pending`.

### FR4: Idea stored with status pending

- **Requirement:** Submitted ideas shall be stored with status `pending` for approval.
- **Acceptance Criteria:**
  - Database entry created with `status = pending`.
  - Only admin can update status.

### FR5: Admin approves/rejects idea

- **Requirement:** Admins shall approve or reject submitted startup ideas.
- **Acceptance Criteria:**
  - Admin dashboard lists pending ideas.
  - Admin can click "approve" or "reject".
  - Status changes to `approved` or `rejected` in DB.

### FR6: Student sends request to join team

- **Requirement:** Students shall send requests to join existing startup teams.
- **Acceptance Criteria:**
  - Request stored in DB with status `pending`.
  - Duplicate requests not allowed.

### FR7: Startup owner accepts/rejects join request

- **Requirement:** Startup owners shall accept or reject team join requests.
- **Acceptance Criteria:**
  - Owner sees pending requests in dashboard.
  - Accept adds student to team.
  - Reject updates request status.

### FR8: Mentor views assigned startups

- **Requirement:** Mentors shall view startups assigned to them.
- **Acceptance Criteria:**
  - Mentor dashboard lists assigned startups.
  - Mentor can click and view startup details.

### FR9: Mentor logs mentorship sessions

- **Requirement:** Mentors shall log mentorship sessions with date, notes, and next steps.
- **Acceptance Criteria:**
  - Session form requires date + notes.
  - Entry saved in DB linked to startup.
  - Students can view logged sessions.

### FR10: Student–mentor messaging

- **Requirement:** Students and mentors shall exchange messages via messaging module.
- **Acceptance Criteria:**
  - Messages stored in DB with sender + receiver.
  - Messages displayed in chronological order.
  - Real-time or refreshed view updates messages.

### FR11: Admin manages users

- **Requirement:** Admin shall manage users (add/edit/delete).
- **Acceptance Criteria:**
  - Admin dashboard lists all users.
  - Admin can edit user role, delete account.
  - Changes reflect immediately in DB.
