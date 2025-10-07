let recipientName = "Zidanrz";
const correctRiddleAnswer = "ZIDAN"; 
const correctRiddleAnswer2 = ["UPI", "IPB"]; 
const correctLockCode = "10012006"; 
const birthdayMessage = [
    "Selamat ulang tahun Laya Dwi Garini Yang Ke 20 Tahunn!,",
    "Semoga di umur Kamu yang baru ini kamu makin Semangat ya ngejalanin hidup, makin pinter+makin cakep wkwk, dan gak gampang capek sama hal-hal receh.",
    "Semoga rezekinya lancar, urusannya selalu dipermudah, dan hari-harimu selalu dikasih hal-hal kecil yang bikin senyum.",
    "Jangan Stress-Stress Ya wkwk — yang penting kamu masih bisa Tersenyum dan menikmati hidup dengan cara kamu sendiri.",
    "Nikmatin hari bahagia kamu ini, makan enak, dan jangan lupa istirahat Jangan Cape-Cape. Kamu Berhak dapet hari Yang Spesial ini Dan pastinya Berhak Bahagia.",
    "Terakhir Dari Aku Bahagiaa Ya di Bandung,Semangat Kuliahnyaa Jgn lupain Bogorr.And ENJOYY UR DAYY LAYY!!! "
];

function goToPage(pageId) {
    const pages = document.querySelectorAll('.page-container');
    
    pages.forEach(page => {
        page.classList.remove('active');
        //page.style.overflowY = 'Auto'; 
        page.style.transform = 'rotateY(-90deg)';
        page.style.opacity = '0';
    });
    
    const targetPage = document.getElementById(pageId);
    const lockBox = document.querySelector('.lock-box');
    
    
    if (pageId !== 'page3' && lockBox) {
        lockBox.classList.remove('active');
        lockBox.style.display = 'none';
        lockBox.style.opacity = '0';
    }


    if (targetPage) {
        targetPage.classList.add('active');
        //document.body.style.overflow = 'hidden';

        if (pageId === 'page2') {
            document.getElementById('page2-greeting').innerText = `Hai ${recipientName}!`; 
            
        
            const riddleContainer1 = document.getElementById('riddle-container');
            const riddleContainer2 = document.getElementById('riddle-container-2');
            
           
            if(riddleContainer1) {
                riddleContainer1.style.display = 'block';
                riddleContainer1.style.opacity = '1';
                riddleContainer1.classList.remove('fade-out'); 
            }
            if(riddleContainer2) {
                riddleContainer2.style.display = 'none';
                riddleContainer2.style.opacity = '0';
                riddleContainer2.classList.remove('fade-in-slide-up'); 
            }
        }
        
        
        if (pageId === 'page3') {
            setTimeout(() => {
                
                if (lockBox) {
                    lockBox.style.display = 'flex'; 
                    lockBox.classList.add('fade-in-slide-up'); 
                    lockBox.classList.add('active'); 
                }
            }, 1800); 

        } else if (pageId === 'page4') {
            document.getElementById('recipientNameDisplay').innerText = recipientName;
            
            
            const birthdaySong = document.getElementById('birthdaySong'); 
            if (birthdaySong) {
                birthdaySong.loop = true;
                fadeInMusic(birthdaySong, 0.05, 0.5, 2000); 
            }
            const typingTarget = document.getElementById('typing-text-target');
            const signatureBox = document.getElementById('signature-box');
            
            typingTarget.innerHTML = '';
            typingTarget.classList.remove('finished-typing');
            if (signatureBox) signatureBox.style.opacity = '0';
            
        
            setTimeout(() => {
                typingTarget.innerHTML = ''; 
                typeMessage(birthdayMessage, typingTarget);
            }, 3500); 

        } else {
          
            
            const birthdaySong = document.getElementById('birthdaySong');
            if (birthdaySong && !birthdaySong.paused) {
                fadeOutMusic(birthdaySong, 500); 
                setTimeout(() => {
                    birthdaySong.pause();
                    birthdaySong.currentTime = 0;
                }, 500);
            }
        }
        
        targetPage.scrollTop = 0;
    }
}

window.goToPage2 = function() {
    const input = document.getElementById('recipientName');
    recipientName = input.value.trim().toUpperCase();

    if (recipientName === "") {
        alert("Nama harus diisi dulu, ya");
        return;
    }

    const music = document.getElementById('backgroundMusic');
    if (music.paused) {
        music.volume = 0.5;
        music.play().catch(error => { console.warn("Autoplay failed:", error); });
    }

    goToPage('page2');
}

