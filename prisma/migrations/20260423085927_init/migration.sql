-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyLocation" TEXT NOT NULL,
    "primaryActivity" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Shareholder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "percentage" REAL NOT NULL,
    "assessmentId" TEXT NOT NULL,
    CONSTRAINT "Shareholder_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Policy_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
