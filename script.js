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
    
    // Periksa apakah sudah selesai mengetik semua paragraf
    if (index >= messageArray.length) {
        targetElement.classList.add('finished-typing'); // Hapus kursor terakhir via CSS
        
        // Tampilkan Tanda Tangan setelah pesan selesai diketik
        const signatureBox = document.getElementById('signature-box');
        // Jeda sebentar sebelum menampilkan tanda tangan
        setTimeout(() => {
             if (signatureBox) signatureBox.style.opacity = '1';
        }, 500);
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


// =========================================================
// FUNGSI AUDIO (FADE IN/OUT)
// =========================================================

// Fungsi untuk membuat musik memudar (fade out)
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

// Fungsi untuk membuat musik memudar masuk (fade in)
function fadeInMusic(audioElement, startVolume = 0.05, maxVolume = 0.5, duration = 1500) {
    audioElement.volume = startVolume;
    
    // Kunci untuk Autoplay: Pastikan audio dimainkan dari interaksi user
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
        // Coba set volume max jika gagal fade in (Biasanya karena browser blokir)
        audioElement.volume = maxVolume;
        audioElement.play().catch(e => console.error("Play gagal lagi:", e));
    });
}


// =========================================================
// FUNGSI NAVIGASI
// =========================================================

// Fungsi untuk navigasi antar halaman
function goToPage(pageId) {
    const pages = document.querySelectorAll('.page-container');
    
    // Matikan semua halaman
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.overflowY = 'hidden'; 
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        // Aktifkan halaman target
        targetPage.classList.add('active');
        targetPage.style.overflowY = 'auto'; 
        document.body.style.overflow = 'hidden';

        if (pageId === 'page2') {
            document.getElementById('page2-greeting').innerText = `Hai ${recipientName}!`;
        }
        
        if (pageId === 'page4') {
            document.getElementById('recipientNameDisplay').innerText = recipientName;
            
            // ----------------------------------------------------------------
            // LOGIKA PENTING UNTUK PAGE 4 (MUSIK & ANIMASI KETIK)
            // ----------------------------------------------------------------
            
            // 1. Musik Ulang Tahun
            const birthdaySong = document.getElementById('birthdaySong'); // Ambil elemen audio BirthdaySong.mp3
            
            if (birthdaySong) {
                 birthdaySong.loop = true;
                 // Gunakan FadeInMusic
                 fadeInMusic(birthdaySong, 0.05, 0.5, 2000); 
            }
            
            // 2. Reset dan Mulai Animasi Ketik
            const typingTarget = document.getElementById('typing-text-target');
            const signatureBox = document.getElementById('signature-box');
            
            // Bersihkan konten sebelumnya dan reset state
            typingTarget.innerHTML = '';
            typingTarget.classList.remove('finished-typing');
            if (signatureBox) signatureBox.style.opacity = '0';
            
            // Mulai animasi ketik setelah delay (setelah foto-foto muncul)
            // Foto selesai di 2.4s + 1s untuk memastikan = 3.4s. Kita pakai 3500ms.
            setTimeout(() => {
                // Hapus paragraf kosong yang mungkin ada dan pastikan mulai mengetik
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
        // Panggil play.catch() untuk mengatasi masalah Autoplay
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
window.checkAnswer1 = function() { // Diubah dari checkAnswer menjadi checkAnswer1 agar konsisten dengan HTML
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
        
        document.getElementById('riddle-container').style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('riddle-container').style.display = 'none';
            // Pastikan container 2 muncul dengan benar dan memicu animasi masuk
            const container2 = document.getElementById('riddle-container-2');
            container2.style.display = 'block';
            container2.style.opacity = '1';
            // PENTING: Trigger animasi bounceInUp
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

        // Fade out Riddle 2
        document.getElementById('riddle-container-2').style.opacity = '0';
        
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
    
    // Perbaikan: Tambahkan event listener untuk tombol Riddle 1 & 2 (jika menggunakan onclick di HTML)
    document.getElementById('answer-button').onclick = checkAnswer1;
    document.getElementById('answer-button-2').onclick = checkAnswer2;
});
