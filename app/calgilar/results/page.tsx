'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface TempResult {
  score: number
  correctAnswers: number
  totalQuestions: number
  tempData: any
}

export default function OperaResults() {
  const router = useRouter()
  const [result, setResult] = useState<TempResult | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const tempResult = sessionStorage.getItem('tempExamResult')
    if (!tempResult) {
      router.push('/')
      return
    }

    try {
      setResult(JSON.parse(tempResult))
    } catch (err) {
      router.push('/')
    }
  }, [router])

  const handleSave = async () => {
    if (!result) return

    setSaving(true)
    try {
      const response = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.tempData)
      })

      if (response.ok) {
        sessionStorage.removeItem('tempExamResult')
        alert('Sınav sonucunuz kaydedildi!')
        router.push('/')
      } else {
        alert('Kaydetme başarısız')
      }
    } catch (err) {
      alert('Bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const handleRetry = () => {
    sessionStorage.removeItem('tempExamResult')
    sessionStorage.removeItem('examSession')
    router.push('/calgilar/login')
  }

  if (!result) return null

  const percentage = result.score
  const isPassed = percentage >= 60

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Score Circle */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                <circle
                  cx="96" cy="96" r="88"
                  stroke={isPassed ? '#10b981' : '#ef4444'}
                  strokeWidth="12" fill="none"
                  strokeDasharray={`${(percentage / 100) * 553} 553`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                  {percentage}
                </span>
                <span className="text-gray-600 text-sm">/ 100</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={`text-center mb-8 p-6 rounded-xl ${isPassed ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`text-3xl font-bold mb-2 ${isPassed ? 'text-green-700' : 'text-red-700'}`}>
              {isPassed ? '✓ BAŞARILI' : '✗ BAŞARISIZ'}
            </p>
            <p className="text-gray-600">
              {isPassed
                ? 'Tebrikler! Geçme notunu aldınız. Sonucu kaydedebilir veya daha yüksek puan için tekrar deneyebilirsiniz.'
                : '60 puan altında kaldınız. Lütfen tekrar deneyin.'
              }
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{result.correctAnswers}</div>
              <div className="text-sm text-gray-600">Doğru</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">
                {result.totalQuestions - result.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Yanlış</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isPassed && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {saving ? 'Kaydediliyor...' : '💾 Sınavı Kaydet ve Bitir'}
              </button>
            )}

            <button
              onClick={handleRetry}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition ${
                isPassed
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isPassed ? '🔄 Daha Yüksek Puan İçin Tekrar Dene' : '🔄 Tekrar Dene (60+ Almalısınız)'}
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Ana Menüye Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