window.checkAnswer1 = function() {
    const input = document.getElementById('riddle-answer-input');
    const message = document.getElementById('riddle-message');
    const answer = input.value.trim().toUpperCase();
    
    
    if (answer === correctRiddleAnswer) {
        
        
        message.innerText = "Yey! Betull! ternyata masih inget aku Siapa wkwk"; 
        message.style.color = '#ff69b4';
        input.disabled = true;
        document.getElementById('answer-button').disabled = true;
        
        const riddleContainer1 = document.getElementById('riddle-container');
        const container2 = document.getElementById('riddle-container-2');

        
        setTimeout(() => {
    
            if(riddleContainer1) {
                
                riddleContainer1.classList.add('fade-out'); 
            }
                document.getElementById('page2-greeting').style.display = 'none'
            
            
            setTimeout(() => {
                if(riddleContainer1) {
                    riddleContainer1.style.display = 'none';
                    riddleContainer1.classList.remove('fade-out'); 
                }
                
                
                if(container2) {
                    container2.style.display = 'block'; 
                    container2.classList.add('fade-in-slide-up'); 
                }
            }, 1000); 

        }, 1500); 

    } else {
        message.innerText = "Salah! Temen kamu dulu Intinya Siapa Hayyo";
        input.classList.add('lockshake');
        setTimeout(() => input.classList.remove('lockshake'), 500); 
    }
}

window.checkAnswer2 = function() {
    const input = document.getElementById('riddle-answer-input-2');
    const message = document.getElementById('riddle-message-2');
    const answer = input.value.trim().toUpperCase();

    
    if (correctRiddleAnswer2.includes(answer)) {
        message.innerText = `OHH Baiklah Nanya aja si btw Semangat Yaa Kuliahnya!`;
        message.style.color = '#ff69b4';
        input.disabled = true;
        document.getElementById('answer-button-2').disabled = true;

        
        const riddleMainContainer = document.getElementById('riddle-main-container');
        
        if(riddleMainContainer) {
            riddleMainContainer.style.transition = 'opacity 1.5s ease-out';
            riddleMainContainer.style.opacity = '0';
        }
        
        setTimeout(() => {
            goToPage('page3');
        }, 1500); 

    } else {
        
        message.innerText = "Salah! Coba ketik nama kampusnya (Hanya IPB atau UPI Ya)"; 
        input.classList.add('lockshake');
        
        setTimeout(() => input.classList.remove('lockshake'), 2000); 
    }
}

window.checkLockCode = function() {
    
    const dd = document.getElementById('key-input-dd').value.padStart(2, '0');
    const mm = document.getElementById('key-input-mm').value.padStart(2, '0');
    const yyyy = document.getElementById('key-input-yyyy').value;
    const lockMessage = document.getElementById('lock-message');
    const enteredCode = dd + mm + yyyy;
    const lockBox = document.querySelector('.lock-box'); 

    if (enteredCode === correctLockCode) {
        lockMessage.innerText = "Terbuka! Happy Birthdayy!!";
        lockMessage.style.color = '#e03238ff';
        document.querySelector('.lock-box button').disabled = true;
        document.getElementById('lock-icon').textContent = ''; 
        document.getElementById('lock-icon').style.color = '#ff69b4'; 

    
        lockBox.style.transition = 'opacity 0.8s ease-out';
        lockBox.style.opacity = '0';
        lockBox.classList.remove('active'); 

        const bgMusic = document.getElementById('backgroundMusic');
        if (!bgMusic.paused) {
            fadeOutMusic(bgMusic, 1200); 
        }

        setTimeout(() => {
            lockBox.style.display = 'none'; 
            goToPage('page4');
        }, 1500); 

    } else {
        lockMessage.innerText = "Salahh! Isinya Tanggal lahir kamu Ya bukan Orang lain";
        lockMessage.style.color = 'Red';
        document.querySelector('.lock-box').classList.add('lockshake');
        setTimeout(() => document.querySelector('.lock-box').classList.remove('lockshake'), 500);
    }
}

function typeMessage(messageArray, targetElement, index = 0, charIndex = 0) {
    if (index >= messageArray.length) {
        targetElement.classList.add('finished-typing'); 
        const signatureBox = document.getElementById('signature-box');
        setTimeout(() => { if (signatureBox) signatureBox.style.opacity = '1'; }, 500);
        return;
    }
    let currentP = targetElement.querySelector('p:last-of-type');
    if (charIndex === 0) {
        
        if (currentP) { currentP.classList.remove('typing-active'); } 
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
        
        currentP.classList.remove('typing-active'); 
        index++;
        charIndex = 0;
        setTimeout(() => typeMessage(messageArray, targetElement, index, charIndex), 800); 
    }
}

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
        
        audioElement.volume = maxVolume;
        audioElement.play().catch(e => console.error("Play gagal lagi:", e));
    });
}



document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#key-input-container input').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
    
    const button1 = document.getElementById('answer-button');
    if (button1) button1.onclick = checkAnswer1;
    
    const button2 = document.getElementById('answer-button-2');
    if (button2) button2.onclick = checkAnswer2; 
});
