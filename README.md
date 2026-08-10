# Kimya Pembe — tamamlanmış uygulama projesi

Android tablet ve iPhone 15 Pro Max dahil iOS cihazlar için Expo/React Native tek kod tabanı.

## İçerik
- 9, 10, 11 ve 12. sınıf için ayrı test menüleri
- 9 ve 10. sınıf yeni MEB/Türkiye Yüzyılı Maarif Modeli konu yapısı
- Konu, 5/10/15/20/30 soru ve Kolay/Orta/Zor/Karma zorluk seçimi
- Pembe/pudra responsive telefon + tablet arayüzü
- Anında doğru/yanlış geri bildirimi, açıklama ve kaynak notu
- Test sonunda puan, yüzde başarı ve tüm soruları inceleme
- Yanlış soruları cihazda saklama; yanlışlardan tekrar testi; doğru yapılanı yanlış listesinden çıkarma
- Test geçmişi ve ana sayfada çözüm/başarı istatistiği
- AsyncStorage ile cihazda kalıcı kayıt
- Hata toleranslı soru motoru: tamamlanan sorular sıfırlanmaz, eksik paket yeniden denenir
- Çevrim içi AI endpoint'i varsa en fazla 5'li batch; endpoint yoksa veya hata verirse yerel MEB-kapsamlı soru motoru testi tamamlar
- API anahtarını mobil uygulamaya gömmeyen mimari

## Kurulum / kontrol
```bash
npm install
npm run typecheck
npx expo start
```

## İsteğe bağlı AI endpoint
`.env`:
```
EXPO_PUBLIC_QUESTION_API_URL=https://sunucunuz.example/api/questions
```
Sunucu `{ questions: Question[] }` JSON döndürmelidir. API anahtarı mobil pakete konulmamalıdır.

## APK aşaması
Projeyi Android native çıktıya hazırlamak için Expo/EAS veya `npx expo prebuild` + Gradle kullanılabilir. Bu pakette uygulama kaynak kodu tamamlanmıştır; bir sonraki adım APK derlemesidir.
