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
