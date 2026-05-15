document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initTyping();
    initScrollReveal();
    initMobileNav();
});

// Matrix rain background
function initMatrix() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    let w, h, columns, drops;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        columns = Math.floor(w / 18);
        drops = Array(columns).fill(1);
    }

    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    function draw() {
        ctx.fillStyle = 'rgba(6, 10, 16, 0.08)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#00ffaa';
        ctx.font = '14px IBM Plex Mono';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 18;
            const y = drops[i] * 18;
            ctx.globalAlpha = Math.random() * 0.3 + 0.05;
            ctx.fillText(char, x, y);
            ctx.globalAlpha = 1;

            if (y > h && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }

    draw();
}

// Typing effect
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

// Scroll reveal
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-text');
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

// Mobile nav
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => links.classList.toggle('active'));
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('active'));
    });
}
