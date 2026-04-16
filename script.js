document.addEventListener("DOMContentLoaded", () => {

    // 1. GESTIONE MENU (FUORI DAI CICLI)
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
            console.log("Menu cliccato!");
        });

        // Chiudi il menu se clicchi fuori
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }

    // 2. EFFETTO 3D IMMAGINE (Sezione Game)
    const imageDan = document.querySelector(".image-content2 img");
    if (imageDan) {
        imageDan.addEventListener("mouseover", () => {
            imageDan.style.transform = "translateZ(20px) scale(1.1)";
            imageDan.style.transition = "transform 0.3s ease";
            imageDan.style.filter = "drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.5))";
        });
        imageDan.addEventListener("mouseout", () => {
            imageDan.style.transform = "translateZ(0) scale(1)";
            imageDan.style.filter = "none";
        });
    }

    // 3. GESTIONE VIDEO (Autoplay)
    const video = document.getElementById("video-element");
    const videoSection = document.querySelector(".spazio-foto");
    if (video && videoSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => console.log("Autoplay atteso"));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(videoSection);
    }

    // 4. CAROSELLO IMMAGINI (Città e Influencer) con supporto SWIPE
    const allCards = document.querySelectorAll('.citta-card, .influencer-card, .influencer-card-2');


    allCards.forEach(card => {
        let timer;
        // Cerca le immagini in entrambi i tipi di contenitore (standard e -2)
        const images = card.querySelectorAll('.carosello-immagini img, .carosello-immagini-2 img');
        let currentIndex = 0;
        let startX = 0;

        if (images.length > 1) {
            // --- FUNZIONE PER CAMBIARE IMMAGINE ---
            const changeImage = (direction = 1) => {
                images[currentIndex].classList.remove('attiva');
                currentIndex = (currentIndex + direction + images.length) % images.length;
                images[currentIndex].classList.add('attiva');
            };

            // --- GESTIONE HOVER (MOUSE) ---
            card.addEventListener('mouseenter', () => {
                timer = setInterval(() => changeImage(1), 1400);
            });

            card.addEventListener('mouseleave', () => {
                clearInterval(timer);
                images.forEach(img => img.classList.remove('attiva'));
                images[0].classList.add('attiva');
                currentIndex = 0;
            });

            // --- GESTIONE SWIPE PER SMARTPHONE ---
            card.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            card.addEventListener('touchend', (e) => {
                let endX = e.changedTouches[0].clientX;
                let diff = startX - endX;

                if (Math.abs(diff) > 50) { // Sensibilità di 50 pixel
                    clearInterval(timer); // Interrompe l'autoplay se l'utente interagisce
                    if (diff > 0) changeImage(1);  // Swipe verso sinistra -> immagine successiva
                    else changeImage(-1);         // Swipe verso destra -> immagine precedente
                }
            }, { passive: true });

            // --- GESTIONE DRAG PER PC (MOUSE) ---
            card.addEventListener('mousedown', (e) => {
                startX = e.clientX;
            });

            card.addEventListener('mouseup', (e) => {
                let endX = e.clientX;
                let diff = startX - endX;

                if (Math.abs(diff) > 50) {
                    clearInterval(timer);
                    if (diff > 0) changeImage(1);
                    else changeImage(-1);
                }
            });
        }

    });


});