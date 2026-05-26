# Gym Plus Management System

Selamat datang di repositori backend **LYFTR (Gym Plus Management System)**. Dokumentasi ini dibuat untuk membantu tim frontend memahami arsitektur, alur kerja (workflow) aplikasi, konfigurasi, serta cara berkomunikasi dengan backend.

---

## 🚀 Teknologi yang Digunakan
Backend ini dibangun menggunakan stack modern:
- **Core Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) (menggunakan driver `mysql2/promise` untuk penanganan async/await)
- **Autentikasi**: JWT (JSON Web Token) dengan skema Bearer Token
- **Validasi Data**: [Joi Validator](https://joi.dev/) untuk validasi request payload
- **Dokumentasi API**: OpenAPI 3.0 (Swagger)

---

## 🛠️ Instalasi & Konfigurasi Lokal

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Rekomendasi versi LTS terbaru)
- MySQL Server (misal via XAMPP, Laragon, atau MySQL installer mandiri)

### 2. Setup Environment Variables
Buat file bernama `.env` pada direktori root backend (`/backend/.env`). Isi dengan variabel berikut dan sesuaikan konfigurasinya:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=            # Isi password database Anda jika ada
DB_NAME=gym_plus        # Nama database MySQL yang digunakan
PORT=5000
```

### 3. Mengunduh Dependensi
Jalankan perintah berikut di terminal pada direktori root backend untuk menginstal semua library:
```bash
npm install
```

### 4. Menjalankan Server
Untuk mode pengembangan dengan auto-reload (menggunakan nodemon):
```bash
npm run dev
```
Server akan berjalan di: `http://localhost:5000`

---

## 🔄 Alur & Proses Aplikasi (App Workflows)

Untuk membantu integrasi di sisi Frontend, berikut adalah penjelasan alur bisnis utama sistem:

### 1. Autentikasi Admin (Admin Login)
- Halaman admin membatasi akses fitur manajemen.
- Proses masuk menggunakan endpoint `/auth/login`. Jika berhasil, backend mengembalikan **JWT Bearer Token**.
- **Penting**: Semua request API yang membutuhkan otorisasi (diberi tanda gembok di Swagger) harus menyertakan header berikut:
  ```http
  Authorization: Bearer <JWT_TOKEN_ANDA>
  ```

### 2. Alur Pendaftaran & Manajemen Member
- **Registrasi Member**: Pendaftaran member dilakukan melalui `POST /members`. Backend akan otomatis men-generate ID unik berformat `MBR1xxx` (misal: `MBR1001`, `MBR1002`).
- **Registrasi Fingerprint**: Setelah member terdaftar, admin dapat meregistrasikan template sidik jari mereka melalui `POST /members/{id}/fingerprint`. Payload yang dikirim berupa string unik template sidik jari (`fingerprint_template`).

### 3. Pembelian & Aktivasi Membership
- Member yang baru didaftarkan belum memiliki membership aktif (status: `null` atau `Expired`).
- Untuk mengaktifkannya, gunakan `POST /memberships`.
- **Aturan Bisnis**:
  - Mengaktifkan membership baru otomatis akan mengubah status membership lama member tersebut menjadi `Expired` (jika ada yang masih berjalan).
  - Sistem otomatis mencatat riwayat pembayaran tunai (*cash transaction*) di database saat membership baru berhasil dibuat.
  - Status member akan terupdate menjadi `Active`.

### 4. Presensi / Kehadiran (Attendance)
Ada dua metode untuk mencatat kehadiran:
- **Metode Manual**:
  - Menggunakan ID Member melalui `POST /attendance/entry` (untuk check-in) dan `POST /attendance/exit` (untuk check-out).
- **Metode Biometrik (Sidik Jari)**:
  - Menggunakan endpoint tunggal `POST /attendance/biometric`.
  - Frontend mengirimkan string sidik jari (`fingerprint_template`).
  - **Aturan Logika**:
    1. Sistem mencari member berdasarkan template sidik jari yang cocok.
    2. Sistem mengecek status membership. Jika tidak `Active`, proses check-in ditolak (error `400`).
    3. Jika lolos validasi dan member belum check-in hari ini, sistem mencatat status sebagai **Check-in**.
    4. Jika member sudah check-in hari ini dan belum check-out, sistem otomatis mencatat status sebagai **Check-out**.

### 5. Pembayaran (Payments)
- Halaman dashboard keuangan menampilkan metrics pendapatan bulanan, total, serta pembayaran tertunda.
- Riwayat transaksi terekam otomatis setiap kali membership diaktifkan, dan admin juga dapat mencatat transaksi manual melalui `POST /payments`.

---

## 📖 Dokumentasi API (Swagger)

Seluruh spesifikasi endpoint, struktur request payload (Joi validation), format response (Success/Error), dan tipe parameter dapat diakses secara detail pada dokumentasi Swagger.

- **File Dokumentasi**: [swagger.yaml](file:///d:/ai-lab-intern/projects/LYFTR/backend/docs/swagger.yaml)
- **Cara Membaca / Menampilkan**:
  - Anda dapat mengimpor file [swagger.yaml](file:///d:/ai-lab-intern/projects/LYFTR/backend/docs/swagger.yaml) ke [Swagger Editor Online](https://editor.swagger.io/).
  - Jika menggunakan VS Code, Anda bisa menginstal ekstensi **Swagger Viewer** atau **OpenAPI Preview** lalu menekan pintasan `Shift + Alt + P` untuk melihat preview grafis interaktifnya langsung di editor.
