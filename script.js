let recipientName = "";
// Jawab teka-teki tahap 1: ZIDAN
const correctRiddleAnswer = "ZIDAN";
// Jawab teka-teki tahap 2: LAY
const correctRiddleAnswer2 = "LAYA";
// Ganti dengan tanggal lahir yang benar (DDMMYYYY)
const correctLockCode = "10012006"; 

// Pesan Ulang Tahun yang akan diketik
const birthdayMessage = [
    // Paragraf 1
    "Aku tahu hari ini adalah hari yang sangat spesial untukmu. Walaupun kita mungkin sudah lama tidak bertemu, aku ingin kamu tahu bahwa aku tidak pernah melupakan momen persahabatan kita di masa lalu.",
    // Paragraf 2
    "Kamu selalu menjadi salah satu orang yang paling ceria dan penuh semangat yang pernah aku kenal. Aku harap di hari ulang tahunmu ini, semua kebahagiaan dan kebaikan yang kamu sebarkan kembali padamu berlipat ganda.",
    // Paragraf 3
    "Ini adalah perjalanan kecil yang aku buat untukmu. Aku harap kamu suka dengan kejutan sederhananya!",
    // Paragraf 4
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
        // Atur agar halaman 1 hilang total setelah transisi
        setTimeout(() => {
            fromPage.style.display = 'none';
        }, 1000); 
    }

    if (toPage) {
        setTimeout(() => {
            toPage.style.display = 'flex';
            // Paksa untuk memuat ulang animasi transisi
            void toPage.offsetWidth; 
            toPage.classList.add('active');
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
    // Animasikan container teka-teki 1 agar muncul
    document.querySelector('#riddle-container .fancy-riddle-box').style.opacity = '1';
    document.querySelector('#riddle-container .fancy-riddle-box').style.animationDelay = '0s';

}

function goToPage3() {
    changePage('page2', 'page3');
}

function goToPage4() {
    // Fade out musik sebelum menampilkan halaman 4 (opsional)
    const music = document.getElementById('backgroundMusic');
    if (music) fadeOutMusic(music, 1500);

    // Tampilkan nama di halaman 4
    document.getElementById('recipientNameDisplay').textContent = recipientName;

    changePage('page3', 'page4');

    // Mulai efek ketik setelah halaman 4 muncul
    setTimeout(() => {
        const targetElement = document.getElementById('typing-text-target');
        if (targetElement) {
            typeMessage(birthdayMessage, targetElement);
        }
    }, 3500); // Tunda sedikit agar animasi foto selesai
}


// ===================================
// FUNGSI RIDDLE & LOCK
// ===================================

function checkAnswer() {
    const input = document.getElementById('riddle-answer-input');
    const message = document.getElementById('riddle-message');
    const answer = input.value.toUpperCase().trim();
    
    message.style.color = '#ff69b4';
    
    if (answer === correctRiddleAnswer) {
        message.textContent = "🥳 BENAR! Kamu ingat aku! Sekarang, teka-teki tahap 2...";
        input.disabled = true;
        document.getElementById('answer-button').disabled = true;
        
        // Tampilkan teka-teki tahap 2
        const riddle2Container = document.getElementById('riddle-container-2');
        riddle2Container.style.display = 'block';
        setTimeout(() => {
            riddle2Container.style.opacity = '1';
            riddle2Container.style.transform = 'scale(1)';
        }, 100);

    } else {
        message.textContent = "SALAH! Coba ingat-ingat lagi nama temanmu yang dulu sekelas di SMM Bogor!";
        input.value = "";
    }
}

function checkAnswer2() {
    const input = document.getElementById('riddle-answer-input-2');
    const message = document.getElementById('riddle-message-2');
    // Gunakan nama yang diinput di halaman 1, jika user mengisi 'Laya' di halaman 1
    // Atau gunakan jawaban default 'LAYA' jika kita ingin jawaban default
    const expectedAnswer = recipientName || correctRiddleAnswer2; 
    const answer = input.value.toUpperCase().trim();
    
    message.style.color = '#ff69b4';
    
    if (answer === expectedAnswer) {
        message.textContent = "🥳 BENAR SEKALI! Itu nama panggilanmu yang lucu! Lanjut ke tahap akhir!";
        input.disabled = true;
        document.getElementById('answer-button-2').disabled = true;
        
        // Tampilkan tombol untuk lanjut ke halaman 3
        setTimeout(goToPage3, 1500);

    } else {
        message.textContent = `SALAH! Ingat nama panggilanmu sendiri! Petunjuk: ${expectedAnswer.charAt(0)}...`;
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
        
        // Lanjut ke halaman 4
        setTimeout(goToPage4, 1500);

    } else {
        message.textContent = "KODE SALAH! Tanggal lahirmu (DDMMYYYY) mana? Coba lagi! ❌";
        document.querySelector('.lock-box').style.animation = 'lockshake 0.5s';
        setTimeout(() => {
            document.querySelector('.lock-box').style.animation = 'none';
        }, 500);
    }
}


// ===================================
// FUNGSI TYPING EFFECT (EFEK KETIK)
// ===================================

function typeMessage(messageArray, targetElement, index = 0, charIndex = 0) {
    
    // Periksa apakah sudah selesai mengetik semua paragraf
    if (index >= messageArray.length) {
        targetElement.classList.add('finished-typing'); // Hapus kursor terakhir via CSS
        
        // Tampilkan Tanda Tangan setelah pesan selesai diketik
        const signatureBox = document.getElementById('signature-box');
        if (signatureBox) signatureBox.style.opacity = '1';
        return;
    }

    let currentP = targetElement.querySelector('p:last-of-type');
    
    // Jika baru mulai paragraf baru (atau ini adalah paragraf pertama)
    if (charIndex === 0) {
        // Hapus kursor dari paragraf sebelumnya
        if (currentP) {
            currentP.classList.remove('typing-active'); 
        }
        
        // Buat elemen p baru dan tambahkan kelas kursor aktif
        const newP = document.createElement('p');
        newP.classList.add('typing-active'); 
        targetElement.appendChild(newP);
        currentP = newP;
    }

    const textToType = messageArray[index];
    
    // Ketik satu karakter
    if (charIndex < textToType.length) {
        currentP.textContent += textToType.charAt(charIndex);
        charIndex++;
        // Kecepatan mengetik: 60ms/karakter
        setTimeout(() => typeMessage(messageArray, targetElement, index, charIndex), 60); 
    } else {
        // Selesai satu paragraf, mulai paragraf berikutnya
        index++;
        charIndex = 0;
        // Jeda antar paragraf: 800ms
        setTimeout(() => typeMessage(messageArray, targetElement, index, charIndex), 800); 
    }
}


// ===================================
// FUNGSI MUSIK FADE
// ===================================

function fadeOutMusic(audioElement, duration = 1000) {
    const startVolume = audioElement.volume;
    const steps = 50;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
        currentStep++;
        audioElement.volume = startVolume - (currentStep * startVolume / steps);

        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            audioElement.pause();
            audioElement.volume = startVolume; 
        }
    }, stepDuration);
}
