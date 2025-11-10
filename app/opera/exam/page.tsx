'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import QuestionTimer from '@/components/QuestionTimer'
import Question from '@/components/Question'
import { operaQuestions } from '@/lib/questions'
import { ExamSession, Answer } from '@/types'

export default function ExamPage() {
  const router = useRouter()
  const [session, setSession] = useState<ExamSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [examStartTime] = useState(Date.now())

  // Load session from sessionStorage
  useEffect(() => {
    const sessionData = sessionStorage.getItem('examSession')
    if (!sessionData) {
      router.push('/')
      return
    }

    try {
      const parsedSession: ExamSession = JSON.parse(sessionData)
      setSession(parsedSession)
    } catch (err) {
      console.error('Session parse error:', err)
      router.push('/')
    }
  }, [router])

  const currentQuestion = operaQuestions[currentQuestionIndex]

  // Handle answer submission
  const handleAnswer = useCallback((selectedAnswer: string) => {
    if (!currentQuestion || isAnswered) return

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    const answer: Answer = {
      questionId: currentQuestion.id || `q-${currentQuestion.order}`,
      questionOrder: currentQuestion.order,
      selectedAnswer,
      isCorrect,
      skipped: false,
      timeSpent,
      violationOccurred: false
    }

    setAnswers(prev => [...prev, answer])
    setIsAnswered(true)

    // Auto move to next question after 1.5 seconds
    setTimeout(() => {
      handleNextQuestion(false)
    }, 1500)
  }, [currentQuestion, isAnswered, questionStartTime])

  // Handle next question
  const handleNextQuestion = useCallback((skipped: boolean) => {
    if (!currentQuestion) return

    // If skipped, add a skipped answer
    if (skipped && !isAnswered) {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
      const answer: Answer = {
        questionId: currentQuestion.id || `q-${currentQuestion.order}`,
        questionOrder: currentQuestion.order,
        selectedAnswer: null,
        isCorrect: false,
        skipped: true,
        timeSpent,
        violationOccurred: false
      }

      setAnswers(prev => [...prev, answer])
    }

    // Move to next question or finish exam
    if (currentQuestionIndex < operaQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setIsAnswered(false)
      setQuestionStartTime(Date.now())
    } else {
      // Exam finished
      finishExam()
    }
  }, [currentQuestion, isAnswered, currentQuestionIndex, questionStartTime])

  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      handleNextQuestion(true)
    }
  }, [isAnswered, handleNextQuestion])

  // Finish exam and submit results
  const finishExam = useCallback(async () => {
    if (!session) return

    const examEndTime = Date.now()
    const totalTimeSpent = Math.floor((examEndTime - examStartTime) / 1000)
    const correctAnswers = answers.filter(a => a.isCorrect).length

    try {
      const response = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: session.studentId,
          answers,
          violations: [],
          totalTimeSpent,
          correctAnswers,
          examType: "opera"
        })
      })

      if (response.ok) {
        const result = await response.json()
        sessionStorage.setItem('examResult', JSON.stringify(result))
        router.push('/opera/results')
      } else {
        console.error('Failed to submit exam')
      }
    } catch (err) {
      console.error('Submit error:', err)
    }
  }, [session, answers, examStartTime, router])

  if (!session || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Sınav yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Opera Türleri Sınavı</h1>
          <p className="text-gray-600">{session.studentName} - {session.schoolNo}</p>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <QuestionTimer
            duration={currentQuestion.timeLimit}
            isActive={!isAnswered}
            onTimeUp={handleTimeUp}
          />
        </div>

        {/* Question */}
        <Question
          question={currentQuestion}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
        />

        {/* Progress */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-gray-600">İlerleme:</span>
            <span className="font-bold text-purple-600">
              {currentQuestionIndex + 1} / {operaQuestions.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
