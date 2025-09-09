# 🔥 Firebase Setup Instructions

## Langkah 1: Buat Project Firebase

1. **Buka Firebase Console**
   - Kunjungi: https://console.firebase.google.com
   - Login dengan Google account Anda

2. **Buat Project Baru**
   - Klik "Create a project" atau "Add project"
   - Masukkan nama project: `my-portfolio` (atau nama lain yang Anda inginkan)
   - Pilih Google Analytics (opsional, bisa diaktifkan atau dimatikan)
   - Klik "Create project"

## Langkah 2: Setup Firestore Database

1. **Akses Firestore**
   - Di sidebar kiri, klik **"Firestore Database"**
   - Klik **"Create database"**

2. **Pilih Security Rules**
   - Pilih **"Start in test mode"** (untuk development)
   - Klik "Next"

3. **Pilih Location**
   - Pilih location server terdekat (misalnya: `asia-southeast1` untuk Singapore)
   - Klik "Done"

4. **Setup Collection**
   - Setelah database terbuat, akan ada opsi "Start collection"
   - Buat collection dengan nama: **`contacts`**
   - Add document pertama dengan data sample:
     ```
     name: "Test User"
     email: "test@example.com"
     whatsapp: "081234567890"
     project: "Test project description"
     timestamp: (pilih timestamp type dan biarkan otomatis)
     status: "new"
     ```

## Langkah 3: Setup Web App

1. **Register Web App**
   - Di Firebase console, klik ⚙️ (Settings) di sebelah "Project Overview"
   - Pilih "Project settings"
   - Scroll ke bawah, klik tombol **"</>"** (Web app icon)
   - Beri nama app: `portfolio-web`
   - **JANGAN** centang "Also set up Firebase Hosting"
   - Klik "Register app"

2. **Copy Configuration**
   - Setelah register, akan muncul Firebase configuration object
   - **COPY** semua nilai ini:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "my-portfolio-xxx.firebaseapp.com",
     projectId: "my-portfolio-xxx",
     storageBucket: "my-portfolio-xxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```

## Langkah 4: Update Environment Variables

1. **Edit file `.env`**
   - Buka file `.env` di root folder project Anda
   - Ganti semua nilai dengan yang dari Firebase:

   ```env
   REACT_APP_FIREBASE_API_KEY=AIza_your_actual_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

   **Contoh:**
   ```env
   REACT_APP_FIREBASE_API_KEY=AIzaSyBqBhX9p2nF_example_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=my-portfolio-12345.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=my-portfolio-12345
   REACT_APP_FIREBASE_STORAGE_BUCKET=my-portfolio-12345.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=987654321
   REACT_APP_FIREBASE_APP_ID=1:987654321:web:abcdef123456
   ```

## Langkah 5: Setup Security Rules (Opsional tapi Disarankan)

1. **Update Firestore Rules**
   - Di Firestore console, klik tab **"Rules"**
   - Ganti rules dengan yang lebih aman:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /contacts/{document} {
         allow write: if true;  // Izinkan write dari form
         allow read: if false;  // Tidak perlu read dari frontend
       }
     }
   }
   ```
   - Klik **"Publish"**

## Langkah 6: Test Form

1. **Restart Development Server**
   ```bash
   npm start
   ```

2. **Test Form Submission**
   - Buka website di browser
   - Scroll ke section "Let's Work Together"
   - Isi form dengan data test
   - Klik "Kirim Pesan"
   - Jika berhasil, akan muncul message hijau

3. **Cek di Firebase Console**
   - Buka Firestore Database di Firebase console
   - Klik collection "contacts"
   - Anda akan melihat data yang baru saja dikirim dari form

## Langkah 7: View Submitted Forms

**Untuk melihat form yang masuk:**
1. Login ke Firebase Console
2. Pilih project Anda
3. Klik "Firestore Database"
4. Klik collection "contacts"
5. Semua form submission akan terlihat di sini dengan data:
   - name
   - email
   - whatsapp
   - project
   - timestamp
   - status

## 🛡️ Security Notes

1. **Environment Variables**: Pastikan file `.env` tidak di-commit ke Git (sudah ada di .gitignore)
2. **API Keys**: Firebase API keys aman untuk public exposure untuk web apps
3. **Rules**: Update Firestore rules untuk production dengan rules yang lebih ketat
4. **Monitoring**: Aktifkan monitoring di Firebase untuk melihat usage dan detect abuse

## 🚀 Production Deployment

Ketika deploy ke production (Netlify/Vercel):
1. Set environment variables di platform deployment
2. Update Firebase security rules jika perlu
3. Monitor usage di Firebase console

## 📞 Troubleshooting

**Form tidak submit?**
1. Cek console browser untuk error messages
2. Pastikan semua environment variables sudah benar
3. Cek Firebase console untuk connection issues

**Permission denied?**
1. Cek Firestore security rules
2. Pastikan collection name "contacts" benar

**Build error?**
1. Pastikan Firebase dependency sudah terinstall: `npm install firebase`
2. Restart development server