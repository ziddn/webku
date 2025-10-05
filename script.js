let recipientName = "";
// GANTI INI: Jawaban teka-teki tahap 1 (ZIDAN)
const correctRiddleAnswer = "ZIDAN";
// GANTI INI: Jawaban teka-teki tahap 2 (LAYA)
const correctRiddleAnswer2 = "LAYA";
// GANTI INI: Tanggal lahir yang benar (DDMMYYYY)
const correctLockCode = "10012006"; 

// Pesan Ulang Tahun yang akan diketik 
const birthdayMessage = [
    "Aku tahu hari ini adalah hari yang sangat spesial untukmu. Walaupun kita mungkin sudah lama tidak bertemu, aku ingin kamu tahu bahwa aku tidak pernah melupakan momen persahabatan kita di masa lalu.",
    "Kamu selalu menjadi salah satu orang yang paling ceria dan penuh semangat yang pernah aku kenal. Aku harap di hari ulang tahunmu ini, semua kebahagiaan dan kebaikan yang kamu sebarkan kembali padamu berlipat ganda.",
    "Ini adalah perjalanan kecil yang aku buat untukmu. Aku harap kamu suka dengan kejutan sederhananya!",
    "Semoga panjang umur, sehat selalu, dan semua impianmu tercapai. Jangan pernah berhenti tersenyum, ya! 🥰"
];


// ===================================
// FUNGSI NAVIGASI
// ===================================

function changePage(fromPageId, toPageId, delay = 0) {
    const fromPage = document.getElementById(fromPageId);
    const toPage = document.getElementById(toPageId);

    if (fromPage) {
        fromPage.classList.remove('active');
        setTimeout(() => {
            fromPage.style.display = 'none';
        }, 1000); 
    }

    if (toPage) {
        setTimeout(() => {
            toPage.style.display = 'flex';
            void toPage.offsetWidth; 
            toPage.classList.add('active');
            
            // Aktifkan animasi content-box setelah pindah halaman
            const contentBox = toPage.querySelector('.content-box');
            if (contentBox) {
                 // Reset animasi agar bisa diulang
                 contentBox.style.animation = 'none'; 
                 void contentBox.offsetWidth; // Trigger reflow
                 contentBox.style.animation = 'bounceInUp 1.5s ease-out forwards'; 
                 contentBox.style.opacity = '1';
            }
        }, delay);
    }
}

function goToPage2() {
    recipientName = document.getElementById('recipientName').value.toUpperCase().trim();
    if (recipientName.length < 2) {
        alert("Nama panggilanmu harus diisi dulu, ya!");
        return;
    }
    
    // Putar musik (jika belum berjalan)
    const music = document.getElementById('backgroundMusic');
    if (music && music.paused) {
        music.volume = 0.5; // Set volume awal
        music.play().catch(e => console.log("Autoplay blocked:", e));
    }

    // Tampilkan nama di halaman 2
    document.getElementById('page2-greeting').textContent = `Hai ${recipientName}!`;
    changePage('page1', 'page2');
}

// Navigasi ke Halaman 3 (Riddle 2)
function goToPage3() {
    changePage('page2', 'page3');
}

// Navigasi ke Halaman 4 (Lock Code)
function goToPage4() {
    changePage('page3', 'page4');
}

// Navigasi ke Halaman 5 (Akhir)
function goToPage5() {
    const mainMusic = document.getElementById('backgroundMusic');
    const birthdaySong = document.getElementById('birthdaySong');
    
    // 🟢 FIX MUSIK: Ganti lagu saat masuk Halaman 5
    if (mainMusic) mainMusic.pause();
    if (birthdaySong) {
        birthdaySong.loop = true; // Pastikan lagu ulang tahun berulang
        birthdaySong.volume = 0.6; // Atur volume
        birthdaySong.play().catch(e => console.log("Birthday song autoplay blocked:", e));
    }
    
    // Tampilkan nama di halaman 5
    document.getElementById('recipientNameDisplay').textContent = recipientName;

    // Navigasi dari Lock Code (Page 4) ke Pesan Akhir (Page 5)
    changePage('page4', 'page5');

    // Mulai efek ketik setelah halaman 5 muncul dan foto sudah di-delay 0.9s
    setTimeout(() => {
        const targetElement = document.getElementById('typing-text-target');
        if (targetElement) {
            typeMessage(birthdayMessage, targetElement);
        }
    }, 2000); // Delay 2 detik, setelah foto muncul sempurna (1.8s + 0.9s delay)
}


