let profiles = JSON.parse(localStorage.getItem('profiles')) || [
  {
    id: 1,
    name: "t4fz",
    image: "assets/profiles/tafz.png",
    bio: "oi",
    links: [
      { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/385931079606992911" },
      { type: "lastfm", icon: "fab fa-lastfm", url: "https://last.fm/user/i6w" }
    ],
    special: true
  },
  {
    id: 2,
    name: "rei",
    image: "assets/profiles/reidocapa.png",
    bio: "respeita o cv",
    links: [
      { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/721561972797210697" }
    ],
    special: true
  },
  {
    id: 3,
    name: "nezay",
    image: "assets/profiles/nezay.png",
    bio: "🔪",
    links: [
      { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/187902749113974785" },
      { type: "instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/nnnezay/" },
      { type: "lastfm", icon: "fab fa-lastfm", url: "https://last.fm/user/nezaay" }
    ],
    special: true
  },
  {
    id: 5,
    name: "isi yumi",
    image: "assets/profiles/isi.png",
    bio: "mãe de 2",
    links: [
      { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/744028617025257564" },
      { type: "instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/vitimizaram/" }
    ],
    special: true
  },
  {
    id: 4,
    name: "pecinha",
    image: "assets/profiles/pecinha.png",
    bio: "444",
    links: [
      { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/1345869146134544517" },
      { type: "instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/farmoputa/" }
    ]
  },
  {
    id: 6,
    name: "'Bya",
    image: "assets/profiles/bya.png",
    bio: "",
    links: [
      { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/1238887334989004820" }
    ]
  }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  updateProfileCards();
  setupAudioControls();
  setupBackToTop();
  setupRippleEffect();
  setupKeyboardBlock();
  setupParallaxEffect();
  document.getElementById('enterBtn').addEventListener('click', entrar);
});

// Renderizar perfis
function updateProfileCards() {
  const container = document.getElementById('profilesContainer');
  container.innerHTML = '';

  profiles.forEach(profile => {
    const card = document.createElement('div');
    card.className = profile.special ? 'card special-card' : 'card';

    card.innerHTML = `
      <button class="inspect-btn" aria-label="Ampliar perfil"><i class="fas fa-expand"></i></button>
      <img src="${profile.image}" alt="Foto de perfil de ${profile.name}" loading="lazy" />
      <h2>${profile.name} ${profile.special ? `<span class="kanji-symbol">愛</span>` : `<span class="estrela">✧</span>`}</h2>
      <p>${profile.bio}</p>
      <div class="icons">
        ${profile.links.map(link => `
          <a href="${link.url}" target="_blank" aria-label="${link.type} de ${profile.name}" class="tooltip">
            <i class="${link.icon}"></i>
            <span class="tooltiptext">${link.type.charAt(0).toUpperCase() + link.type.slice(1)}</span>
          </a>
        `).join('')}
      </div>
    `;

    card.querySelector('.inspect-btn').addEventListener('click', () => zoomCard(card));
    container.appendChild(card);
  });
}

// Zoom card
function zoomCard(card) {
  const overlay = document.createElement('div');
  overlay.className = 'zoom-overlay';

  const cloned = card.cloneNode(true);
  cloned.classList.add('zoomed-card');
  cloned.querySelector('.inspect-btn').remove();

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.className = 'inspect-btn';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '15px';
  closeBtn.style.right = '15px';
  closeBtn.onclick = () => overlay.remove();

  cloned.appendChild(closeBtn);
  overlay.appendChild(cloned);
  document.body.appendChild(overlay);
}

// Áudio
function setupAudioControls() {
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const volumeSlider = document.getElementById('volumeSlider');

  audio.volume = volumeSlider.value;

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });
}

// Entrar
function entrar() {
  document.getElementById('loader').classList.add('active');
  setTimeout(() => {
    document.getElementById('confirmacao').style.display = 'none';
    document.getElementById('site').style.display = 'flex';
    document.getElementById('loader').classList.remove('active');
  }, 1500);
}

// Back to top
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    window.pageYOffset > 300 ? btn.classList.add('visible') : btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Ripple effect
function setupRippleEffect() {
  document.addEventListener('click', e => {
    if (e.target.closest('button, a')) return;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// Bloqueio de teclas
function setupKeyboardBlock() {
  document.addEventListener('keydown', e => {
    if (e.keyCode === 123 || (e.ctrlKey && (e.shiftKey && [73, 74, 85].includes(e.keyCode)) || (e.keyCode === 85))) {
      e.preventDefault();
    }
  });
}

// Parallax
function setupParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    document.querySelectorAll('.card').forEach((card, i) => {
      if (!card.matches(':hover')) {
        card.style.transform = `translateY(${scroll * (0.05 + i * 0.02)}px)`;
      }
    });
  });
}
