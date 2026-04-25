# Company Assessment App

A full-stack web application that collects company information through a multi-step assessment wizard and enables AI-powered policy generation via a chatbot interface.

## Tech Stack

- **Next.js 14** (App Router)
- **JavaScript**
- **CSS**
- **Prisma ORM**
- **SQLite**
- **Groq API**

## Steps to run the app

### 1. Clone this repo
https://github.com/beingfajer/naseh-assessment



make sure to run the following under the root folder
### 2. Install dependencies

npm install

### 3. Set up environment variables

for the content of .env file contact fajer, we're not advice to push any .env file


### 4. Set up the database

npx prisma migrate dev
npx prisma generate

### 5. Run the development server

npm run dev

## API Endpoints (tested using Postman)

### Assessment

#### GET /api/assessment
fetches the existing company assessment - no body required

#### POST /api/assessment
creates a new company assessment.
the database generates a string id (assessmentId), copy it bc we'll need it for the other endpoints 

#### PUT /api/assessment
updates an existing assessment. and here assessment id must be passed to the body

for example:
{
  "id": "cmocu6box0006rriar8ylq0fm",
  .
  .
  .
}

#### DELETE /api/assessment
deletes the assessment and all related data (shareholders, messages, policies) due to cascading deletes. also here assessment id must be passed to the body

for example:
{
  "id": "cmocu6box0006rriar8ylq0fm"
}

### Chat

#### POST /api/chat
sends a user message to the AI and saves both the user message and AI reply to the database.

the AI uses the company assessment data as context to answer questions.

> **policy trigger:** if the message contains the words `"policy"`, `"generate"`, or `"create a policy"`, the AI response is automatically saved as a policy in the Policy table as well.

**body:**
{
  "assessmentId": "cmocu6box0006rriar8ylq0fm",
  "content": "What regulations should my flower company follow in Qatar?"
}

**response:**
returns the saved AI message object:
{
  "id": "cmocuok0y000hrria2nkkvdwd",
  "role": "assistant",
  "content": "As a flower company in Qatar, Bloom & Co should follow...",
  "assessmentId": "cmocu6box0006rriar8ylq0fm",
  "createdAt": "2026-04-24T11:51:54.466Z"
}

### Messages

#### GET /api/messages?assessmentId={assessmentId}
fetches the full chat history for a given assessment, ordered oldest to newest.

**query param:** `assessmentId` (required)

**response:**
 array of message objects:
[
  {
    "id": "...",
    "role": "user",
    "content": "What regulations should I follow?",
    "assessmentId": "cmocu6box0006rriar8ylq0fm",
    "createdAt": "2026-04-24T11:51:54.466Z"
  },
  {
    "id": "...",
    "role": "assistant",
    "content": "As a flower company in Qatar...",
    "assessmentId": "cmocu6box0006rriar8ylq0fm",
    "createdAt": "2026-04-24T11:51:54.466Z"
  }
]

### Policy

#### GET /api/policy?assessmentId=YOUR_ID
fetches all saved policies for a given assessment, ordered newest first.

> **note:** Policies are auto-generated when a chat message triggers the policy keyword. See POST /api/chat above.

**query param:** `assessmentId` (required)

**response:**
 array of policy objects:

[
  {
    "id": "...",
    "title": "Policy — 4/24/2026",
    "content": "# Privacy Policy\n\n...",
    "assessmentId": "...",
    "createdAt": "2026-04-24T11:51:54.466Z",
    "updatedAt": "2026-04-24T11:51:54.466Z"
  }
]

## Features
- *Multi-step Assessment Wizard*:  collects company name, email, location, shareholders and their percentages, and primary business activity through a guided step-by-step form with validation
- *Smart Entry Point*: if the user has already completed the assessment, they are taken directly to the chat instead of seeing the wizard again
- *Edit & Delete Assessment*: users can update their company information or delete it entirely and restart from scratch
- *AI Chatbot**: a ChatGPT-like chat interface where the AI uses the company assessment as context to answer questions about regulations, compliance, and business advice
- *Persistent Chat History*: all messages are saved to the database and loaded on every visit so the conversation is never lost
- *Policy Generation*: when the user asks the AI to generate a policy, it is automatically saved to the database and appears in the Policy page
- *Policy Editor*: users can view, edit the title and content of, and delete any generated policy
- *Repository Pattern*: clean separation between API routes and database logic using a dedicated repository layer
- *Typing Indicator*: animated dots appear while the AI is generating a response
- *Sidebar Navigation*: consistent navigation between Chat and Policies across all pages
