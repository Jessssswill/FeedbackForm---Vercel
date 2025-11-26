1. # 🚀 BNCC Feedback System - Quest Rolling Week

**Divisi Research and Development (RnD) - BNCC 37**

Website **Feedback Management System** modern yang dirancang untuk mengumpulkan dan mengelola ulasan acara internal BNCC. Aplikasi ini dibangun menggunakan arsitektur **Client-Server** dengan tampilan **Dark Mode Glassmorphism** yang futuristik dan interaktif.


## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS (Custom Glassmorphism UI)
* **Backend:** Node.js, Express.js
* **Database:** Local JSON File Storage (`data.json`) - *Persisten tanpa database SQL/NoSQL eksternal.*
* **Tools:** Git, Axios, Phosphor Icons/SVG.


## ✨ Fitur Unggulan

### 🎨 User Interface (Frontend)
* **Premium Dark Mode:** Tampilan visual modern dengan dekorasi *glowing orbs*.
* **Glassmorphism Effect:** Panel semi-transparan dengan efek *blur* yang estetis.
* **Smooth Animations:** Transisi halaman, *hover effects*, dan *modal popup* yang halus.
* **Responsive Design:** Layout yang menyesuaikan layar (Grid & Flexbox).

### ⚙️ Admin Dashboard (Backend & Logic)
* **Real-time Statistics:** Ringkasan jumlah feedback, rata-rata rating, dan status *pending*.
* **Advanced Filtering:** Filter berdasarkan status (**Open**, **In-Review**, **Resolved**).
* **Smart Sorting:** Urutkan data berdasarkan **Terbaru** atau **Rating Tertinggi**.
* **Live Search:** Pencarian data peserta atau nama event secara instan.
* **Export Data:** Fitur unduh data ke format **CSV/Excel** untuk pelaporan.
* **CRUD Lengkap:** Create (Form), Read (Table), Update (Status & Comment), Delete.


## 💻 Cara Menjalankan (Run Lokal)

Pastikan **Node.js** sudah terinstal di komputer Anda.

### 1. Clone Repository
```bash
### 1. Clone Repository
```bash
git clone https://github.com/Jessssswill/BNCC-Feedback-Quest.git
cd BNCC-Feedback-Quest


### 2. Jalankan Backend (server)
```bash
cd server
npm install
node index.js    

### 3. Jalankan Frontend (client)
``` bash
cd client
npm install
npm start

### 4. Struktur project
```bash
root/
├── server/             # Backend (Express API)
│   ├── data.json       # File Database Lokal
│   ├── index.js        # Server Entry Point & API Routes
│   └── package.json
│
├── client/             # Frontend (React Application)
│   ├── src/
│   │   ├── App.js      # Logika Utama UI & Fitur
│   │   └── index.css   # Tailwind Configuration
│   └── package.json
│
├── .gitignore          # Konfigurasi Git
└── README.md           # Dokumentasi Project

### 5. API ENDPOINTS
```bash
GET	    /api/feedback	    Mengambil seluruh data feedback
POST	/api/feedback	    Mengirim feedback baru dari form
PUT	    /api/feedback/:id	Mengupdate status atau komentar (Admin)
DELETE	/api/feedback/:id	Menghapus data feedback