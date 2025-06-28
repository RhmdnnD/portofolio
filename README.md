Portofolio Dinamis dengan Admin Dasbor
Ini adalah proyek website portofolio pribadi yang sepenuhnya dinamis, dibangun menggunakan HTML, CSS, dan JavaScript murni. Semua konten, mulai dari teks, gambar, hingga daftar proyek dan keahlian, dapat dikelola melalui halaman admin yang terlindungi.

Fitur Utama
Sistem CRUD Penuh: Kelola semua bagian (Home, Tentang Saya, Skills, Edukasi, Pengalaman, Proyek, dll.) tanpa menyentuh kode.

Penyimpanan Lokal: Semua data disimpan di localStorage browser, membuatnya persisten di perangkat yang sama.

Desain Responsif: Tampilan yang menyesuaikan dengan baik di perangkat desktop maupun seluler.

Antarmuka Admin: Halaman admin khusus untuk mengelola konten website.

Struktur File
/
|-- index.html              // Halaman utama portofolio
|-- admin.html              // Dasbor admin untuk mengelola konten
|-- login.html              // Halaman login untuk admin
|-- 404.html                // Halaman error kustom (opsional tapi direkomendasikan)
|-- README.md               // File panduan ini
|
|-- css/
|   |-- style.css           // Semua gaya untuk website
|
|-- js/
|   |-- script.js           // Logika untuk halaman utama (index.html)
|   |-- admin.js            // Logika untuk dasbor admin (admin.html)
|   |-- login.js            // Logika untuk halaman login (login.html)
|
|-- img/
    |-- profil.png          // Gambar profil default
    |-- bulan.png           // Gambar animasi bulan
    |-- (gambar proyek lainnya)

Cara Kustomisasi
Mengubah Password Admin
Untuk mengubah password admin, buka file js/login.js dan ubah nilai pada variabel berikut:

// js/login.js

const adminUser = 'admin'; // Ubah username jika perlu
const adminPass = 'password123'; // Ganti ini dengan password baru yang lebih aman

Cara Hosting (Rekomendasi)
Website ini adalah website statis, yang berarti sangat mudah dan murah (bahkan gratis) untuk di-hosting. Berikut adalah platform yang direkomendasikan:

Netlify: Sangat mudah digunakan. Anda hanya perlu melakukan drag-and-drop folder proyek Anda.

Vercel: Mirip dengan Netlify, sangat cepat dan mudah untuk proyek frontend.

GitHub Pages: Pilihan gratis yang bagus jika Anda sudah menggunakan GitHub untuk menyimpan kode Anda.

Langkah-langkah umum (menggunakan Netlify sebagai contoh):

Siapkan Folder Proyek: Pastikan semua file (index.html, admin.html, css/, js/, dll.) berada dalam satu folder utama.

Daftar/Login ke Netlify: Buka netlify.com.

Drag & Drop: Di dasbor Netlify, Anda akan menemukan area bertuliskan "Drag and drop your site folder here". Cukup seret folder proyek Anda ke area tersebut.

Selesai: Netlify akan secara otomatis mengunggah dan memberikan Anda sebuah link publik (contoh: nama-unik-anda.netlify.app). Website Anda kini sudah online!

Domain Kustom (Opsional): Anda bisa dengan mudah menghubungkan domain kustom Anda sendiri melalui pengaturan di Netlify.