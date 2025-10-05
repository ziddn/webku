let recipientName = "";
// GANTI INI: Jawaban teka-teki tahap 1 (ZIDAN)
const correctRiddleAnswer = "ZIDAN";
// GANTI INI: Jawaban teka-teki tahap 2 (LAYA)
const correctRiddleAnswer2 = "LAYA";
// GANTI INI: Tanggal lahir yang benar (DDMMYYYY)
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


// =========================================================
// FUNGSI UTAMA TYPING EFFECT
// =========================================================

function typeMessage(messageArray, targetElement, index = 0, charIndex = 0) {
    
    if (index >= messageArray.length) {
        targetElement.classList.add('finished-typing'); // Hapus kursor terakhir via CSS
        
        const signatureBox = document.getElementById('signature-box');
        setTimeout(() => {
             if (signatureBox) signatureBox.style.opacity = '1';
        }, 500);
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
        setTimeout(() => typeMessage(messageArray, targetElement, index, charIndex), 60); 
    } else {
        index++;
        charIndex = 0;
        setTimeout(() => typeMessage(messageArray, targetElement, index, charIndex), 800); 
    }
}


// =========================================================
// FUNGSI AUDIO (FADE IN/OUT)
// =========================================================

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

function fadeInMusic(audioElement, startVolume = 0.05, maxVolume = 0.5, duration = 1500) {
    audioElement.volume = startVolume;
    
    audioElement.play().then(() => {
        const steps = 50;
        const volumeStep = (maxVolume - startVolume) / steps;
        const stepDuration = duration / steps;
        let currentVolume = startVolume;

        const fadeInterval = setInterval(() => {
            currentVolume += volumeStep;
            if (currentVolume >= maxVolume) {
                currentVolume = maxVolume;
                clearInterval(fadeInterval);
            }
            audioElement.volume = currentVolume;
        }, stepDuration);
    }).catch(error => {
        console.warn("Autoplay/FadeIn Gagal, mencoba play ulang.");
        audioElement.volume = maxVolume;
        audioElement.play().catch(e => console.error("Play gagal lagi:", e));
    });
}


// =========================================================
// FUNGSI NAVIGASI
// =========================================================

function goToPage(pageId) {
    const pages = document.querySelectorAll('.page-container');
    
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.overflowY = 'hidden'; 
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.overflowY = 'auto'; 
        document.body.style.overflow = 'hidden';

        if (pageId === 'page2') {
            document.getElementById('page2-greeting').innerText = `Hai ${recipientName}!`;
        }
        
        if (pageId === 'page4') {
            document.getElementById('recipientNameDisplay').innerText = recipientName;
            
            // 1. Musik Ulang Tahun
            const birthdaySong = document.getElementById('birthdaySong'); 
            if (birthdaySong) {
                 birthdaySong.loop = true;
                 fadeInMusic(birthdaySong, 0.05, 0.5, 2000); 
            }
            
            // 2. Reset dan Mulai Animasi Ketik
            const typingTarget = document.getElementById('typing-text-target');
            const signatureBox = document.getElementById('signature-box');
            
            typingTarget.innerHTML = '';
            typingTarget.classList.remove('finished-typing');
            if (signatureBox) signatureBox.style.opacity = '0';
            
            setTimeout(() => {
                typingTarget.innerHTML = ''; 
                typeMessage(birthdayMessage, typingTarget);
            }, 3500); 

        } else if (pageId !== 'page4') {
            // Pastikan musik ulang tahun mati saat pindah dari Page 4
            const birthdaySong = document.getElementById('birthdaySong');
            if (birthdaySong && !birthdaySong.paused) {
                 birthdaySong.pause();
                 birthdaySong.currentTime = 0; // Reset lagu ke awal
            }
        }
        
        targetPage.scrollTop = 0;
    }
}

// Halaman 1: Memproses Nama
window.goToPage2 = function() {
    const input = document.getElementById('recipientName');
    recipientName = input.value.trim().toUpperCase();

    if (recipientName === "") {
        alert("Nama panggilanmu harus diisi dulu, ya!");
        return;
    }

    // Mainkan background music saat halaman 2 dibuka
    const music = document.getElementById('backgroundMusic');
    if (music.paused) {
        music.volume = 0.5;
        music.play().catch(error => {
            console.warn("Autoplay failed:", error);
        });
    }

    goToPage('page2');
}

