<<<<<<< HEAD
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
=======
# 🍽️ Sistem Pemesanan Makanan di Kantin (SUKA-Canteen)

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Status](https://img.shields.io/badge/status-In%20Development-orange)
![Made with MySQL](https://img.shields.io/badge/Database-MySQL-lightgrey)

---

## 📖 Deskripsi Singkat

Sistem ini memungkinkan mahasiswa/siswa untuk memesan makanan di kantin melalui website sebelum datang ke kantin, sehingga mereka tidak perlu antre lama. Pemesanan dapat dilakukan berdasarkan menu harian yang disediakan oleh kantin. Selain itu, sistem ini memungkinkan pemilik kantin untuk mendaftarkan usaha mereka dan mengelola menu makanan serta pesanan secara mandiri.

---

## 🎯 Apa Tujuan Sistem Dibuat?

 ✅ Mengurangi antrean di kantin  
 ✅ Memudahkan pengelola kantin dalam mengelola stok makanan  
 ✅ Meningkatkan efisiensi dalam penyajian makanan  
 ✅ Memudahkan pemilik kantin untuk mendaftarkan usaha mereka  
 ✅ Memberikan variasi pilihan kantin kepada pengguna  

---

## 🔥 Fitur Utama

### 👥 Untuk Pengguna (Mahasiswa/Siswa)

🔹 **Registrasi & Login**  
🔹 **Melihat Daftar Kantin**  
🔹 **Melihat Menu Harian**  
🔹 **Melakukan Pemesanan**  
🔹 **Pembayaran Online / Opsi COD**  
🔹 **Riwayat Pemesanan**  

### 🏪 Untuk Pemilik Kantin

🔹 **Registrasi & Login sebagai Pemilik Kantin**  
🔹 **Mendaftarkan Kantin**  
🔹 **Mengelola Menu**  
🔹 **Melihat Daftar Pesanan**  
🔹 **Update Status Pesanan**  
🔹 **Laporan Harian/Bulanan**  

---

## 🧰 Tech Stack

Teknologi yang digunakan dalam pengembangan proyek ini:

### 🌐 Frontend (User Interface)

🔹**HTML, CSS, JavaScript** – Struktur dasar dan interaktivitas  
🔹**Tailwind CSS / Bootstrap** – Desain UI yang modern dan responsif  

### ⚙️ Backend (Server & API)

🔹**Node.js** – Runtime JavaScript untuk server-side  
🔹**Express.js** – Framework backend ringan untuk membangun REST API  
🔹**JWT** – Untuk autentikasi dan otorisasi pengguna  

### 🗄️ Database

🔹**MySQL** – Menyimpan data pengguna, kantin, menu, dan transaksi  

### 🧪 Testing & Tools

🔹**Postman** – Pengujian endpoint API  
🔹**Dotenv** – Manajemen konfigurasi lingkungan  

---

## 💻 Instalasi

```bash
# Clone repositori
git clone https://github.com/username/SUKA-Canteen.git

# Masuk ke direktori proyek
cd SUKA-Canteen

# Instal dependensi
npm install

# Konfigurasi lingkungan
cp .env.example .env
# Edit file .env sesuai kebutuhan

# Mulai server pengembangan
npm run dev
```

## 🔄 Bagaimana Alur Sistem Bekerja?

Berikut adalah alur penggunaan sistem SUKA-Canteen dari awal hingga akhir:

1. 🏪 **Pemilik Kantin Mendaftar dan Login**  
   Pemilik kantin membuat akun untuk mengelola kantin dan menu mereka.

2. 📝 **Menambahkan Informasi Kantin**  
   Nama, lokasi, jam operasional, dan deskripsi ditambahkan ke sistem.

3. 🍛 **Mengelola Menu Makanan**  
   Pemilik dapat menambahkan, mengedit, atau menghapus makanan dan minuman yang tersedia.

4. 👥 **Pengguna Login ke Sistem**  
   Mahasiswa atau siswa melakukan registrasi/login untuk mulai memesan makanan.

5. 🔍 **Melihat Daftar Kantin**  
   Pengguna dapat melihat semua kantin yang tersedia dan memilih salah satu.

6. 📋 **Melihat Menu Harian**  
   Pengguna melihat menu yang ditawarkan oleh kantin pilihan mereka.

7. 🛒 **Melakukan Pemesanan**  
   Pengguna memilih makanan, menentukan waktu pengambilan, dan memilih metode pembayaran (online/COD).

8. 📦 **Pemilik Menerima dan Mengelola Pesanan**  
   Pemilik memproses pesanan dan memperbarui status (diproses, siap diambil, selesai).

9. 🍽️ **Pengguna Mengambil Pesanan di Kantin**  
   Pengguna datang ke kantin sesuai waktu pengambilan tanpa harus mengantre.

---

## 👥 Tim Pengembang

Proyek ini dikerjakan oleh tim kecil menggunakan pendekatan **Extreme Programming (XP)** untuk menjaga kolaborasi, kualitas, dan kecepatan pengembangan.

### 🎯 Project Manager / Customer Representative  
**Bayu Wicaksono (02)**  
🔹Merancang kebutuhan sistem berdasarkan feedback pengguna  
🔹Menentukan prioritas fitur dan menyusun backlog  
🔹Berkomunikasi dengan pengguna untuk validasi  
🔹Terlibat dalam pengujian dan evaluasi fitur  

### ⚙️ Backend Developer  
**Salman Alfauzi Asngari (13)**  
🔹Mengembangkan sistem backend (autentikasi, pesanan, database)  
🔹Menggunakan Test-Driven Development (TDD)  
🔹Membangun REST API dan integrasi pembayaran  

### 🎨 Frontend Developer  
**Aisyah Ayudia Inara (20)**  
🔹Merancang UI/UX dengan desain yang responsif  
🔹Menghubungkan frontend dengan backend melalui API  
🔹Melakukan pengujian dan optimasi performa  

---

## 🗓️ Roadmap

Berikut adalah rencana pengembangan SUKA-Canteen untuk tahun 2025:

| Periode     | Status        | Fokus Utama                    |
|-------------|---------------|--------------------------------|
| Q1 2025     | 🌱 Coming Soon | Coming Soon |
| Q2 2025     | 🌿 Coming Soon | Coming Soon |
| Q3 2025     | 🌳 Coming Soon | Coming Soon |
| Q4 2025     | 🌲 Coming Soon | Coming Soon |

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah lisensi MIT:

```
MIT License

Copyright (c) 2025 SUKA-Canteen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
>>>>>>> 7b8df142fffc4502de863c81a6ea69f1a89b18ca
