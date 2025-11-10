-- Add examType column to ExamResult table
-- Note: Check your actual table name in Supabase (might be lowercase)
ALTER TABLE "ExamResult"
ADD COLUMN IF NOT EXISTS "examType" TEXT DEFAULT 'opera';

-- If above fails, try lowercase:
-- ALTER TABLE "examresult" ADD COLUMN IF NOT EXISTS "examType" TEXT DEFAULT 'opera';

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS "ExamResult_examType_idx" ON "ExamResult"("examType");

-- Update existing records (if any) to 'opera'
UPDATE "ExamResult" SET "examType" = 'opera' WHERE "examType" IS NULL;
