'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OperaResults() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const resultData = sessionStorage.getItem('examResult')
    if (!resultData) {
      router.push('/')
      return
    }

    try {
      setResult(JSON.parse(resultData))
    } catch (err) {
      router.push('/')
    }
  }, [router])

  if (!result) return null

  const percentage = result.score
  const isPassed = percentage >= 60

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sınav Sonucu</h1>
            <p className="text-gray-600">Bu deneme kaydedildi</p>
          </div>

          {/* Score */}
          <div className="text-center mb-8">
            <div className={`inline-block text-8xl font-bold mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}
            </div>
            <p className="text-2xl text-gray-600">/ 100 Puan</p>
          </div>

          {/* Status */}
          <div className={`text-center mb-8 p-6 rounded-xl ${isPassed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
            <p className={`text-3xl font-bold mb-2 ${isPassed ? 'text-green-700' : 'text-red-700'}`}>
              {isPassed ? '✓ BAŞARILI' : '✗ BAŞARISIZ'}
            </p>
            <p className="text-gray-700">
              {isPassed
                ? `Tebrikler! ${result.correctAnswers} soruyu doğru cevapladınız. Daha yüksek puan için tekrar deneyebilirsiniz.`
                : `${result.correctAnswers} doğru cevap. 60 puan ve üzeri için tekrar deneyin.`
              }
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-600">{result.correctAnswers}</div>
              <div className="text-sm text-gray-600">Doğru Cevap</div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-red-600">
                {result.totalQuestions - result.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Yanlış Cevap</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => {
                sessionStorage.removeItem('examResult')
                sessionStorage.removeItem('examSession')
                router.push('/calgilar/login')
              }}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
            >
              🔄 Tekrar Dene
            </button>

            <button
              onClick={() => {
                sessionStorage.clear()
                router.push('/')
              }}
              className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Ana Menüye Dön
            </button>
          </div>

          {/* Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              <strong>Not:</strong> Bu denemeniz kaydedildi. İstediğiniz kadar tekrar deneyebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
