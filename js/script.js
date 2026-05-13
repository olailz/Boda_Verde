// Global variables
let player;
let isPlaying = false;

// YouTube API - Configuración unificada
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '6p8L4nLBCdI', 
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'fs': 0,
            'playsinline': 1,
            'loop': 1,
            'playlist': '6p8L4nLBCdI' // Necesario para que funcione el loop y la precarga
        },
        events: {
            'onReady': () => { 
                console.log("Música lista para sonar."); 
                if(player.setVolume) player.setVolume(70);
            },
            'onError': (e) => { console.error('Error YouTube:', e.data); }
        }
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initPersonalGreeting();
    initPreloader();
    initInvitationOpen();
    initCountdown();
    initScrollReveal();
    initRSVP();
    initMusicToggle();
});

// Functions
function initPersonalGreeting() {
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('n');
    if (guest) {
        const name = guest.replace(/\+/g, ' ');
        document.getElementById('guest-welcome').innerText = `¡Hola ${name}!`;
        document.getElementById('inputName').value = name;
    }
}

function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 1000);
            }
        }, 1500);
    });
}

function initInvitationOpen() {
    const btnOpen = document.getElementById('btnOpen');
    if (!btnOpen) return;

    btnOpen.addEventListener('click', () => {
        document.getElementById('hero').classList.add('hide');
        document.getElementById('main-content').classList.remove('hidden');
        
        const musicBtn = document.getElementById('musicBtn');
        if (musicBtn) musicBtn.classList.remove('hidden');
        
        // REPRODUCCIÓN DIRECTA (Lógica corregida)
        if (player && typeof player.playVideo === 'function') {
            try {
                player.playVideo();
                isPlaying = true;
                
                const equalizer = document.querySelector('.equalizer');
                if (equalizer) equalizer.style.opacity = '1';
                
                if (musicBtn) musicBtn.classList.add('playing');
                console.log('Música iniciada');
            } catch (err) {
                console.error('Error al reproducir:', err);
            }
        }
        
        setTimeout(() => { 
            window.scrollTo({ top: 0, behavior: 'instant' }); 
            if(window.reveal) window.reveal(); 
        }, 800);
    });
}

function formatCountdownValue(value) {
    return String(value).padStart(2, '0');
}

function initCountdown() {
    const weddingDate = new Date("Aug 16, 2026 14:00:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    const updateCountdown = () => {
        const now = Date.now();
        const diff = weddingDate - now;
        if (diff <= 0) {
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.innerText = formatCountdownValue(d);
        hoursEl.innerText = formatCountdownValue(h);
        minutesEl.innerText = formatCountdownValue(m);
        secondsEl.innerText = formatCountdownValue(s);
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initScrollReveal() {
    window.reveal = () => {
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', window.reveal);
}

function initRSVP() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerText = "ENVIANDO...";
        btn.disabled = true;

        const scriptURL = 'https://script.google.com/macros/s/AKfycbwPFUaIKMa9DnHqbO73yqfA0M9Q2VChvk3I-R8MOU4zDXyKZuK2WdRN2jSXJ3S8BTh2Dw/exec';
        
        const formData = new FormData(form);
        const params = new URLSearchParams();
        
        // Coincidencia con los parámetros del Apps Script
        params.append('name', document.getElementById('inputName').value);
        params.append('attending', form.querySelector('select[name="attending"]').value);
        params.append('guests', form.querySelector('input[name="guests"]').value || '0');
        params.append('message', form.querySelector('textarea[name="message"]').value || '');

        fetch(scriptURL, {
            method: 'POST',
            body: params,
            mode: 'no-cors' 
        })
        .then(() => {
            alert("¡Confirmación exitosa!");
            btn.innerText = "¡GRACIAS!";
            form.reset(); 
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Hubo un problema al enviar el formulario.");
            btn.innerText = "ENVIAR CONFIRMACIÓN";
            btn.disabled = false;
        });
    });
}

function initMusicToggle() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;
    
    const musicLabel = musicBtn.querySelector('.music-label');
    const musicIcon = document.getElementById('musicIcon');

    musicBtn.addEventListener('click', () => {
        if (!player || !player.playVideo) return;
        
        if (isPlaying) {
            player.pauseVideo();
            if (musicLabel) musicLabel.innerText = 'MUSIC OFF';
            if (musicIcon) musicIcon.className = "fa-solid fa-play";
            musicBtn.classList.remove('playing');
        } else {
            player.playVideo();
            if (musicLabel) musicLabel.innerText = 'MUSIC ON';
            if (musicIcon) musicIcon.className = "fa-solid fa-music";
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
        const equalizer = document.querySelector('.equalizer');
        if (equalizer) equalizer.style.opacity = isPlaying ? '1' : '0.3';
    });
}