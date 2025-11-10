'use client'

import { useState, useEffect } from 'react'

interface QuestionProps {
  question: {
    order: number
    category: string
    question: string
    options: string[]
    metadata?: any
  }
  onAnswer: (answer: string) => void
  isAnswered: boolean
}

export default function Question({ question, onAnswer, isAnswered }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  // Shuffle options when question changes
  useEffect(() => {
    const shuffled = [...question.options].sort(() => Math.random() - 0.5)
    setShuffledOptions(shuffled)
  }, [question.order])

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (selectedAnswer && !isAnswered) {
      onAnswer(selectedAnswer)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
            Soru {question.order} / 20
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {question.category}
          </span>
        </div>

      </div>

      {/* Question Text */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {(shuffledOptions.length > 0 ? shuffledOptions : question.options).map((option, index) => {
          const isSelected = selectedAnswer === option
          const letter = String.fromCharCode(65 + index) // A, B, C, D

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              } ${isAnswered ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isSelected ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {letter}
                </span>
                <span className="flex-1 text-gray-800 font-medium">{option}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer || isAnswered}
        className="w-full py-4 px-6 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isAnswered ? 'Cevap Gönderildi' : 'Cevabı Gönder'}
      </button>

      {/* Metadata (for debugging/reference) */}
      {question.metadata && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          {question.metadata.composer && <p><strong>Besteci:</strong> {question.metadata.composer}</p>}
          {question.metadata.operaName && <p><strong>Opera:</strong> {question.metadata.operaName}</p>}
          {question.metadata.year && <p><strong>Yıl:</strong> {question.metadata.year}</p>}
        </div>
      )}
    </div>
  )
}
