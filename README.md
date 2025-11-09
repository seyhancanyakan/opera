# 🎭 Opera Türleri Dijital Sınav Sistemi

Next.js 14 ile geliştirilmiş, anti-kopya özelliklerine sahip, multitenant dijital sınav uygulaması.

## ✨ Özellikler

### 🎯 Sınav Özellikleri
- **20 Kapsamlı Soru** - Her opera türünden 5 soru
- **Karışık Format** - Video izleme, eşleştirme, çoktan seçmeli, karşılaştırma
- **2 Dakika/Soru** - Her soru için otomatik zamanlayıcı
- **YouTube Entegrasyonu** - Gerçek opera performansları
- **Otomatik Puanlama** - Anında sonuç görüntüleme

### 🔒 Anti-Kopya Sistemi
- **Web Kamera İzleme** - TensorFlow.js ile yüz algılama
- **Başı Çevirme Kontrolü** - 30° üzeri dönüş algılama
- **Yüz Kaybı Algılama** - 2 saniye tolerans
- **Tab/Pencere Değiştirme** - Otomatik soru atlama
- **Fullscreen Kontrolü** - Tam ekran modu zorunlu
- **İhlal Loglama** - Tüm kopya teşebbüsleri kaydedilir

### 👥 Multitenant
- Birden fazla öğrenci aynı anda sınava girebilir
- Her öğrenci **sadece 1 kez** sınava girebilir
- Öğrenci adı + okul numarası ile giriş

## 🎵 Soru Kapsam

### Opera Seria (5 soru)
- Tarihçe: 17-18. yüzyıl İtalya, Barok dönem
- Besteciler: Handel, Vivaldi, Alessandro Scarlatti
- Ünlü Operalar: Giulio Cesare, Rinaldo, Rodelinda

### Opera Buffa (5 soru)
- Tarihçe: 18. yüzyıl, Opera Seria'ya tepki
- Besteciler: Mozart, Rossini, Donizetti
- Ünlü Operalar: Figaro'nun Düğünü, Sevil Berberi, Don Pasquale

### Opera Comique (5 soru)
- Tarihçe: 18-19. yüzyıl Fransa
- Besteciler: Bizet, Gounod, Massenet
- Ünlü Operalar: Carmen, Faust, Manon

### Grand Opera (5 soru)
- Tarihçe: 19. yüzyıl Paris
- Besteciler: Meyerbeer, Halévy, Rossini
- Ünlü Operalar: Les Huguenots, Guillaume Tell, La Juive

## 🛠️ Teknoloji Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Face Detection:** TensorFlow.js + Face Landmarks Detection
- **Video Player:** react-youtube
- **State Management:** React Hooks + Zustand
- **Validation:** Zod
- **Deployment:** Vercel (önerilen)

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ (20 önerilen)
- npm veya yarn
- Supabase hesabı (veya PostgreSQL)

### 1. Projeyi Klonlayın
```bash
git clone <repo-url>
cd sınV
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env.local` dosyasını düzenleyin:

```env
# Supabase Database URL'inizi Supabase Dashboard > Project Settings > Database'den alın
DATABASE_URL="postgresql://postgres.etlbvfbcsntrqgjskcxd:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.etlbvfbcsntrqgjskcxd:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Supabase Keys (zaten eklenmiş)
NEXT_PUBLIC_SUPABASE_URL="https://etlbvfbcsntrqgjskcxd.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
```

**ÖNEMLI:** `[YOUR-PASSWORD]` kısmını Supabase database şifrenizle değiştirin!

### 4. Prisma Migrate
```bash
npx prisma generate
npx prisma db push
```

### 5. Development Server'ı Başlatın
```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açın.

## 🚀 Vercel'e Deploy

### 1. Vercel Hesabı Oluşturun
[vercel.com](https://vercel.com) adresinden ücretsiz hesap oluşturun.

### 2. Projeyi Import Edin
- Vercel Dashboard > "Add New Project"
- GitHub/GitLab repo'nuzu bağlayın
- Projeyi seçin

### 3. Ortam Değişkenlerini Ekleyin
Vercel Dashboard > Project Settings > Environment Variables

### 4. Deploy
"Deploy" butonuna tıklayın. Vercel otomatik olarak build edip deploy edecek.

## 📱 YouTube Video ID'lerini Güncelleme

`lib/questions.ts` dosyasındaki placeholder YouTube ID'lerini güncelleyin.

### Önerilen Aramalar:
1. **Opera Seria:** "Handel Lascia ch'io pianga live"
2. **Opera Buffa:** "Mozart Figaro Non più andrai"
3. **Opera Comique:** "Bizet Carmen Habanera live"
4. **Grand Opera:** "Meyerbeer Les Huguenots"

## 🎮 Kullanım

### Öğrenci Girişi
1. Ana sayfada **Ad Soyad** ve **Okul Numarası** girin
2. "Sınava Başla" butonuna tıklayın
3. Kamera izni verin (zorunlu)

### Sınav Kuralları
- Kameranız sürekli açık olmalıdır
- Başınızı sağa/sola çevirmeyin
- Başka sekmelere geçemezsiniz
- Her soru için 2 dakika süreniz var
- Sadece 1 deneme hakkınız var

## 📊 Veritabanı Yapısı

### Student
- id, name, schoolNo (unique)
- hasCompleted (boolean)
- examResults (relation)

### ExamResult
- score, correctAnswers, totalQuestions
- violations (JSON)
- answers (JSON)
- timeSpent, ipAddress, userAgent

### Question
- order, type, category
- youtubeId, question, options
- correctAnswer, explanation
- metadata (composer, operaName, year)

## 📄 Lisans

MIT
