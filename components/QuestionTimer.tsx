'use client'

// Dummy component - no time limit, just accepts props for compatibility
interface QuestionTimerProps {
  duration?: number
  isActive?: boolean
  onTimeUp?: () => void
}

export default function QuestionTimer(_props: QuestionTimerProps) {
  return null
}
