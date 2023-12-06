# HARAPAN POLYCLINIC  ![Alt Text](https://github.com/Kampus-Merdeka-Software-Engineering/FE-2-Bandung-9/blob/main/images/logohp.png?raw=true)

## Deskripsi 
Selamat datang di repository Backend Harapan Polyclinic. Proyek ini bertujuan memberikan pengalaman user untun melakukan pemesanan dokter yang lebih baik dan terorganisir secara online melalui situs web resmi Harapan Polyclinic.

## Tools yang digunakan pada Backend

Node.js adalah platform JavaScript yang digunakan untuk membuat aplikasi web dan server. Dalam proyek ini, Node.js digunakan untuk membuat server HTTP yang melayani berbagai permintaan dari klien. Permintaan tersebut meliputi permintaan untuk mendapatkan informasi tentang layanan Harapan Polyclinic, melakukan pemesanan online, dan pembaruan status pemesanan online di website.

Express.js adalah kerangka kerja aplikasi web Node.js yang minimalis dan fleksibel. Express.js memungkinkan developer untuk membuat aplikasi web dengan cepat dan mudah. Express.js juga memiliki banyak fitur yang berguna seperti routing, middleware, dan template engine.

PostgreSQL adalah sistem manajemen basis data relasional (RDBMS) yang open source dan kuat. PostgreSQL cocok untuk menyimpan data dalam jumlah besar karena memiliki performa yang baik dan fitur yang lengkap. Dalam proyek ini, PostgreSQL digunakan untuk menyimpan data tentang pasien, dokter, jadwal praktik, dan pemesanan online. Data tersebut diakses oleh server Node. js melalui API PostgreSQL.

Railway adalah alat penerapan yang open source dan mudah digunakan. Railway cocok untuk penerapan aplikasi backend yang dibangun menggunakan Node.js. Dalam proyek ini, Railway digunakan untuk mendeploy aplikasi backend ke server produksi. Railway secara otomatis akan membangun aplikasi dari kode sumber, menginstal dependensi, dan menjalankan aplikasi.

---
Tutorial dalam pembuatan server Backend Harapan Polyclinic:
1. Buat terlebih dahulu file JavaScrip yang akan digunakan untuk membuat sever (app.js, server js. atau index.js).
2. Install terlebih dahulu aplikasi Node.js. Setelah itu buka terminal di aplikasi VSCode. Pastikan di terminal sudah di setting default untuk Git Bash. Selanjutnya run kode JavaScript dan buka terminal lalu jalankan kode ````npm init -y ```` menghasilkan output package.json.
3. Selanjutnya menginstall package ````npm install expres```` menghasilkan output folder node modules dan package-log.json.
4. Membuat database di PostgreSQL. Membuat database yang bernama db_clinic. Selanjutnya buka query tool untuk codingan membuat tabel user accounts dan tabel appointment untuk menyimpan data dari website.
5. Testing server apakah sudah berfungsi menu register, login, dan appointment dari FE.
6. Selanjutnya menginstall package ````npm install prisma --save-dev```` , ````npx prisma````, ````npx prisma init```` menghasilkan output folder prisma, .env, dan .gitignore
7. Push semua file ke Github
8. Deployment menggunakan Railway. Pertama hubungkan akun Railway dengan akun Github Kampus-Merdeka-Software-Engineering
/ BE-2-Bandung-9. Setelah masuk muncul tampilan hitam dimana kita bisa klik kanan lalu memilih repository dari Kampus-Merdeka-Software-Engineering/ BE-2-Bandung-9 dan tunggu beberapa saat sehingga tampilannya sudah ada di halaman Railway. Selanjutnya klik kanan untuk memasukan database dan pilih PostgreSQL dan tunggu beberapa saat hingga tampilannya sudah ada di halaman Railway
9.

## Team 9 Section Bandung
**HARAPAN POLYCLINIC** adalah project akhir dari Sofware Engineering yang telah dibangun dan diselesaikan oleh _group 9 Section Bandung KM AUG23_, MSIB (RevoU x MSIB Kemndikbudristek).
Dimana perancangan dan pengembangan website ini dikembangkan oleh :

|  Nama      | Role | 
|----------|----------|
| Vincentius Vito Valentino   | Project Leader  | 
| Fira Hanasti          | Frontend Development | 
| Edwina Jerusalem | Frontend Development  |
| Mochamad Rizky   | Backend Development |
| Ida Ayu Agung Diah Janawati  | Backend Development |
| Amirul Akbar   | Quality Assurance   |
| Egia Ninta Ginting  |  Quality Assurance |


