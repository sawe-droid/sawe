document.addEventListener('DOMContentLoaded', () => {
    initTyping();
    initScrollReveal();
    initMobileNav();
});

function initTyping() {
    const phrases = [
        'Monitoring threats. Building defenses.',
        'Hunting adversaries across networks.',
        'Zero breaches. Zero tolerance.',
        'From alert to containment in minutes.',
    ];
    const el = document.getElementById('hero-typed');
    let phraseIdx = 0, charIdx = 0, deleting = false;

    function tick() {
        const current = phrases[phraseIdx];
        if (!deleting) {
            el.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                setTimeout(() => { deleting = true; tick(); }, 2500);
                return;
            }
            setTimeout(tick, 50 + Math.random() * 30);
        } else {
            el.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(tick, 400);
                return;
            }
            setTimeout(tick, 25);
        }
    }
    setTimeout(tick, 1000);
}

function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => observer.observe(el));
}

function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => links.classList.toggle('active'));
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('active'));
    });
}
