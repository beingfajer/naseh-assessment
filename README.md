# Company Assessment App

A full-stack web application that collects company information through a multi-step assessment wizard and enables AI-powered policy generation via a chatbot interface.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
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

## Assessment

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


## Features

- TBL