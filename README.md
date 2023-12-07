# HARAPAN POLYCLINIC  ![Alt Text](https://github.com/Kampus-Merdeka-Software-Engineering/FE-2-Bandung-9/blob/main/images/logohp.png?raw=true)

## Deskripsi 
Selamat datang di repositori Backend sisi server! Harapan Polyclinic adalah website digunakan untuk melakukan pemesanan jadwal secara online dokter yang ada di Harapan Polyclinic. Kami merupakan bagian dari Grup 09 Section Bandung RevoU MSIB KM AUG23.


## Teknologi 
Website Harapan Polyclinic dibangun menggunakan teknologi:

| Teknologi         | Keterangan                                                                                      |
|-------------------|-------------------------------------------------------------------------------------------------|
| HTML              | Membuat struktur dasar situs web.                                                               |
| CSS               | Bertanggung jawab atas tampilan dan gaya situs web.                                             |
| JavaScript (JS)   | Menambahkan interaktivitas ke dalam situs web.                                                  |
| Node.js           | Menjalankan sisi server proyek.                                                                 |
| Express           | Framework Node.js yang digunakan untuk pengembangan web yang cepat.                             |
| PostgreSQL        | Menyimpan data tentang data pasien, dokter, jadwal praktik, dan pemesanan secara online         |
| Railway           | Mendeploy aplikasi backend ke server agar dapat terintegrasi dengan FE                          |

---

## 🕹 Tutorial Pengerjaan Capstone

Berikut adalah tutorial untuk pembuatan website Harapan Polyclinic dari sisi server:

### Syarat Awal
- Pastikan telah menginstal Node.js yang dapat diunduh dari [Node.js website](https://nodejs.org/).
- Pastikan telah menginstal PostgreSQL yang dapat diunduh dari [PostgreSQL website](https://www.postgresql.org/)
- Pastikan telah mendaftarkan akun Railway dan hubungkan ke github repository Backend [Railway website](https://railway.app/)

### Langkah-Langkah
1. Inisiasi project npm
```bash
npm init -y
```
2. Pada package.json ganti start dengan node server.js dan tambahkan start:dev
```
"script": {
    "start": "node server.js",
    "start:dev": "nodemon server.js"
},
```
3. Install package express

```bash
npm install express 
```

4. Install devDependencies karena menggunakan nodemon.

```bash
npm install --save-dev nodemon
```
Selanjutnya akan terunduh folder node_modules dan package-lock.json. Buat file .gitignore yang berfungai untuk tidak memasukkan file tersebut ke github yang berisi node_modules dan .env.


### 

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


