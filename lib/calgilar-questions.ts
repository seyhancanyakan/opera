export interface CalgilarQuestionData {
  id?: string
  order: number
  type: 'multiple_choice'
  category: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  metadata?: {
    composer?: string
    operaName?: string
    year?: string
    historicalPeriod?: string
    topic?: string
  }
  timeLimit: number
  points: number
}

export const calgilarQuestions: CalgilarQuestionData[] = [
  {
    order: 1,
    type: 'multiple_choice',
    category: 'Hornbostel-Sachs',
    question: 'Hornbostel–Sachs sistemine göre zurna hangi ana çalgı sınıfına aittir?',
    options: ['Chordophone', 'Aerophone', 'Membranophone', 'Idiophone'],
    correctAnswer: 'Aerophone',
    explanation: 'Zurna, hava ile ses ürettiği için Aerophone (üflemeli çalgılar) sınıfına aittir.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 2,
    type: 'multiple_choice',
    category: 'Fiziksel İlkeler',
    question: 'Ney, ses üretiminde hangi fiziksel ilkeye dayanır?',
    options: [
      'Tel titreşimi',
      'Deri membran titreşimi',
      'Hava sütununun titreşimi',
      'Metal rezonansı'
    ],
    correctAnswer: 'Hava sütununun titreşimi',
    explanation: 'Ney, içindeki hava sütununun titreşmesiyle ses üretir. Bu, tüm aerofon çalgıların temel prensibidir.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 3,
    type: 'multiple_choice',
    category: 'Kültürel Çalgılar',
    question: 'Tibet kültüründe kullanılan Dungchen borusu hangi özelliğiyle bilinir?',
    options: [
      'Kamışlı nefesli çalgıdır',
      'Uyluk kemiğinden yapılır',
      '3 metreye varan uzunlukta metal borudur',
      'Su kabuğundan yapılır'
    ],
    correctAnswer: '3 metreye varan uzunlukta metal borudur',
    explanation: 'Dungchen, Tibet tapınaklarında kullanılan, 3 metreye kadar uzunlukta olan uzun metal borudur.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 4,
    type: 'multiple_choice',
    category: 'Bölgesel Çalgılar',
    question: 'Didgeridoo, aşağıdaki hangi bölgeye özgü bir aerofondur?',
    options: ['Afrika', 'Güney Amerika', 'Avustralya', 'Orta Asya'],
    correctAnswer: 'Avustralya',
    explanation: 'Didgeridoo, Avustralya aborjinlerinin geleneksel üflemeli çalgısıdır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 5,
    type: 'multiple_choice',
    category: 'Geleneksel Kullanım',
    question: 'Alphorn\'un geleneksel kullanım alanı aşağıdakilerden hangisidir?',
    options: [
      'Tibet tapınak ayinleri',
      'Alp dağları haberleşme ve ritüelleri',
      'Afrika kabile törenleri',
      'Avustralya aborjin ayinleri'
    ],
    correctAnswer: 'Alp dağları haberleşme ve ritüelleri',
    explanation: 'Alphorn, Alp dağlarında çobanlar tarafından haberleşme ve geleneksel törenlerde kullanılır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 6,
    type: 'multiple_choice',
    category: 'Malzeme Bilgisi',
    question: 'Shofar çalgısının hammaddesi aşağıdakilerden hangisidir?',
    options: ['Ahşap', 'Metal', 'Hayvan boynuzu', 'Kemik'],
    correctAnswer: 'Hayvan boynuzu',
    explanation: 'Shofar, genellikle koç boynuzundan yapılan Yahudi dini törenlerde kullanılan bir çalgıdır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 7,
    type: 'multiple_choice',
    category: 'Afrika Çalgıları',
    question: 'Vuvuzela ve Kakaki hangi kıtanın aerofon geleneğine aittir?',
    options: ['Asya', 'Afrika', 'Avrupa', 'Güney Amerika'],
    correctAnswer: 'Afrika',
    explanation: 'Vuvuzela (Güney Afrika) ve Kakaki (Batı Afrika) Afrika kıtasının geleneksel üflemeli çalgılarıdır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 8,
    type: 'multiple_choice',
    category: 'Dini Çalgılar',
    question: 'Rag Dung borusu Tibet ve Himalaya bölgesinde hangi işlevle kullanılır?',
    options: [
      'Dini törenlerde meditasyon sesi olarak',
      'Savaş sinyali aracı olarak',
      'Çobanlıkta haberleşme aracı olarak',
      'Orkestral müzikte bas sesi olarak'
    ],
    correctAnswer: 'Dini törenlerde meditasyon sesi olarak',
    explanation: 'Rag Dung, Tibet Budist tapınaklarında dini törenlerde ve meditasyon sırasında kullanılır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 9,
    type: 'multiple_choice',
    category: 'Güney Amerika',
    question: 'Pututo çalgısı hangi kültürün deniz kabuğundan yapılan aerofon örneğidir?',
    options: ['Mısır', 'İnka–And uygarlığı', 'Tibet', 'Anadolu'],
    correctAnswer: 'İnka–And uygarlığı',
    explanation: 'Pututo, And bölgesinde İnka uygarlığı ve günümüz Peru\'sunda kullanılan deniz kabuğu borusudur.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 10,
    type: 'multiple_choice',
    category: 'Hornbostel-Sachs Alt Kategori',
    question: 'Hornbostel–Sachs sistemine göre Didgeridoo hangi alt kategoriye girer?',
    options: [
      'Serbest aerofon',
      'Kamışlı aerofon',
      'Kenardan üflemeli aerofon',
      'Mekanik rezonatörlü aerofon'
    ],
    correctAnswer: 'Serbest aerofon',
    explanation: 'Didgeridoo, dudak titreşimiyle çalınan serbest aerofon kategorisindedir.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 11,
    type: 'multiple_choice',
    category: 'Tarihsel Çalgılar',
    question: 'Lur, hangi coğrafyanın tarihsel aerofonudur?',
    options: ['İskandinavya', 'Yunanistan', 'İran', 'Hindistan'],
    correctAnswer: 'İskandinavya',
    explanation: 'Lur, Bronz Çağı\'ndan kalma İskandinav bölgesine ait tarihsel bir borudur.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 12,
    type: 'multiple_choice',
    category: 'Tarihsel Katkı',
    question: 'Zurna, ney gibi çalgıların yer aldığı coğrafya, Hornbostel–Sachs sınıflandırmasında hangi tarihsel katkıyı sunmuştur?',
    options: [
      'İlk telli çalgıları geliştirmiştir',
      'İlk üflemeli çalgı örneklerini üretmiştir',
      'Elektronik ses sistemlerini geliştirmiştir',
      'Membranofon sınıflamasını ortaya koymuştur'
    ],
    correctAnswer: 'İlk üflemeli çalgı örneklerini üretmiştir',
    explanation: 'Orta Doğu ve Asya coğrafyası, tarihte ilk aerofon (üflemeli) çalgı örneklerini geliştirmiştir.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 13,
    type: 'multiple_choice',
    category: 'Afrika Aerofonları',
    question: 'Afrika\'daki "Animal Horn Trumpet"lerin temel sesi hangi unsurdan elde edilir?',
    options: [
      'Metal boru',
      'Ahşap tüp',
      'Hayvan boynuzu içindeki hava sütunu',
      'Deri zar'
    ],
    correctAnswer: 'Hayvan boynuzu içindeki hava sütunu',
    explanation: 'Afrika hayvan boynuzu trompetleri, boynuz içindeki hava sütununun titreşimiyle ses üretir.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 14,
    type: 'multiple_choice',
    category: 'Güneydoğu Asya',
    question: 'Güneydoğu Asya\'da görülen "Sringa" hangi malzemeden yapılır?',
    options: ['Bambu', 'Kemik', 'Metal', 'Kil'],
    correctAnswer: 'Bambu',
    explanation: 'Sringa, Güneydoğu Asya\'da bambudan yapılan geleneksel bir üflemeli çalgıdır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 15,
    type: 'multiple_choice',
    category: 'Tarihsel Kullanım',
    question: 'Orta Doğu\'nun geleneksel aerofonlarından biri olan boru, tarihsel olarak hangi amaçla kullanılmıştır?',
    options: [
      'Sadece dinsel törenlerde',
      'Askerî sinyalleşmede',
      'Tiyatro müziğinde',
      'Çocuk eğitimi için'
    ],
    correctAnswer: 'Askerî sinyalleşmede',
    explanation: 'Boru, tarihsel olarak ordu ve askerî sinyalleşme amacıyla yaygın kullanılmıştır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 16,
    type: 'multiple_choice',
    category: 'Batı Klasik Müziği',
    question: 'Horn (Korno) çalgısının kökeni aşağıdaki hangi türden evrimleşmiştir?',
    options: [
      'Çift kamışlı ahşap üflemeliler',
      'Av borusu (trompe de chasse)',
      'Metal ksilofon',
      'Klarnet prototipi'
    ],
    correctAnswer: 'Av borusu (trompe de chasse)',
    explanation: 'Modern korno, av borusu (French horn) geleneğinden evrimleşmiştir.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 17,
    type: 'multiple_choice',
    category: 'Teknik Özellikler',
    question: 'Trombonun diğer bakır nefeslilerden ayrılan teknik özelliği nedir?',
    options: [
      'Pistonlu valfler',
      'Sürgülü mekanizma',
      'Çift kamışlı bek',
      'Serbest hava sütunu'
    ],
    correctAnswer: 'Sürgülü mekanizma',
    explanation: 'Trombon, piston yerine sürgülü (slide) mekanizma kullanan tek bakır nefesli çalgıdır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 18,
    type: 'multiple_choice',
    category: 'Hornbostel-Sachs',
    question: 'Hornbostel–Sachs sisteminde tuba ve trompet hangi ana sınıfta yer alır?',
    options: ['Aerophone', 'Chordophone', 'Membranophone', 'Idiophone'],
    correctAnswer: 'Aerophone',
    explanation: 'Tuba ve trompet, hava ile ses ürettikleri için Aerophone sınıfındadır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 19,
    type: 'multiple_choice',
    category: 'Ortak Özellikler',
    question: 'Flüt, klarnet ve obua gibi çalgıların ortak özelliği nedir?',
    options: [
      'Telli mekanizma içerir',
      'Kamışlı nefesli olmaları',
      'Aerofon olmaları',
      'Deri membran kullanmaları'
    ],
    correctAnswer: 'Aerofon olmaları',
    explanation: 'Flüt, klarnet ve obua hepsi aerofon (üflemeli çalgı) sınıfına aittir. Not: Flüt kamışsızdır.',
    timeLimit: 60,
    points: 5
  },
  {
    order: 20,
    type: 'multiple_choice',
    category: 'Ses Üretim İlkesi',
    question: 'Yahudi geleneğinde kullanılan Shofar\'ın ses üretim biçimi hangi fiziksel ilkeye dayanır?',
    options: [
      'Kamışın titreşimi',
      'Dudak titreşimiyle boynuz içindeki hava sütununun rezonansı',
      'Metal plaka titreşimi',
      'Hava akımının keskin kenara çarpması'
    ],
    correctAnswer: 'Dudak titreşimiyle boynuz içindeki hava sütununun rezonansı',
    explanation: 'Shofar, dudak titreşimi (buzzing) ve boynuz içindeki hava sütununun rezonansı ile ses üretir.',
    timeLimit: 60,
    points: 5
  }
]
