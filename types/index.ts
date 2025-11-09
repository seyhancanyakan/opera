export interface Violation {
  questionId: string
  questionOrder: number
  type: 'face_lost' | 'face_turned_away' | 'tab_switch' | 'window_blur' | 'fullscreen_exit'
  timestamp: string
  autoSkipped: boolean
}

export interface Answer {
  questionId: string
  questionOrder: number
  selectedAnswer: string | null
  isCorrect: boolean
  skipped: boolean
  timeSpent: number
  violationOccurred: boolean
}

export interface ExamSession {
  studentId: string
  studentName: string
  schoolNo: string
  currentQuestionIndex: number
  answers: Answer[]
  violations: Violation[]
  startTime: string
  isActive: boolean
}

export interface ExamResult {
  id: string
  studentId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  startTime: string
  endTime: string
  timeSpent: number
  violations: Violation[]
  answers: Answer[]
}
