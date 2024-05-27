# FTI Organizer Hub
 Website Sistem Pengelolaan Organisasi dan Kegiatan Mahasiswa FTI untuk membantu civitas akademika Fakultas Teknologi Informasi dalam mencari informasi terkait kegiatan dan organisasi yang ada di lingkungan fakultas.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

## Instalasi
Buka terminal pada folder yang ingin dijadikan lokasi penyimpanan project:
```
git clone https://github.com/paybackretr0/SPOKM.git
```
Pindah ke folder clone project tadi:
```
cd SPOKM
```
Install dependensi:
```
npm install
```
Jalankan server Apache dan database MySQL pada XAMPP, lalu buat database sesuai pada konfigurasi database:
```
"development": {
    "username": "root",
    "password": null,
    "database": "spokm",
    "host": "localhost",
    "dialect": "mysql"
  },
```
Migrasi tabel dari Express ke Database dengan menjalankan syntax di bawah pada terminal:
```
npx sequelize-cli db:migrate
```
Jalankan seeder untuk mengirim data ke database dengan menjalankan syntax di bawah pada terminal:
```
npx sequelize-cli db:seed:all
```
Jalankan server Node.js dengan syntax:
```
nodemon src/index
```
Berikut langkah-langkah untuk push perubahan:
```
git branch (namaBranch) //Untuk membuat branch baru (Selalu buat branch baru saat ingin melakukan modifikasi)
git checkout namaBranch //Pindah ke branch yang dibuat tadi
git add .
git commit -m "pesan" //"pesan" diubah sesuai yang diinginkan
git push -u origin namaBranch //namaBranch adalah nama branch tempat melakukan tugas
```

