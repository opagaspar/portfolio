document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // LOADER
  // ===========================
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 450);
    }
  });

  // ===========================
  // TOGGLE DE TEMA
  // ===========================
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'gg-theme';

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      themeToggle.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
    });
  }

  // ===========================
  // SCROLL PROGRESS BAR
  // ===========================
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // ===========================
  // TYPEWRITER NO SUBTÍTULO
  // ===========================
  const subtitleEl = document.getElementById('typewriter');
  if (subtitleEl) {
    const phrases = [
      'Técnico de enfermagem',
      'Estudante de tecnologia',
      'Dev Front-end em formação',
      'Entusiasta de UX/UI',
    ];
    let phraseIndex  = 0;
    let charIndex    = 0;
    let deleting     = false;

    const TYPING_SPEED   = 65;
    const DELETING_SPEED = 35;
    const PAUSE_END      = 1800;
    const PAUSE_START    = 400;

    function type() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        subtitleEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, PAUSE_END);
          return;
        }
      } else {
        subtitleEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, PAUSE_START);
          return;
        }
      }

      setTimeout(type, deleting ? DELETING_SPEED : TYPING_SPEED);
    }

    setTimeout(type, 800);
  }

  // ===========================
  // EMAIL — montado via JS para evitar ofuscação do Cloudflare
  // ===========================
  const user   = 'Gabriel.Gaspar8794';
  const domain = 'hotmail.com';
  const email  = user + '@' + domain;
  const mailto = 'mailto:' + email + '?subject=Contato%20via%20site&body=Ol%C3%A1%20Gabriel%2C%0A%0AGostaria%20de%20conversar%20sobre%20uma%20oportunidade%20ou%20projeto.';

  const emailContato = document.getElementById('emailContato');
  if (emailContato) {
    const link = document.createElement('a');
    link.href        = mailto;
    link.textContent = email;
    link.style.color = '#dcd6ff';
    emailContato.appendChild(link);
  }

  const floatingEmail = document.getElementById('floatingEmail');
  if (floatingEmail) {
    floatingEmail.href = mailto;
  }

  // ===========================
  // BOTÃO WHATSAPP
  // ===========================
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const mensagem = `Olá, encontrei seu portfólio na internet e gostaria de conversar com você sobre uma possível oportunidade ou projeto.\n\nHello, I found your portfolio online and would like to talk with you about a possible opportunity or project.`;
      const numero = '5511983930646';
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // ===========================
  // PARTÍCULAS ROXO NEON
  // ===========================
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = [
    '180, 0, 255',
    '160, 32, 255',
    '200, 60, 255',
    '140, 0, 230',
  ];

  const PARTICLE_COUNT = 90;
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      r:      Math.random() * 0.5 + 1.5,
      color:  COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha:  Math.random() * 0.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -(Math.random() * 0.22 + 0.08),
      pulse:  Math.random() * Math.PI * 2,
    };
  }

  particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.pulse += 0.018;
      const alphaFinal = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.8);
      glow.addColorStop(0,   `rgba(${p.color}, ${alphaFinal})`);
      glow.addColorStop(0.4, `rgba(${p.color}, ${alphaFinal * 0.55})`);
      glow.addColorStop(1,   `rgba(${p.color}, 0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${Math.min(alphaFinal + 0.3, 1)})`;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y + p.r < 0) {
        p.y = canvas.height + p.r;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();

});
