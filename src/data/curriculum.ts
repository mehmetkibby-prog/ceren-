import { Grade } from '../types';

type CurriculumItem = { title: string; badge: string; officialBasis: string; topics: string[] };

export const curriculum: Record<Grade, CurriculumItem> = {
  9: {
    title: '9. Sınıf Kimya', badge: 'Yeni Müfredat', officialBasis: 'MEB Türkiye Yüzyılı Maarif Modeli – 9. Sınıf',
    topics: [
      'Tüm Konular',
      'Etkileşim • Kimya Hayattır',
      'Etkileşim • Kimyasal Maddeler ve Güvenlik',
      'Etkileşim • Atom Teorileri ve Atomun Yapısı',
      'Etkileşim • Orbitaller ve Elektron Dizilimi',
      'Etkileşim • Periyodik Tabloda Yer Bulma',
      'Etkileşim • Periyodik Özellikler',
      'Çeşitlilik • Kimyasal Türler Arası Etkileşimler',
      'Çeşitlilik • Moleküller ve Bileşikler',
      'Çeşitlilik • Maddenin Hâlleri',
      'Sürdürülebilirlik • Kimya ve Çevre'
    ]
  },
  10: {
    title: '10. Sınıf Kimya', badge: 'Yeni Müfredat', officialBasis: 'MEB Türkiye Yüzyılı Maarif Modeli – 10. Sınıf',
    topics: [
      'Tüm Konular',
      'Etkileşim • Kimyasal Tepkimeler',
      'Etkileşim • Mol Kavramı',
      'Etkileşim • Stokiyometri',
      'Etkileşim • Gazlar',
      'Çeşitlilik • Çözeltiler',
      'Çeşitlilik • Çözünürlük',
      'Çeşitlilik • Asitler, Bazlar ve Tuzlar',
      'Sürdürülebilirlik • Kimya ve Çevre',
      'Sürdürülebilirlik • Yeşil Kimya ve Kaynak Kullanımı'
    ]
  },
  11: {
    title: '11. Sınıf Kimya', badge: 'MEB Lise', officialBasis: 'MEB 11. Sınıf Kimya öğretim programı ve ders içeriği',
    topics: ['Tüm Konular','Modern Atom Teorisi','Gazlar','Sıvı Çözeltiler ve Çözünürlük','Kimyasal Tepkimelerde Enerji','Kimyasal Tepkimelerde Hız','Kimyasal Tepkimelerde Denge']
  },
  12: {
    title: '12. Sınıf Kimya', badge: 'MEB Lise', officialBasis: 'MEB 12. Sınıf Kimya öğretim programı ve ders içeriği',
    topics: ['Tüm Konular','Kimya ve Elektrik','Karbon Kimyasına Giriş','Organik Bileşikler','Enerji Kaynakları ve Bilimsel Gelişmeler']
  }
};
