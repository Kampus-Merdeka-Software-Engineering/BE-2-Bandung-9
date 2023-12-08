# HARAPAN POLYCLINIC  ![Alt Text](https://github.com/Kampus-Merdeka-Software-Engineering/FE-2-Bandung-9/blob/main/images/logohp.png?raw=true)

## Deskripsi 
Selamat datang di repositori Backend sisi server!. Website Harapan Polyclinic adalah website digunakan untuk melakukan pemesanan jadwal janji temu secara online dengan dokter yang ada di Harapan Polyclinic. Kami merupakan bagian dari Grup 09 Section Bandung RevoU MSIB KM AUG23.


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
| Railway           | Mendeploy server agar dapat terintegrasi dengan FE                                              |

---

## 🕹 Tutorial Pengerjaan Capstone

Berikut adalah tutorial untuk pembuatan website Harapan Polyclinic dari sisi server:

### Syarat Awal
- Pastikan telah menginstal Node.js yang dapat diunduh dari [Node.js website](https://nodejs.org/).
- Pastikan telah menginstal PostgreSQL yang dapat diunduh dari [PostgreSQL website](https://www.postgresql.org/).
- Pastikan telah mendaftarkan akun Cyclic dan hubungkan ke github repository Backend [Railway website](https://railway.app/).

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
3. Install package express dan cors

```bash
npm install express 
```

```bash
npm install cors 
```

4. Install devDependencies karena menggunakan nodemon.

```bash
npm install --save-dev nodemon
```
Selanjutnya akan terunduh folder node_modules dan package-lock.json. Buat file .gitignore yang berfungai untuk tidak memasukkan file tersebut ke github yang berisi node_modules dan .env.

5. Membuat file index.js yang berisi selanjutnya melakukan update pada `package.json` 

```json
"scripts": {
  "start": "node index.js",
  "start:dev": "nodemon index.js"
}
```

6. import package express, cors, dan lain-lain. Selanjutnya membuat satu rute untuk mencoba aplikasi.

7. lanjut dalam integrasi project ini dengan prisma agar kita bisa terhubung dengan database dan melakukan pengambilan/masukin data ke database dengan [Prisma website](https://prisma.io/).

8. inisialisasi proyek Node.js dan tambahkan Prisma CLI sebagai dependensi pengembangan ke dalamnya menggunakan JavaScript dengan database PostgreSQL:

```bash
npm init -y
npm install prisma --save-dev
```

9. Memanggil prisma

```bash
npx prisma
```

10. Membuat file schema
```
npx prisma init
```

11. Setelah diinstal terdapat file .env yang berisi Database_URL 


12. Setelah mendefinisikan model di `schema.prisma`dapat melakukan sinkronisasi database di PostgreSQL dengan schema yang sudah dibuat menggunakan kode:
`npx prisma db push`

13.  Agar dapat menggunakan Prisma ORM perlu menggunakan package `@prisma/client` untuk membuat koneksi dengan prisma dan melakukan operasi CRUD. Membuat file `config` dan diberi nama `prisma.js` dengan kode:

```bash
// prisma.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = { prisma };
```

14. Setelah dibuat menjadi suatu config, untuk bisa digunakan di file yang lain kita bisa langsung gunakan saja untuk mengambil data dari database atau hal yang lain seperti memasukkan data, update data, mengambil relasi, dan lain-lain.

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


## Contact Us

Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan hubungi kami:

- Email: harapanpolyclinic@gmail.com
- Phone: +62 123 456 789
- Loc: 123 Main Street, Jakarta, 78901, Indonesia.

## Terima Kasih

Kami mengucapkan terima kasih atas kunjungan Anda ke repository kami. Semoga website Harapan Polyclinic dapat bermanfaat bagi Anda dan memberikan kemudahan dalam mendapatkan layanan kesehatan.

Dengan rasa hormat,

Tim Harapan Polyclinic _Group 9 - Section Bandung_
