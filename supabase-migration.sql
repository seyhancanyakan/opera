-- Opera Exam System - Supabase Migration
-- Run this in Supabase SQL Editor

-- Create Student table
CREATE TABLE IF NOT EXISTS "Student" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "schoolNo" TEXT UNIQUE NOT NULL,
  "hasCompleted" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ExamResult table
CREATE TABLE IF NOT EXISTS "ExamResult" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "studentId" UUID NOT NULL REFERENCES "Student"("id") ON DELETE CASCADE,
  "score" INTEGER NOT NULL,
  "totalQuestions" INTEGER DEFAULT 20,
  "correctAnswers" INTEGER DEFAULT 0,
  "startTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  "endTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  "timeSpent" INTEGER NOT NULL,
  "violations" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "answers" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Question table
CREATE TABLE IF NOT EXISTS "Question" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "order" INTEGER UNIQUE NOT NULL,
  "type" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "youtubeId" TEXT,
  "youtubeId2" TEXT,
  "question" TEXT NOT NULL,
  "options" JSONB NOT NULL,
  "correctAnswer" TEXT NOT NULL,
  "explanation" TEXT,
  "metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
  "timeLimit" INTEGER DEFAULT 120,
  "points" INTEGER DEFAULT 1,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Student_schoolNo_idx" ON "Student"("schoolNo");
CREATE INDEX IF NOT EXISTS "ExamResult_studentId_idx" ON "ExamResult"("studentId");
CREATE INDEX IF NOT EXISTS "ExamResult_createdAt_idx" ON "ExamResult"("createdAt");
CREATE INDEX IF NOT EXISTS "Question_order_idx" ON "Question"("order");
CREATE INDEX IF NOT EXISTS "Question_category_idx" ON "Question"("category");

-- Enable Row Level Security (RLS)
ALTER TABLE "Student" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ExamResult" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Question" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Students: Anyone can create/read own records
CREATE POLICY "Students can be created by anyone" ON "Student"
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can read their own record" ON "Student"
  FOR SELECT USING (true);

CREATE POLICY "Students can update their own record" ON "Student"
  FOR UPDATE USING (true);

-- ExamResults: Anyone can create, but only read own results
CREATE POLICY "Anyone can create exam results" ON "ExamResult"
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read exam results" ON "ExamResult"
  FOR SELECT USING (true);

-- Questions: Anyone can read
CREATE POLICY "Anyone can read questions" ON "Question"
  FOR SELECT USING (true);

CREATE POLICY "Service role can insert questions" ON "Question"
  FOR INSERT WITH CHECK (true);

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updatedAt
CREATE TRIGGER update_student_updated_at BEFORE UPDATE ON "Student"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_question_updated_at BEFORE UPDATE ON "Question"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
