# Kazdıkça: yayın rehberi

## Klasörler

| Klasör | İçerik |
|---|---|
| `yerin-alti.html` | Oyunun kendisi (tek dosya; artifact ve uygulama buradan üretilir) |
| `app/` | Capacitor projesi: `android/`, `ios/`, simge ve açılış ekranı kaynakları |
| `store/icon/` | Simge: SVG katmanları, iOS 1024 px, Google Play 512 px |
| `store/screenshots/ios/` | iPhone 6.9" ekran görüntüleri, 1290 × 2796 (6 adet) |
| `store/screenshots/android/` | Telefon ekran görüntüleri, 1080 × 1920 (6 adet) |
| `store/screenshots/play-feature-1024x500.png` | Google Play öne çıkan görsel |
| `store/video/kazdikca-oyun-ici-886x1920.mp4` | App Store uygulama önizlemesi (24 sn, oyun içi) |
| `store/video/kazdikca-tanitim-1080x1920.mp4` | Tanıtım videosu (30 sn; YouTube, Play Store, sosyal medya) |
| `store/magaza-metinleri.md` | Ad, alt başlık, açıklamalar, anahtar kelimeler, gizlilik metni |

Uygulama kimliği (bundle ID / package name): `com.kazdikca.app`. İlk yüklemeden sonra değiştirilemez; değiştirmek istersen şimdi `app/capacitor.config.json`, `app/android/app/build.gradle` ve iOS projesinde değiştir.

## Android

### Telefona test için kurmak
1. GitHub’da **Actions › Android** çalışmasını aç (her push’ta otomatik çalışır).
2. Sayfanın altındaki **kazdikca-android** dosyasını indir, içindeki `app-debug.apk`’yı telefona at.
3. Telefonda “bilinmeyen kaynaklardan yükleme” iznini verip kur.

### Google Play’e yüklemek
1. [Google Play Console](https://play.google.com/console) hesabı aç (tek seferlik 25 USD).
2. İmza anahtarını bir kez oluştur ve **güvenli bir yerde sakla** (kaybolursa güncelleme yayınlayamazsın):
   ```
   keytool -genkeypair -v -keystore kazdikca-release.jks -alias kazdikca -keyalg RSA -keysize 2048 -validity 10000
   base64 -w0 kazdikca-release.jks > kazdikca-release.b64
   ```
3. GitHub › Settings › Secrets and variables › Actions altına ekle:
   `KAZDIKCA_KEYSTORE_BASE64` (b64 dosyasının içeriği), `KAZDIKCA_KEYSTORE_PASSWORD`, `KAZDIKCA_KEY_ALIAS` (`kazdikca`), `KAZDIKCA_KEY_PASSWORD`.
4. Actions › Android’i yeniden çalıştır; artık `app-release.aab` da üretilir.
5. Play Console’da uygulama oluştur, mağaza metinlerini, simgeyi (512), öne çıkan görseli, ekran görüntülerini gir; veri güvenliği formunu “veri toplanmıyor” olarak doldur; AAB’yi önce **Dahili test**’e yükle.
6. Yeni Play hesaplarında üretime çıkmadan önce kapalı testte 12 test kullanıcısının 14 gün denemesi şartı var.

## iOS

iOS uygulaması yalnızca Mac üzerinde Xcode ile imzalanıp yüklenebilir.

1. [Apple Developer Program](https://developer.apple.com/programs/) üyeliği (yıllık 99 USD).
2. Mac’te:
   ```
   cd app
   npm ci
   npm run build
   npx cap open ios
   ```
3. Xcode’da **App › Signing & Capabilities** altında kendi Team’ini seç.
4. **Product › Archive**, ardından **Distribute App › App Store Connect**.
5. [App Store Connect](https://appstoreconnect.apple.com)’te uygulamayı oluştur; metinleri, 6.9" ekran görüntülerini, uygulama önizleme videosunu, gizlilik etiketini (“Veri Toplanmıyor”) gir; önce **TestFlight** ile kendi telefonunda dene, sonra incelemeye gönder.

GitHub’daki **Actions › iOS** (elle başlatılır) projenin derlendiğini simülatör derlemesiyle doğrular; imzalı bir uygulama üretmez.

## Güncelleme yayınlamak
1. Oyunu `yerin-alti.html` içinde değiştir.
2. Android: push et, Actions yeni sürüm numarasıyla APK/AAB üretir.
3. iOS: Xcode’da `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` artır, `npm run build`, Archive.
