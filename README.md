# B4 GAME STATION

Aplikasi kasir dan rental konsol game untuk tempat main PlayStation, Nintendo Switch, dan Xbox. Satu halaman web, berjalan di HP, tablet, atau laptop, dengan data yang tersinkron langsung ke semua perangkat lewat Firebase.

## Fitur

- **Unit dan timer**: kartu per unit dengan gambar konsol, hitung mundur, bunyi peringatan 10 menit, 5 menit, dan saat waktu habis.
- **Paket rental**: paket per jam, main bebas (dibulatkan per N menit), dan promo hari kerja (misalnya main 2 jam gratis 1 jam).
- **Pesanan**: jual minuman dan camilan ke unit yang sedang main, atau langsung tanpa rental. Stok berkurang otomatis.
- **Checkout**: tunai (dengan hitung kembalian), QRIS, atau transfer. Struk bisa dicetak (58 mm atau 80 mm) atau disimpan.
- **Laporan**: pendapatan rental dan produk, per metode bayar, pemakaian unit, pemakaian promo, ekspor CSV.
- **Akun staf**: Admin dan Kasir, login dengan email dan kata sandi.
- **Keamanan di server** ([firestore.rules](firestore.rules)): orang tanpa akun tidak bisa membaca data; diskon, pembatalan, dan pengaturan hanya untuk Admin; transaksi tidak bisa diubah atau dihapus.

## Pasang sendiri

Yang dibutuhkan: [Node.js](https://nodejs.org) versi LTS dan akun Google.

1. Buat project di [Firebase Console](https://console.firebase.google.com).
2. Di project itu, aktifkan **Firestore Database** dan **Authentication → Sign-in method → Email/Password**.
3. Unduh kode ini, lalu jalankan:

   ```bash
   npm install
   npx firebase login
   npx firebase use --add        # pilih project Firebase Anda
   npx firebase apps:create web b4-web
   npm run deploy
   ```

4. Buka alamat `https://<project-id>.web.app`, buat akun Admin pertama, lalu tekan **Mulai baru** untuk membuat 16 unit dengan tarif default. Semua bisa diubah di **Pengaturan**.

Aplikasi mengambil konfigurasi Firebase otomatis dari Firebase Hosting (`/__/firebase/init.json`), jadi tidak ada kunci yang perlu ditulis ke kode.

## Struktur

| File | Isi |
| --- | --- |
| `public/index.html` | Seluruh aplikasi (HTML, CSS, JavaScript) |
| `firestore.rules` | Aturan keamanan database |
| `firebase.json` | Pengaturan Firebase Hosting |
| `import.js` | Opsional: impor data JSON lewat kunci service account |

## Lisensi

Kode: [MIT](LICENSE).

Logo B4 GAME STATION (`public/logo.png`, `public/logo-256.png`, `public/icon-*.png`) adalah milik B4 GAME STATION dan **tidak** termasuk lisensi MIT. Kalau memakai kode ini untuk usaha Anda sendiri, ganti file logo tersebut dengan logo Anda.
