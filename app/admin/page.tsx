'use client'

import { useEffect, useState } from 'react'
import { operaQuestions } from '@/lib/questions'
import { calgilarQuestions } from '@/lib/calgilar-questions'

interface StudentResult {
  id: string
  student: {
    name: string
    schoolNo: string
  }
  score: number
  correctAnswers: number
  totalQuestions: number
  endTime: string
  timeSpent: number
  examType: string
  answers: any[]
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [results, setResults] = useState<StudentResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'opera' | 'calgilar'>('opera')
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'sozy1234') {
      setIsAuthenticated(true)
      setLoginError('')
      fetchResults()
    } else {
      setLoginError('Yanlış şifre!')
    }
  }

  const fetchResults = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/results')
      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      console.error('Fetch results error:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteResult = async (id: string) => {
    if (!confirm('Bu sonucu silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/results/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setResults(results.filter(r => r.id !== id))
        alert('Sonuç silindi')
      }
    } catch (err) {
      alert('Silme hatası')
    }
  }

  const viewDetails = (result: StudentResult) => {
    setSelectedResult(result)
    setShowDetails(true)
  }

  const filteredResults = results.filter(r => r.examType === activeTab)

  const exportToCSV = () => {
    const headers = ['Ad Soyad', 'Okul No', 'Puan', 'Doğru', 'Toplam', 'Tarih', 'Süre (dk)', 'Sınav']
    const rows = filteredResults.map(r => [
      r.student.name,
      r.student.schoolNo,
      r.score,
      r.correctAnswers,
      r.totalQuestions,
      new Date(r.endTime).toLocaleString('tr-TR'),
      Math.round(r.timeSpent / 60),
      r.examType === 'opera' ? 'Opera' : 'Çalgılar'
    ])

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-sonuclari-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👨‍🏫</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Öğretmen Girişi</h1>
            <p className="text-gray-600">Admin paneline erişmek için şifre girin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-800"
                placeholder="Admin şifresini girin"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Giriş Yap
            </button>

            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Ana Menüye Dön
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin Panel
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Sonuçlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  const stats = {
    total: filteredResults.length,
    passed: filteredResults.filter(r => r.score >= 60).length,
    average: filteredResults.length > 0 ? Math.round(filteredResults.reduce((sum, r) => sum + r.score, 0) / filteredResults.length) : 0,
    highest: filteredResults.length > 0 ? Math.max(...filteredResults.map(r => r.score)) : 0
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">👨‍🏫 Öğretmen Paneli</h1>
              <p className="text-gray-600">Tüm Sınav Sonuçları</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm"
              >
                📊 CSV İndir
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false)
                  setPassword('')
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm"
              >
                Çıkış
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm"
              >
                Ana Menü
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('opera')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'opera'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              🎭 Opera ({results.filter(r => r.examType === 'opera').length})
            </button>
            <button
              onClick={() => setActiveTab('calgilar')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'calgilar'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              🎺 Çalgılar ({results.filter(r => r.examType === 'calgilar').length})
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.total}</div>
            <div className="text-gray-600 text-xs">Toplam</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.passed}</div>
            <div className="text-gray-600 text-xs">Başarılı</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.average}</div>
            <div className="text-gray-600 text-xs">Ortalama</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.highest}</div>
            <div className="text-gray-600 text-xs">En Yüksek</div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Ad Soyad</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Okul No</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Puan</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Doğru</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Tarih</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      Bu sınav için henüz sonuç yok
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((result, index) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{result.student.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{result.student.schoolNo}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          result.score >= 85 ? 'bg-green-100 text-green-700' :
                          result.score >= 70 ? 'bg-blue-100 text-blue-700' :
                          result.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {result.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm">{result.correctAnswers}/{result.totalQuestions}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(result.endTime).toLocaleString('tr-TR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => viewDetails(result)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                          >
                            Detay
                          </button>
                          <button
                            onClick={() => deleteResult(result.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && selectedResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetails(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Sınav Detayları</h2>
                    <p className="text-gray-600">{selectedResult.student.name} - {selectedResult.student.schoolNo}</p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{selectedResult.score}</div>
                    <div className="text-xs text-gray-600">Puan (100 üzerinden)</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{selectedResult.correctAnswers}</div>
                    <div className="text-xs text-gray-600">Doğru Cevap</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedResult.totalQuestions - selectedResult.correctAnswers}
                    </div>
                    <div className="text-xs text-gray-600">Yanlış Cevap</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(selectedResult.timeSpent / 60)}</div>
                    <div className="text-xs text-gray-600">Dakika</div>
                  </div>
                </div>

                {/* Question by Question */}
                <h3 className="text-lg font-bold text-gray-800 mb-4">Cevap Anahtarı</h3>
                <div className="space-y-3">
                  {selectedResult.answers.map((answer: any, idx: number) => {
                    const questions = selectedResult.examType === 'opera' ? operaQuestions : calgilarQuestions
                    const question = questions.find(q => q.order === answer.questionOrder)

                    return (
                      <div key={idx} className={`border rounded-lg p-4 ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-gray-700">Soru {answer.questionOrder}:</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                answer.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                              }`}>
                                {answer.isCorrect ? '✓ Doğru (+5 puan)' : '✗ Yanlış (0 puan)'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-3 font-medium">{question?.question}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm bg-white rounded p-3">
                          <div className="flex gap-2">
                            <span className="font-semibold text-gray-600 min-w-[120px]">Öğrenci Cevabı:</span>
                            <span className={answer.isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                              {answer.selectedAnswer || 'Cevapsız bıraktı'}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-semibold text-gray-600 min-w-[120px]">Doğru Cevap:</span>
                            <span className="text-green-700 font-semibold">{question?.correctAnswer}</span>
                          </div>
                          {question?.explanation && (
                            <div className="flex gap-2 pt-2 border-t">
                              <span className="font-semibold text-gray-600 min-w-[120px]">Açıklama:</span>
                              <span className="text-gray-600 text-xs">{question.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
