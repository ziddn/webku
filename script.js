let recipientName = "";
const correctRiddleAnswer = "ZIDAN";
const correctRiddleAnswer2 = "LAYA";
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

// FUNGSI UTAMA TYPING EFFECT
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
        console.warn("Autoplay/FadeIn Gagal, pastikan ada interaksi user sebelumnya.");
        // Coba set volume max jika gagal fade in
        audioElement.volume = maxVolume;
    });
}


// Fungsi untuk navigasi antar halaman
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
            
            // ----------------------------------------------------------------
            // LOGIKA PENTING UNTUK PAGE 4 (MUSIK & ANIMASI KETIK)
            // ----------------------------------------------------------------
            
            // 1. Musik Ulang Tahun
            // Buat objek Audio baru SETIAP KALI agar bisa di-play
            if (!window.currentSpecialMusic) {
                 window.currentSpecialMusic = new Audio('Birthdayy.mp3'); 
                 window.currentSpecialMusic.loop = true;
            }
            fadeInMusic(window.currentSpecialMusic, 0.05, 0.5, 2000); 
            
            
            // 2. Reset dan Mulai Animasi Ketik
            const typingTarget = document.getElementById('typing-text-target');
            const signatureBox = document.getElementById('signature-box');
            
            // Bersihkan konten sebelumnya dan reset state
            typingTarget.innerHTML = '';
            typingTarget.classList.remove('finished-typing');
            if (signatureBox) signatureBox.style.opacity = '0';
            
            // Mulai animasi ketik setelah delay (setelah foto-foto muncul)
            setTimeout(() => {
                // Tambahkan 1 paragraf kosong awal
                typingTarget.innerHTML = '<p></p>'; 
                typeMessage(birthdayMessage, typingTarget);
            }, 3500); // Mulai ketik setelah 3.5 detik (setelah foto-foto selesai dianimasikan)

        } else {
            // Pastikan musik ulang tahun mati saat pindah dari Page 4
            if (window.currentSpecialMusic && !window.currentSpecialMusic.paused) {
                window.currentSpecialMusic.pause();
            }
        }
        
        targetPage.scrollTop = 0;
    }
}

// Halaman 1: Memproses Nama
function goToPage2() {
    const input = document.getElementById('recipientName');
    recipientName = input.value.trim().toUpperCase();

    if (recipientName === "") {
        alert("Nama tidak boleh kosong, ya!");
        return;
    }

    // Mainkan background music saat halaman 2 dibuka
    const music = document.getElementById('backgroundMusic');
    if (music.paused) {
        music.volume = 0.5;
        // Panggil play.catch() untuk mengatasi masalah Autoplay
        music.play().catch(error => {
            console.log("Autoplay failed:", error);
        });
    }

    goToPage('page2');
}

// Halaman 2 - Games 1
function checkAnswer() {
    const input = document.getElementById('riddle-answer-input');
    const message = document.getElementById('riddle-message');
    const answer = input.value.trim().toUpperCase();
    
    input.classList.remove('shake');
    
    if (answer === correctRiddleAnswer) {
        message.innerText = "Yey! Betul banget! Ternyata Kamu Masih inget aku!";
        message.style.color = '#333333';
        document.getElementById('riddle-container').style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('riddle-container').style.display = 'none';
            // Pastikan container 2 muncul dengan benar
            const container2 = document.getElementById('riddle-container-2');
            container2.style.display = 'block';
            container2.style.opacity = '1';
        }, 500);

    } else {
        message.innerText = "Hmm, coba pikir lagi! Temen kamu dulu lohh tepatnya di Smm Haha! ";
        message.style.color = '#ff69b4';
        
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500); 
    }
}

// Halaman 2 - Games 2
function checkAnswer2() {
    const input = document.getElementById('riddle-answer-input-2');
    const message = document.getElementById('riddle-message-2');
    const answer = input.value.trim().toUpperCase();

    input.classList.remove('shake');

    if (answer === correctRiddleAnswer2) {
        message.innerText = "Yeay Benar! Kamu Lanjut ke Tahap Terakhir!";
        message.style.color = '#333333';
        
        setTimeout(() => {
            goToPage('page3');
        }, 1000);

    } else {
        message.innerText = "Kurang tepat! Coba ketik nama panggilan yang ulang tahun hari ini Siapa?";
        message.style.color = '#ff69b4';

        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500); 
    }
}

// Halaman 3: Membuka Kunci
function checkLockCode() {
    const dd = document.getElementById('key-input-dd').value.padStart(2, '0');
    const mm = document.getElementById('key-input-mm').value.padStart(2, '0');
    const yyyy = document.getElementById('key-input-yyyy').value;
    const lockMessage = document.getElementById('lock-message');

    const enteredCode = dd + mm + yyyy;

    if (enteredCode === correctLockCode) {
        lockMessage.innerText = "UNLOCKED! Selamat Ulang Tahun!!!";
        lockMessage.style.color = '#ff69b4';

        // FADE OUT MUSIK LAMA
        const bgMusic = document.getElementById('backgroundMusic');
        if (!bgMusic.paused) {
            fadeOutMusic(bgMusic, 1200); 
        }

        setTimeout(() => {
            goToPage('page4');
        }, 1500);

    } else {
        lockMessage.innerText = "Salahh! Tanggal lahir siapa itu? ";
        lockMessage.style.color = 'red';
        document.querySelector('.lock-box').classList.add('lockshake');
        setTimeout(() => document.querySelector('.lock-box').classList.remove('lockshake'), 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#key-input-container input').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
});