// =========================================================
// FUNGSI RIDDLE & LOCK
// =========================================================

// Halaman 2 - Games 1
window.checkAnswer1 = function() {
    const input = document.getElementById('riddle-answer-input');
    const message = document.getElementById('riddle-message');
    const answer = input.value.trim().toUpperCase();
    
    input.classList.remove('shake');
    message.style.color = '#ff69b4'; // Set warna default pesan

    if (answer === correctRiddleAnswer) {
        message.innerText = "Yey! Betul banget! Ternyata Kamu Masih ingat aku!";
        message.style.color = '#333333';
        input.disabled = true;
        document.getElementById('answer-button').disabled = true;
        
        // Sembunyikan Riddle 1 dan Tampilkan Riddle 2
        document.getElementById('riddle-container').style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('riddle-container').style.display = 'none';
            // Tampilkan container 2
            const container2 = document.getElementById('riddle-container-2');
            container2.style.display = 'block';
            container2.style.opacity = '1';
            // PENTING: Trigger animasi bounceInUp untuk Riddle 2
            container2.style.animation = 'none'; 
            void container2.offsetWidth; 
            container2.style.animation = 'bounceInUp 1.5s ease-out forwards'; 
        }, 500);

    } else {
        message.innerText = "Hmm, coba pikir lagi! Temen kamu dulu lohh tepatnya di Smm Bogor!";
        
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500); 
    }
}

// Halaman 2 - Games 2
window.checkAnswer2 = function() {
    const input = document.getElementById('riddle-answer-input-2');
    const message = document.getElementById('riddle-message-2');
    const answer = input.value.trim().toUpperCase();

    input.classList.remove('shake');
    message.style.color = '#ff69b4'; // Set warna default pesan

    if (answer === correctRiddleAnswer2) {
        message.innerText = "Yeay Benar! Kamu Lanjut ke Tahap Terakhir!";
        message.style.color = '#333333';
        input.disabled = true;
        document.getElementById('answer-button-2').disabled = true;

        // Fade out seluruh Secret Container (Riddle Main Container)
        document.getElementById('riddle-main-container').style.opacity = '0';
        
        setTimeout(() => {
            goToPage('page3');
        }, 1000);

    } else {
        message.innerText = "Kurang tepat! Coba ketik nama panggilan yang ulang tahun hari ini Siapa?";
        
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500); 
    }
}

// Halaman 3: Membuka Kunci
window.checkLockCode = function() {
    const dd = document.getElementById('key-input-dd').value.padStart(2, '0');
    const mm = document.getElementById('key-input-mm').value.padStart(2, '0');
    const yyyy = document.getElementById('key-input-yyyy').value;
    const lockMessage = document.getElementById('lock-message');
    const enteredCode = dd + mm + yyyy;

    if (enteredCode === correctLockCode) {
        lockMessage.innerText = "UNLOCKED! Selamat Ulang Tahun!!!";
        lockMessage.style.color = '#ff69b4';
        document.querySelector('.lock-box button').disabled = true;
        document.getElementById('lock-icon').textContent = '✅'; // Ubah ikon
        document.getElementById('lock-icon').style.color = '#ff69b4';

        // FADE OUT MUSIK LAMA (Beaniee.mp3)
        const bgMusic = document.getElementById('backgroundMusic');
        if (!bgMusic.paused) {
            fadeOutMusic(bgMusic, 1200); 
        }

        // Lanjut ke Page 4 setelah fade out selesai
        setTimeout(() => {
            goToPage('page4');
        }, 1500);

    } else {
        lockMessage.innerText = "Salahh! Tanggal lahir siapa itu? (DDMMYYYY)";
        lockMessage.style.color = 'red';
        document.querySelector('.lock-box').classList.add('lockshake');
        setTimeout(() => document.querySelector('.lock-box').classList.remove('lockshake'), 500);
    }
}


// =========================================================
// INIT/EVENT LISTENERS
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Memastikan input hanya angka
    document.querySelectorAll('#key-input-container input').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
    
    // Inisialisasi on-click listeners (dijaga untuk berjaga-jaga)
    const button1 = document.getElementById('answer-button');
    if (button1) button1.onclick = checkAnswer1;
    
    const button2 = document.getElementById('answer-button-2');
    if (button2) button2.onclick = checkAnswer2;
});
