'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [schoolNo, setSchoolNo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !schoolNo.trim()) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, schoolNo })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Giriş başarısız')
        setLoading(false)
        return
      }

      // Store session and redirect to exam
      sessionStorage.setItem('examSession', JSON.stringify(data.session))
      router.push('/exam')
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Opera Türleri Sınavı</h1>
          <p className="text-gray-600">Dijital Değerlendirme Sistemi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Ad Soyad
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800"
              placeholder="Adınızı ve soyadınızı girin"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="schoolNo" className="block text-sm font-medium text-gray-700 mb-2">
              Okul Numarası
            </label>
            <input
              id="schoolNo"
              type="text"
              value={schoolNo}
              onChange={(e) => setSchoolNo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800"
              placeholder="Okul numaranızı girin"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Giriş yapılıyor...' : 'Sınava Başla'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Önemli Uyarılar:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Sınav süresi: 20 soru × 1 dakika = 20 dakika</li>
            <li>• Her soru için 60 saniye süreniz var</li>
            <li>• Başka sekmelere geçemezsiniz</li>
            <li>• Sadece 1 deneme hakkınız var</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
