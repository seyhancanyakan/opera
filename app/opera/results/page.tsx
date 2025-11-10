'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { operaQuestions } from '@/lib/questions'

interface ExamResultData {
  examResultId: string
  score: number
  correctAnswers: number
  totalQuestions: number
  violations: number
}

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<ExamResultData | null>(null)
  const [answers, setAnswers] = useState<any[]>([])
  const [violations, setViolations] = useState<any[]>([])
  const [studentInfo, setStudentInfo] = useState<any>(null)

  useEffect(() => {
    // Load result from sessionStorage
    const resultData = sessionStorage.getItem('examResult')
    const sessionData = sessionStorage.getItem('examSession')

    if (!resultData || !sessionData) {
      router.push('/')
      return
    }

    try {
      const parsedResult = JSON.parse(resultData)
      const parsedSession = JSON.parse(sessionData)

      setResult(parsedResult)
      setStudentInfo(parsedSession)

      // Get answers and violations from session
      // In a real app, you'd fetch this from the API
    } catch (err) {
      console.error('Error loading results:', err)
      router.push('/')
    }
  }, [router])

  if (!result || !studentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Sonuçlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  const percentage = result.score
  const isPassed = percentage >= 60

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Result Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sınav Sonucu</h1>
            <p className="text-gray-600">{studentInfo.studentName} - {studentInfo.schoolNo}</p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={isPassed ? '#10b981' : '#ef4444'}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(percentage / 100) * 553} 553`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                  {percentage}
                </span>
                <span className="text-gray-600 text-sm">Puan</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={`text-center mb-8 p-4 rounded-lg ${isPassed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
            <p className={`text-2xl font-bold ${isPassed ? 'text-green-700' : 'text-red-700'}`}>
              {isPassed ? '✓ BAŞARILI' : '✗ BAŞARISIZ'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {result.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Doğru Cevap</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {result.totalQuestions - result.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Yanlış Cevap</div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {result.violations}
              </div>
              <div className="text-sm text-gray-600">İhlal Sayısı</div>
            </div>
          </div>

          {/* Violation Warning */}
          {result.violations > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ İhlal Uyarısı</h3>
              <p className="text-sm text-yellow-700">
                Sınav sırasında {result.violations} adet ihlal tespit edildi. Bu ihlaller kamera kaybı,
                başı çevirme veya sekme değiştirme girişimleri olabilir.
              </p>
            </div>
          )}

          {/* Category Breakdown */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Opera Türlerine Göre Başarı</h3>
            <div className="space-y-3">
              {['Opera Seria', 'Opera Buffa', 'Opera Comique', 'Grand Opera'].map((category) => {
                const categoryQuestions = operaQuestions.filter(q => q.category === category)
                const totalInCategory = categoryQuestions.length

                // In a real app, calculate correct answers from actual data
                // For demo, using random values
                const correctInCategory = Math.floor(Math.random() * (totalInCategory + 1))
                const categoryPercentage = Math.round((correctInCategory / totalInCategory) * 100)

                return (
                  <div key={category} className="flex items-center gap-4">
                    <span className="w-40 text-sm font-medium text-gray-700">{category}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all duration-500"
                        style={{ width: `${categoryPercentage}%` }}
                      />
                    </div>
                    <span className="w-16 text-sm text-gray-600 text-right">
                      {correctInCategory}/{totalInCategory}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Sonuçları Yazdır
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-white text-sm opacity-75">
          <p>Sonuçlarınız sistemde kaydedilmiştir.</p>
          <p className="mt-1">Bu sınav sadece 1 kez alınabilir.</p>
        </div>
      </div>
    </div>
  )
}
