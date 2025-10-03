const SENDER = "Zidanrz"; // <-- GANTI DENGAN NAMA ANDA!
    
// SETUP TEBAK-TEBAKAN
// Pertanyaan: (20 x 2) - 14 = 40 - 14 = 26
const RIDDLE_QUESTION = "Pertanyaan ini mudah! Berapakah hasil dari: (20 x 2) - 14?"; 
const RIDDLE_ANSWER = "26"; // Jawaban dalam bentuk string

function playMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicSelector = document.getElementById('musicSelector');
    const selectedSong = musicSelector.value;
    
    if (selectedSong) {
        music.src = selectedSong; 
        music.load(); 
        music.volume = 0.5; 
        music.play().catch(e => {
            console.error("Gagal memutar musik:", e);
        });
    }
}

// Fungsi transisi dari Halaman 1 ke Halaman 2 (Tebak-tebakan)
function goToPage2() {
    const musicSelector = document.getElementById('musicSelector');
    const nameInput = document.getElementById('recipientName');
    const recipientName = nameInput.value.trim();

    if (musicSelector.value === "") {
            alert("Eh, lagunya belum dipilih lho! Pilih dulu ya!");
            return;
    }
    if (recipientName === "") {
        alert("Namamu belum diisi! Silakan isi namamu dulu.");
        nameInput.focus();
        return;
    }

    playMusic(); 

    // Update Teks Halaman 2 dan Pertanyaan
    document.getElementById('page2-greeting').textContent = `Ciee ${recipientName}, Ulang Tahun Ya?`;
    document.getElementById('riddle-text').innerHTML = ` Eitss Tungggu Dulu Sebelum Lanjut , kamu harus jawab Games kecil dlu ya dari aku Hehe! <br><br> <strong>${RIDDLE_QUESTION}</strong>`;


    // Transisi Halaman 1 -> Halaman 2
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');

    page1.classList.remove('active');

    setTimeout(() => {
        page1.style.display = 'none'; 
        page2.classList.add('active'); 
    }, 1000); 
}

// FUNGSI UTAMA: Cek Jawaban Tebak-tebakan
function checkAnswer() {
    const userAnswer = document.getElementById('riddle-answer-input').value.trim();
    const messageElement = document.getElementById('riddle-message');
    const answerButton = document.getElementById('answer-button');

    // Memastikan input hanya angka dan tidak kosong
    if (userAnswer === "" || isNaN(userAnswer)) {
        messageElement.innerHTML = "YAH SALAH HAYU COBA LAGI. Jawabannya harus angka Ya Cantik, coba lagi!";
        return;
    }

    if (userAnswer === RIDDLE_ANSWER) {
        messageElement.innerHTML = "🎉 **SELAMAT CANTIK!** Kamu memang pintar. Klik tombol Ini untuk masuk ke halaman Inti Hihihi.";
        answerButton.style.display = 'none'; // Sembunyikan tombol Cek Jawaban
        document.getElementById('riddle-answer-input').disabled = true; // Kunci input

        // Tampilkan tombol final untuk lanjut ke Halaman 3
        const finalButton = document.createElement('button');
        finalButton.textContent = "Buka Kejutan Utama Sekarang!";
        finalButton.classList.add('secret-button');
        finalButton.style.marginTop = '20px';
        finalButton.onclick = goToPage3;
        document.getElementById('riddle-container').appendChild(finalButton);

    } else {
        messageElement.innerHTML = "❌ Jawaban Salah. , sepertinya kamu harus coba lagi! Jangan menyerah ya Cantik.(Gunakan Angka Saja Ya Sayang misalnya '10'.)";
    }
}

// Fungsi transisi dari Halaman 2 ke Halaman 3 (Inti)
function goToPage3() {
    const nameInput = document.getElementById('recipientName');
    const recipientName = nameInput.value.trim();

    // 1. Update Teks di Halaman 3 (Final)
    document.getElementById('greeting').textContent = `Happy Birthday, ${recipientName}!`;
    document.getElementById('senderName').textContent = SENDER;
    
    // Mengganti placeholder [Nama Anda]
    const messageBox = document.querySelector('#page3 .message-box');
    if (messageBox) {
        let messageHtml = messageBox.innerHTML;
        messageHtml = messageHtml.replace(/\[Nama Anda\]/g, recipientName);
        messageBox.innerHTML = messageHtml;
    }

    // 2. Transisi Halaman 2 -> Halaman 3
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');

    page2.classList.remove('active');

    setTimeout(() => {
        page2.style.display = 'none'; 
        page3.classList.add('active'); 
    }, 1000); 
}