// ===================================
// FUNGSI RIDDLE & LOCK
// ===================================

function checkAnswer1() {
    const input = document.getElementById('riddle-answer-input');
    const message = document.getElementById('riddle-message');
    const answer = input.value.toUpperCase().trim();
    
    message.style.color = '#ff69b4';
    
    if (answer === correctRiddleAnswer) {
        message.textContent = "🥳 BENAR! Kamu ingat aku! Lanjut ke teka-teki tahap 2...";
        input.disabled = true;
        document.getElementById('answer-button').disabled = true;
        
        // 💥 PERBAIKAN KRUSIAL: Lanjut ke Halaman 3 (Riddle 2)
        setTimeout(goToPage3, 1500);

    } else {
        message.textContent = "SALAH! Coba ingat-ingat lagi nama temanmu yang dulu sekelas di SMM Bogor!";
        input.value = "";
    }
}

function checkAnswer2() {
    const input = document.getElementById('riddle-answer-input-2');
    const message = document.getElementById('riddle-message-2');
    const expectedAnswer = correctRiddleAnswer2; 
    const answer = input.value.toUpperCase().trim();
    
    message.style.color = '#ff69b4';
    
    if (answer === expectedAnswer) {
        message.textContent = "🥳 BENAR SEKALI! Itu nama panggilanmu yang lucu! Lanjut ke tahap akhir!";
        input.disabled = true;
        document.getElementById('answer-button-2').disabled = true;
        
        // Lanjut ke Halaman 4 (Lock Code)
        setTimeout(goToPage4, 1500);

    } else {
        message.textContent = `SALAH! Ingat nama panggilanmu sendiri! Petunjuk: ${expectedAnswer.charAt(0)}... (4 Huruf)`;
        input.value = "";
    }
}


function checkLockCode() {
    const dd = document.getElementById('key-input-dd').value.padStart(2, '0');
    const mm = document.getElementById('key-input-mm').value.padStart(2, '0');
    const yyyy = document.getElementById('key-input-yyyy').value;
    const lockCode = dd + mm + yyyy;
    const message = document.getElementById('lock-message');
    
    message.style.color = '#ff69b4';

    if (lockCode === correctLockCode) {
        message.textContent = "KUNCI TERBUKA! Selamat datang di kejutan utama! 🔓";
        document.querySelector('.lock-box button').disabled = true;
        document.getElementById('lock-icon').textContent = '✅';
        
        // Lanjut ke halaman 5
        setTimeout(goToPage5, 1500);

    } else {
        message.textContent = "KODE SALAH! Tanggal lahirmu (DDMMYYYY) mana? Coba lagi! ❌";
        const lockBox = document.querySelector('.lock-box');
        lockBox.style.animation = 'lockshake 0.5s';
        setTimeout(() => {
            lockBox.style.animation = 'none';
        }, 500);
    }
}


// ===================================
// FUNGSI TYPING EFFECT (EFEK KETIK)
// ===================================

function typeMessage(messageArray, targetElement, index = 0, charIndex = 0) {
    
    if (index >= messageArray.length) {
        targetElement.classList.add('finished-typing');
        
        // Tampilkan Tanda Tangan setelah pesan selesai diketik
        const signatureBox = document.getElementById('signature-box');
        if (signatureBox) signatureBox.style.opacity = '1';
        return;
    }

    let currentP = targetElement.querySelector('p:last-of-type');
    
    if (charIndex === 0) {
        if (currentP) {
            currentP.classList.remove('typing-active'); 
        }
        
        const newP = document.createElement('p');
        newP.classList.add('typing-active'); 
        targetElement.appendChild(newP);
        currentP = newP;
    }

    const textToType = messageArray[index];
    
    if (charIndex < textToType.length) {
        currentP.textContent += textToType.charAt(charIndex);
        charIndex++;
        // Kecepatan mengetik: 60ms/karakter
        setTimeout(() => typeMessage(messageArray, targetElement, index, charIndex), 60); 
    } else {
        // Selesai satu paragraf
        index++;
        charIndex = 0;
        // Jeda antar paragraf: 800ms
        setTimeout(() => typeMessage(messageArray, targetElement, index, charIndex), 800); 
    }
}
