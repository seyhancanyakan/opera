export interface QuestionData {
  id?: string
  order: number
  type: 'video' | 'comparison' | 'matching' | 'multiple_choice'
  category: 'Opera Seria' | 'Opera Buffa' | 'Opera Comique' | 'Grand Opera'
  youtubeId?: string
  youtubeId2?: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  metadata: {
    composer?: string
    operaName?: string
    year?: string
    historicalPeriod?: string
    topic?: string
  }
  timeLimit: number // in seconds
  points: number
}

export const operaQuestions: QuestionData[] = [
  // OPERA SERIA (5 Questions)
  {
    order: 1,
    type: 'multiple_choice',
    category: 'Opera Seria',
    question: 'Opera Seria\'nın en önemli bestecilerinden Handel\'in "Lascia ch\'io pianga" aryası hangi operasından bir bölümdür?',
    options: ['Rinaldo', 'Giulio Cesare', 'Alcina', 'Rodelinda'],
    correctAnswer: 'Rinaldo',
    explanation: '"Lascia ch\'io pianga" Handel\'in 1711\'de bestelediği Rinaldo operasından bir aryadır ve Opera Seria\'nın en ünlü örneklerinden biridir.',
    metadata: {
      composer: 'George Frideric Handel',
      operaName: 'Rinaldo',
      year: '1711',
      historicalPeriod: 'Barok Dönemi',
      topic: 'Opera bilgisi'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 2,
    type: 'multiple_choice',
    category: 'Opera Seria',
    question: 'Opera Seria hangi yüzyılda ve hangi ülkede gelişmiştir?',
    options: [
      '17-18. yüzyıl İtalya',
      '18-19. yüzyıl Fransa',
      '19. yüzyıl Almanya',
      '16. yüzyıl İspanya'
    ],
    correctAnswer: '17-18. yüzyıl İtalya',
    explanation: 'Opera Seria, 17. ve 18. yüzyıllarda İtalya\'da Barok döneminde gelişti. Saray operası olarak da bilinir.',
    metadata: {
      historicalPeriod: 'Barok Dönemi (17-18. yüzyıl)',
      topic: 'Tarihçe'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 3,
    type: 'multiple_choice',
    category: 'Opera Seria',
    question: '"Giulio Cesare" (Julius Caesar) operasının bestecisi kimdir?',
    options: [
      'George Frideric Handel',
      'Wolfgang Amadeus Mozart',
      'Georges Bizet',
      'Giacomo Meyerbeer'
    ],
    correctAnswer: 'George Frideric Handel',
    explanation: 'Giulio Cesare, Handel\'in en ünlü Opera Seria eserlerinden biridir ve 1724\'te bestelendi.',
    metadata: {
      composer: 'George Frideric Handel',
      operaName: 'Giulio Cesare',
      year: '1724',
      topic: 'Besteci ve opera bilgisi'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 4,
    type: 'multiple_choice',
    category: 'Opera Seria',
    question: 'Aşağıdaki operalardan hangisi Opera Seria türüne aittir?',
    options: [
      'Handel - Rinaldo',
      'Mozart - Figaro\'nun Düğünü',
      'Bizet - Carmen',
      'Rossini - Guillaume Tell'
    ],
    correctAnswer: 'Handel - Rinaldo',
    explanation: 'Rinaldo, Handel\'in 1711\'de İngiltere için bestelediği ilk İtalyan operasıdır ve Opera Seria türünün klasik bir örneğidir.',
    metadata: {
      composer: 'George Frideric Handel',
      operaName: 'Rinaldo',
      year: '1711',
      topic: 'Opera tanıma'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 5,
    type: 'matching',
    category: 'Opera Seria',
    question: 'Opera Seria\'nın ayırt edici özelliği hangisidir?',
    options: [
      'Mitolojik ve tarihi konular, recitativo-aria yapısı, ağırbaşlı dramatik yapı',
      'Gündelik hayattan komik konular, halk diline yakın',
      'Konuşma diyalogları, hem ciddi hem komik unsurlar',
      'Büyük ölçekli yapıtlar, muhteşem sahne düzenlemeleri, bale sahneleri'
    ],
    correctAnswer: 'Mitolojik ve tarihi konular, recitativo-aria yapısı, ağırbaşlı dramatik yapı',
    explanation: 'Opera Seria, mitolojik ve tarihi konuları işler, recitativo ve aria bölümlerinden oluşur ve ağırbaşlı, dramatik bir yapıya sahiptir.',
    metadata: {
      topic: 'Özellik eşleştirme'
    },
    timeLimit: 60,
    points: 1
  },

  // OPERA BUFFA (5 Questions)
  {
    order: 6,
    type: 'multiple_choice',
    category: 'Opera Buffa',
    question: 'Mozart\'ın "Figaro\'nun Düğünü" operası hangi yazar/oyun yazarının eserinden uyarlanmıştır?',
    options: ['Pierre Beaumarchais', 'Molière', 'Carlo Goldoni', 'Lorenzo Da Ponte (orijinal)'],
    correctAnswer: 'Pierre Beaumarchais',
    explanation: 'Figaro\'nun Düğünü, Fransız yazar Beaumarchais\'nin oyunundan Lorenzo Da Ponte tarafından libretto olarak uyarlanmış ve Mozart tarafından 1786\'da bestelenmişti.',
    metadata: {
      composer: 'Wolfgang Amadeus Mozart',
      operaName: 'Le nozze di Figaro',
      year: '1786',
      historicalPeriod: 'Klasik Dönem',
      topic: 'Opera kaynağı'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 7,
    type: 'multiple_choice',
    category: 'Opera Buffa',
    question: 'Opera Buffa, 18. yüzyılda hangi opera türüne tepki olarak doğmuştur?',
    options: [
      'Opera Seria',
      'Grand Opera',
      'Opera Comique',
      'Singspiel'
    ],
    correctAnswer: 'Opera Seria',
    explanation: 'Opera Buffa, 18. yüzyılda Opera Seria\'nın ağırbaşlı ve ciddi yapısına tepki olarak, daha komik ve halkın anlayabileceği bir tarz olarak gelişti.',
    metadata: {
      historicalPeriod: '18. yüzyıl',
      topic: 'Tarihçe ve gelişim'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 8,
    type: 'multiple_choice',
    category: 'Opera Buffa',
    question: '"Figaro\'nun Düğünü" (Le nozze di Figaro) operasının bestecisi kimdir?',
    options: [
      'Wolfgang Amadeus Mozart',
      'George Frideric Handel',
      'Gioachino Rossini',
      'Georges Bizet'
    ],
    correctAnswer: 'Wolfgang Amadeus Mozart',
    explanation: 'Figaro\'nun Düğünü, Mozart\'ın 1786\'da bestelediği ve Opera Buffa türünün en önemli eserlerinden biri kabul edilen operadır.',
    metadata: {
      composer: 'Wolfgang Amadeus Mozart',
      operaName: 'Le nozze di Figaro',
      year: '1786',
      topic: 'Besteci bilgisi'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 9,
    type: 'multiple_choice',
    category: 'Opera Buffa',
    question: 'Rossini\'nin en ünlü Opera Buffa eseri hangisidir?',
    options: [
      'Sevil Berberi (Il barbiere di Siviglia)',
      'Guillaume Tell',
      'Carmen',
      'Les Huguenots'
    ],
    correctAnswer: 'Sevil Berberi (Il barbiere di Siviglia)',
    explanation: 'Sevil Berberi, Rossini\'nin 1816\'da bestelediği ve Opera Buffa türünün en popüler eserlerinden biri olan operadır.',
    metadata: {
      composer: 'Gioachino Rossini',
      operaName: 'Il barbiere di Siviglia',
      year: '1816',
      topic: 'Ünlü opera bilgisi'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 10,
    type: 'comparison',
    category: 'Opera Buffa',
    question: 'Opera Seria ve Opera Buffa arasındaki temel fark nedir?',
    options: [
      'Opera Seria ciddi ve mitolojik konular işlerken, Opera Buffa komik ve gündelik hayat konuları işler',
      'Opera Seria Fransız, Opera Buffa İtalyan operasıdır',
      'Opera Seria daha kısa, Opera Buffa daha uzundur',
      'Opera Seria konuşma içerir, Opera Buffa içermez'
    ],
    correctAnswer: 'Opera Seria ciddi ve mitolojik konular işlerken, Opera Buffa komik ve gündelik hayat konuları işler',
    explanation: 'Opera Seria ağırbaşlı, mitolojik ve tarihi konular işlerken, Opera Buffa gündelik hayattan alınmış komik konuları işler.',
    metadata: {
      topic: 'Karşılaştırma'
    },
    timeLimit: 60,
    points: 1
  },

  // OPERA COMIQUE (5 Questions)
  {
    order: 11,
    type: 'multiple_choice',
    category: 'Opera Comique',
    question: 'Carmen operasının ana karakteri Carmen hangi meslekten bir kadındır?',
    options: ['Sigara fabrikası işçisi', 'Dans ederek', 'Şarkıcı', 'Soylu bir kadın'],
    correctAnswer: 'Sigara fabrikası işçisi',
    explanation: 'Carmen, Sevilla\'da bir sigara fabrikasında çalışan özgür ruhlu bir集psy kadındır. Bu karakter Prosper Mérimée\'nin romanından uyarlanmıştır.',
    metadata: {
      composer: 'Georges Bizet',
      operaName: 'Carmen',
      year: '1875',
      historicalPeriod: '19. yüzyıl Fransa',
      topic: 'Opera karakteri'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 12,
    type: 'multiple_choice',
    category: 'Opera Comique',
    question: 'Opera Comique hangi ülkede gelişmiştir?',
    options: [
      'Fransa',
      'İtalya',
      'Almanya',
      'Avusturya'
    ],
    correctAnswer: 'Fransa',
    explanation: 'Opera Comique, 18-19. yüzyıllarda Fransa\'da gelişen bir opera türüdür.',
    metadata: {
      historicalPeriod: '18-19. yüzyıl',
      topic: 'Tarihçe'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 13,
    type: 'multiple_choice',
    category: 'Opera Comique',
    question: '"Carmen" operasının bestecisi kimdir?',
    options: [
      'Georges Bizet',
      'Wolfgang Amadeus Mozart',
      'Giacomo Meyerbeer',
      'Gioachino Rossini'
    ],
    correctAnswer: 'Georges Bizet',
    explanation: 'Carmen, Georges Bizet\'in 1875\'te bestelediği ve Opera Comique türünün en ünlü eseri olan operadır.',
    metadata: {
      composer: 'Georges Bizet',
      operaName: 'Carmen',
      year: '1875',
      topic: 'Besteci bilgisi'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 14,
    type: 'multiple_choice',
    category: 'Opera Comique',
    question: 'Charles Gounod\'un en ünlü operası hangisidir?',
    options: [
      'Faust',
      'Carmen',
      'Les Huguenots',
      'Giulio Cesare'
    ],
    correctAnswer: 'Faust',
    explanation: 'Faust, Gounod\'un 1859\'da bestelediği ve Goethe\'nin eserinden uyarlanan ünlü Opera Comique\'idir.',
    metadata: {
      composer: 'Charles Gounod',
      operaName: 'Faust',
      year: '1859',
      topic: 'Ünlü opera bilgisi'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 15,
    type: 'matching',
    category: 'Opera Comique',
    question: 'Opera Comique\'in ayırt edici özelliği hangisidir?',
    options: [
      'Konuşma diyalogları içerir, hem ciddi hem komik unsurlar barındırabilir',
      'Sadece mitolojik konular işler',
      'Bale sahneleri zorunludur',
      'Tamamen konuşma ile anlatılır, müzik yoktur'
    ],
    correctAnswer: 'Konuşma diyalogları içerir, hem ciddi hem komik unsurlar barındırabilir',
    explanation: 'Opera Comique\'in en belirgin özelliği, şarkılı bölümler arasında konuşma diyalogları içermesidir. Ayrıca hem ciddi hem komik unsurlar barındırabilir.',
    metadata: {
      topic: 'Özellik eşleştirme'
    },
    timeLimit: 60,
    points: 1
  },

  // GRAND OPERA (5 Questions)
  {
    order: 16,
    type: 'multiple_choice',
    category: 'Grand Opera',
    question: 'Grand Opera eserlerinde zorunlu olan ve 19. yüzyıl Paris operalarının karakteristiği haline gelen sahne unsuru nedir?',
    options: ['Bale sahneleri', 'Koro sahneleri', 'Solo aryalar', 'Orkestra intermezzoları'],
    correctAnswer: 'Bale sahneleri',
    explanation: 'Grand Opera\'nın en belirgin özelliklerinden biri, her operada zorunlu olan muhteşem bale sahneleridir. Paris Opéra geleneğinin bir parçasıdır.',
    metadata: {
      historicalPeriod: '19. yüzyıl Paris',
      topic: 'Grand Opera özellikleri'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 17,
    type: 'multiple_choice',
    category: 'Grand Opera',
    question: 'Grand Opera hangi şehirde ve hangi yüzyılda gelişmiştir?',
    options: [
      '19. yüzyıl Paris',
      '18. yüzyıl Viyana',
      '17. yüzyıl Venedik',
      '19. yüzyıl Londra'
    ],
    correctAnswer: '19. yüzyıl Paris',
    explanation: 'Grand Opera, 19. yüzyılda Paris\'te gelişti ve Fransız opera geleneğinin en görkemli biçimidir.',
    metadata: {
      historicalPeriod: '19. yüzyıl',
      topic: 'Tarihçe'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 18,
    type: 'multiple_choice',
    category: 'Grand Opera',
    question: 'Grand Opera\'nın en önemli bestecilerinden biri kimdir?',
    options: [
      'Giacomo Meyerbeer',
      'Wolfgang Amadeus Mozart',
      'George Frideric Handel',
      'Gioachino Rossini (sadece Guillaume Tell)'
    ],
    correctAnswer: 'Giacomo Meyerbeer',
    explanation: 'Giacomo Meyerbeer, Grand Opera türünün en önemli ve başarılı bestecisidir. Les Huguenots ve Le prophète gibi eserler bestelemiştir.',
    metadata: {
      composer: 'Giacomo Meyerbeer',
      topic: 'Besteci bilgisi'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 19,
    type: 'multiple_choice',
    category: 'Grand Opera',
    question: '"Guillaume Tell" operası hangi türe aittir?',
    options: [
      'Grand Opera',
      'Opera Buffa',
      'Opera Seria',
      'Opera Comique'
    ],
    correctAnswer: 'Grand Opera',
    explanation: 'Guillaume Tell, Rossini\'nin 1829\'da Fransızca olarak bestelediği ve Grand Opera türünün önemli bir örneği olan operadır.',
    metadata: {
      composer: 'Gioachino Rossini',
      operaName: 'Guillaume Tell',
      year: '1829',
      topic: 'Opera türü tanıma'
    },
    timeLimit: 60,
    points: 1
  },
  {
    order: 20,
    type: 'matching',
    category: 'Grand Opera',
    question: 'Grand Opera\'nın karakteristik özellikleri hangileridir?',
    options: [
      '4-5 perdelik büyük ölçekli yapıtlar, tarihi ve epik konular, muhteşem sahne düzenlemeleri, bale sahneleri',
      'Küçük ölçekli, sade sahne düzeni, gündelik konular',
      'Sadece müzik, konuşma yok, komik konular',
      'Mitolojik konular, recitativo-aria yapısı'
    ],
    correctAnswer: '4-5 perdelik büyük ölçekli yapıtlar, tarihi ve epik konular, muhteşem sahne düzenlemeleri, bale sahneleri',
    explanation: 'Grand Opera, 4-5 perdelik büyük ölçekli yapısı, tarihi ve epik konuları, muhteşem sahne düzenlemeleri ve zorunlu bale sahneleri ile karakterizedir.',
    metadata: {
      topic: 'Özellik eşleştirme'
    },
    timeLimit: 60,
    points: 1
  }
]
