'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Dijital Sınav Sistemi</h1>
          <p className="text-purple-200 text-lg">Konservatuvar Değerlendirme Platformu</p>
        </div>

        {/* Exam Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Opera Exam Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition transform hover:-translate-y-1">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎭</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Opera Türleri</h2>
              <p className="text-gray-600 text-sm">Opera Seria, Buffa, Comique, Grand Opera</p>
            </div>

            <div className="mb-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-purple-600">●</span>
                <span>20 çoktan seçmeli soru</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">●</span>
                <span>Her soru 1 dakika</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">●</span>
                <span>Toplam: 100 puan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">●</span>
                <span>Tek seferlik deneme</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/opera/login')}
              className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-700 transition shadow-lg"
            >
              Opera Sınavına Başla
            </button>
          </div>

          {/* Okul Çalgıları Exam Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition transform hover:-translate-y-1">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎺</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Okul Çalgıları</h2>
              <p className="text-gray-600 text-sm">Aerofon Çalgılar ve Hornbostel-Sachs</p>
            </div>

            <div className="mb-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">●</span>
                <span>20 çoktan seçmeli soru</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">●</span>
                <span>Her soru 1 dakika</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">●</span>
                <span>Toplam: 100 puan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">●</span>
                <span>Tek seferlik deneme</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/calgilar/login')}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
            >
              Çalgılar Sınavına Başla
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-white text-sm opacity-75">
          <p>Sınavlar sadece 1 kez alınabilir</p>
          <p className="mt-2">Her sınav için Ad ve Okul Numarası gereklidir</p>
        </div>

        {/* Admin Panel Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg font-semibold hover:bg-opacity-30 transition backdrop-blur-sm"
          >
            👨‍🏫 Öğretmen Paneli
          </button>
        </div>
      </div>
    </div>
  )
}
