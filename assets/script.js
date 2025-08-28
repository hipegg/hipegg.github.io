    let profiles = JSON.parse(localStorage.getItem('profiles')) || [
      {
        id: 1,
        name: "isi yimi",
        image: "assets/profiles/isi.png",
        bio: "mãe de 2",
        links: [
         { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/744028617025257564" },
         { type: "instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/vitimizaram/" }, 
        ]
      },
      {
        id: 2,
        name: "rei",
        image: "assets/profiles/reidocapa.png",
        bio: "respeita o cv",
        links: [
          { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/721561972797210697" }
        ]
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
        ]
      },
        {
        id: 4,
        name: "t4fz",
        image: "assets/profiles/tafz.png",
        bio: "oi fofa!",
        links: [
          { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/385931079606992911" },
          { type: "lastfm", icon: "fab fa-lastfm", url: "https://last.fm/user/i6w" }
         ]
        },
        {
        id: 5,
        name: "pecinha",
        image: "assets/profiles/pecinha.png",
        bio: "444",
        links: [
          { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/1345869146134544517" },
          { type: "instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/farmoputa/" },
        ]
        },
        {
        id: 6,
        name: "'Bya",
        image: "assets/profiles/bya.png",
        bio: "",
        links: [
          { type: "discord", icon: "fab fa-discord", url: "https://discord.com/users/1238887334989004820" },
        ]
    }
    ];
    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
      updateProfileCards();
      setupAdminPanel();
      setupGlobeInteractions();
      setupAudioControls();
      setupBackToTop();
      setupRippleEffect();
      setupKeyboardBlock();
      setupParallaxEffect();
    });

    // Funções do sistema de administração
    function setupAdminPanel() {
      const adminToggle = document.getElementById('adminToggle');
      const adminPanel = document.getElementById('adminPanel');
      const loginBtn = document.getElementById('loginBtn');
      const adminPassword = document.getElementById('adminPassword');
      const addSocialBtn = document.getElementById('addSocialBtn');
      const saveProfileBtn = document.getElementById('saveProfileBtn');
      const cancelEditBtn = document.getElementById('cancelEditBtn');

      adminToggle.addEventListener('click', function() {
        adminPanel.classList.toggle('active');
      });

      loginBtn.addEventListener('click', function() {
        if (adminPassword.value === ADMIN_PASSWORD) {
          isAdmin = true;
          document.getElementById('loginForm').style.display = 'none';
          document.getElementById('adminContent').style.display = 'block';
          adminToggle.innerHTML = '<i class="fas fa-unlock"></i>';
          adminToggle.classList.add('unlocked');
          loadProfilesList();
          adminPassword.value = '';
        } else {
          alert('Senha incorreta!');
        }
      });

      addSocialBtn.addEventListener('click', function() {
        addSocialLinkField();
      });

      saveProfileBtn.addEventListener('click', function() {
        saveProfile();
      });

      cancelEditBtn.addEventListener('click', function() {
        resetProfileForm();
      });
    }

    function loadProfilesList() {
      const profilesList = document.getElementById('profilesList');
      profilesList.innerHTML = '';

      if (profiles.length === 0) {
        profilesList.innerHTML = '<p>Nenhum perfil cadastrado ainda.</p>';
        return;
      }

      profiles.forEach(profile => {
        const profileItem = document.createElement('div');
        profileItem.className = 'profile-item';
        profileItem.innerHTML = `
          <h5>${profile.name}</h5>
          <p>${profile.bio}</p>
          <div class="profile-actions">
            <button class="edit-btn" onclick="editProfile(${profile.id})">Editar</button>
            <button class="delete-btn" onclick="deleteProfile(${profile.id})">Excluir</button>
          </div>
        `;
        profilesList.appendChild(profileItem);
      });
    }

    function addSocialLinkField(type = 'instagram', url = '') {
      const container = document.getElementById('socialLinksContainer');
      const div = document.createElement('div');
      div.className = 'social-link';
      div.innerHTML = `
        <select class="social-type">
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
          <option value="lastfm">Last.fm</option>
          <option value="twitter">Twitter</option>
          <option value="github">GitHub</option>
        </select>
        <input type="text" class="social-url" placeholder="URL" value="${url}">
        <button class="remove-social-btn"><i class="fas fa-times"></i></button>
      `;
      container.appendChild(div);

      div.querySelector('.social-type').value = type;
      div.querySelector('.remove-social-btn').addEventListener('click', function() {
        container.removeChild(div);
      });
    }

    function saveProfile() {
      const id = document.getElementById('editProfileId').value;
      const name = document.getElementById('editProfileName').value.trim();
      const image = document.getElementById('editProfileImage').value.trim();
      const bio = document.getElementById('editProfileBio').value.trim();

      if (!name || !image || !bio) {
        alert('Por favor, preencha pelo menos nome, imagem e biografia!');
        return;
      }

      // Coletar links sociais
      const links = [];
      document.querySelectorAll('.social-link').forEach(linkEl => {
        const type = linkEl.querySelector('.social-type').value;
        const url = linkEl.querySelector('.social-url').value.trim();
        
        if (url) {
          let icon;
          switch(type) {
            case 'instagram': icon = 'fab fa-instagram'; break;
            case 'discord': icon = 'fab fa-discord'; break;
            case 'lastfm': icon = 'fab fa-lastfm'; break;
            case 'twitter': icon = 'fab fa-twitter'; break;
            case 'github': icon = 'fab fa-github'; break;
            default: icon = 'fas fa-link';
          }
          
          links.push({ type, icon, url });
        }
      });

      if (id) {
        // Editar perfil existente
        const index = profiles.findIndex(p => p.id == id);
        if (index !== -1) {
          profiles[index] = { id: parseInt(id), name, image, bio, links };
        }
      } else {
        // Adicionar novo perfil
        const newId = profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
        profiles.push({ id: newId, name, image, bio, links });
      }

      saveProfiles();
      resetProfileForm();
    }

    function editProfile(id) {
      const profile = profiles.find(p => p.id === id);
      if (!profile) return;

      document.getElementById('editProfileId').value = profile.id;
      document.getElementById('editProfileName').value = profile.name;
      document.getElementById('editProfileImage').value = profile.image;
      document.getElementById('editProfileBio').value = profile.bio;

      const container = document.getElementById('socialLinksContainer');
      container.innerHTML = '';

      if (profile.links.length === 0) {
        addSocialLinkField();
      } else {
        profile.links.forEach(link => {
          addSocialLinkField(link.type, link.url);
        });
      }

      document.getElementById('cancelEditBtn').style.display = 'block';
      document.getElementById('adminPanel').classList.add('active');
    }

    function deleteProfile(id) {
      if (confirm('Tem certeza que deseja excluir este perfil?')) {
        profiles = profiles.filter(p => p.id !== id);
        saveProfiles();
      }
    }

    function resetProfileForm() {
      document.getElementById('editProfileId').value = '';
      document.getElementById('editProfileName').value = '';
      document.getElementById('editProfileImage').value = '';
      document.getElementById('editProfileBio').value = '';
      document.getElementById('socialLinksContainer').innerHTML = '';
      document.getElementById('cancelEditBtn').style.display = 'none';
      addSocialLinkField();
    }

    function saveProfiles() {
      localStorage.setItem('profiles', JSON.stringify(profiles));
      updateProfileCards();
      loadProfilesList();
    }

    // Funções para os perfis e visualização
    function updateProfileCards() {
      const container = document.getElementById('profilesContainer');
      container.innerHTML = '';
      
      profiles.forEach(profile => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
          <button class="inspect-btn" onclick="zoomCard(this.parentElement)" aria-label="Ampliar perfil">
            <i class="fas fa-expand"></i>
          </button>
          <img src="${profile.image}" alt="Foto de perfil de ${profile.name}" loading="lazy" class="loading" onload="this.classList.remove('loading')" />
          <h2>${profile.name} <span class="estrela">✧</span></h2>
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
        
        container.appendChild(card);
      });
    }

    // Funções para o globo 3D
    function setupGlobeInteractions() {
      const galaxyViewer = document.getElementById('galaxyViewer');
      const galaxyContainer = document.getElementById('galaxyContainer');
      
      // Mouse drag to rotate
      galaxyViewer.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        galaxyViewer.classList.add('grabbing');
        startPos = { x: e.clientX, y: e.clientY };
        stopAutoRotation();
      });
      
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        currentPos = { x: e.clientX, y: e.clientY };
        
        const deltaX = currentPos.x - startPos.x;
        const deltaY = currentPos.y - startPos.y;
        
        // Sensibilidade de rotação
        globeRotation.y += deltaX * 0.2;
        globeRotation.x += deltaY * 0.1;
        
        // Limitar rotação vertical
        globeRotation.x = Math.max(-60, Math.min(60, globeRotation.x));
        
        updateGlobeRotation();
        startPos = { ...currentPos };
      });
      
      window.addEventListener('mouseup', () => {
        isDragging = false;
        galaxyViewer.classList.remove('grabbing');
      });
      
      // Suporte a touch
      galaxyViewer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          galaxyViewer.classList.add('grabbing');
          startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          stopAutoRotation();
        }
      });
      
      window.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        
        currentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        
        const deltaX = currentPos.x - startPos.x;
        const deltaY = currentPos.y - startPos.y;
        
        globeRotation.y += deltaX * 0.2;
        globeRotation.x += deltaY * 0.1;
        globeRotation.x = Math.max(-60, Math.min(60, globeRotation.x));
        
        updateGlobeRotation();
        startPos = { ...currentPos };
      });
      
      window.addEventListener('touchend', () => {
        isDragging = false;
        galaxyViewer.classList.remove('grabbing');
      });
    }

    function updateGlobeRotation() {
      const galaxyContainer = document.getElementById('galaxyContainer');
      galaxyContainer.style.transform = `
        rotateX(${globeRotation.x}deg)
        rotateY(${globeRotation.y}deg)
      `;
    }

    function positionProfilesOnSphere() {
      const globeSphere = document.getElementById('globeSphere');
      const radius = 150; // Raio da esfera
      const numPoints = profiles.length;
      
      // Algoritmo de esfera de Fibonacci para distribuição uniforme
      for (let i = 0; i < numPoints; i++) {
        const profile = profiles[i];
        const y = 1 - (i / (numPoints - 1)) * 2; // y ∈ [-1, 1]
        const radiusAtY = Math.sqrt(1 - y * y) * radius;
        
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const theta = goldenAngle * i;
        
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        
        const point = document.createElement('div');
        point.className = 'profile-point';
        point.innerHTML = `<img src="${profile.image}" alt="${profile.name}" />`;
        
        // Posicionar no espaço 3D
        point.style.transform = `translate3d(${x}px, ${y * radius}px, ${z}px)`;
        
        // Evento de clique para mostrar detalhes
        point.addEventListener('click', (e) => {
          e.stopPropagation();
          showProfileDetails(profile);
        });
        
        globeSphere.appendChild(point);
      }
    }

    function toggleAutoRotation() {
      if (isAutoRotating) {
        stopAutoRotation();
      } else {
        startAutoRotation();
      }
    }

    function startAutoRotation() {
      if (isAutoRotating) return;
      isAutoRotating = true;
      autoRotateInterval = setInterval(() => {
        if (!isDragging) {
          globeRotation.y += 0.5;
          updateGlobeRotation();
        }
      }, 30);
    }

    function stopAutoRotation() {
      clearInterval(autoRotateInterval);
      isAutoRotating = false;
    }

    function resetGlobeRotation() {
      globeRotation = { x: 0, y: 0 };
      updateGlobeRotation();
    }

    function openGalaxyViewer() {
      const galaxyViewer = document.getElementById('galaxyViewer');
      const globeSphere = document.getElementById('globeSphere');
      
      // Resetar rotação
      globeRotation = { x: 0, y: 0 };
      updateGlobeRotation();
      
      // Limpar pontos existentes
      globeSphere.innerHTML = '';
      
      // Posicionar perfis na esfera
      positionProfilesOnSphere();
      
      galaxyViewer.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Iniciar rotação automática
      startAutoRotation();
    }

    function closeGalaxyViewer() {
      const galaxyViewer = document.getElementById('galaxyViewer');
      galaxyViewer.style.display = 'none';
      document.body.style.overflow = '';
      stopAutoRotation();
    }

    function showProfileDetails(profile) {
      const zoomOverlay = document.createElement('div');
      zoomOverlay.className = 'zoom-overlay';
      zoomOverlay.setAttribute('aria-label', 'Visualização ampliada do perfil');
      
      const profileCard = document.createElement('div');
      profileCard.className = 'card zoomed-card';
      profileCard.innerHTML = `
        <button class="inspect-btn" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = '';" 
                style="position: absolute; top: 15px; right: 15px;" aria-label="Fechar visualização ampliada">
          <i class="fas fa-times"></i>
        </button>
        <img src="${profile.image}" alt="Foto de perfil de ${profile.name}" />
        <h2>${profile.name} <span class="estrela">✧</span></h2>
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
      
      zoomOverlay.appendChild(profileCard);
      document.body.appendChild(zoomOverlay);
      document.body.style.overflow = 'hidden';
    }

    // Funções para zoom dos cards
    function zoomCard(card) {
      const overlay = document.createElement('div');
      overlay.className = 'zoom-overlay';
      overlay.setAttribute('aria-label', 'Visualização ampliada do perfil');
      
      const clonedCard = card.cloneNode(true);
      clonedCard.classList.add('zoomed-card');
      clonedCard.querySelector('.inspect-btn').remove();
      
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '<i class="fas fa-times"></i>';
      closeBtn.className = 'inspect-btn';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '15px';
      closeBtn.style.right = '15px';
      closeBtn.setAttribute('aria-label', 'Fechar visualização ampliada');
      closeBtn.onclick = function() {
        overlay.remove();
        document.body.style.overflow = '';
      };
      
      clonedCard.appendChild(closeBtn);
      overlay.appendChild(clonedCard);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
    }

    // Funções para o sistema de áudio
    function setupAudioControls() {
      const audio = document.getElementById('audio');
      const audioControls = document.getElementById('audioControls');
      const playPauseBtn = document.getElementById('playPauseBtn');
      const volumeSlider = document.getElementById('volumeSlider');

      audio.volume = volumeSlider.value;
      
      playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
          audio.play();
          playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
          playPauseBtn.setAttribute('aria-label', 'Pausar música');
        } else {
          audio.pause();
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
          playPauseBtn.setAttribute('aria-label', 'Tocar música');
        }
      });
      
      volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
      });
      
      audioControls.style.display = 'flex';
    }

    // Função para entrar no site
    function entrar() {
      const btn = document.getElementById('enterBtn');
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        btn.style.transform = 'scale(1.1)';
      }, 100);

      document.getElementById('loader').classList.add('active');

      setTimeout(function() {
        document.getElementById('confirmacao').style.display = 'none';
        document.getElementById('site').style.display = 'flex';
        document.getElementById('loader').classList.remove('active');

        const audio = document.getElementById('audio');
        if (audio) {
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                  console.warn("Autoplay do áudio bloqueado pelo navegador.", error);
                  const audioButton = document.createElement('button');
                  audioButton.textContent = 'Ativar Som';
                  audioButton.style.position = 'fixed';
                  audioButton.style.bottom = '90px';
                  audioButton.style.right = '30px';
                  audioButton.style.padding = '10px 15px';
                  audioButton.style.borderRadius = '20px';
                  audioButton.style.background = 'rgba(255,255,255,0.2)';
                  audioButton.style.color = 'white';
                  audioButton.style.border = '1px solid rgba(255,255,255,0.3)';
                  audioButton.style.cursor = 'pointer';
                  audioButton.style.transition = 'all 0.3s ease';
                  audioButton.style.zIndex = '101';
                  audioButton.setAttribute('aria-label', 'Ativar som do site');

                  audioButton.addEventListener('mouseenter', () => {
                      audioButton.style.background = 'rgba(255,255,255,0.3)';
                      audioButton.style.transform = 'translateY(-2px)';
                  });

                  audioButton.addEventListener('mouseleave', () => {
                      audioButton.style.background = 'rgba(255,255,255,0.2)';
                      audioButton.style.transform = 'translateY(0)';
                  });

                  audioButton.addEventListener('click', () => {
                      audio.play();
                      audioButton.style.transform = 'scale(0.9)';
                      setTimeout(() => {
                        audioButton.style.opacity = '0';
                        setTimeout(() => {
                            audioButton.remove();
                        }, 300);
                      }, 200);
                  });

                  document.body.appendChild(audioButton);
                });
            }
        }
      }, 1500);
    }

    // Função para o botão "Voltar ao topo"
    function setupBackToTop() {
      const backToTopButton = document.getElementById('backToTop');
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });

      backToTopButton.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Efeito de ripple ao clicar
    function setupRippleEffect() {
      document.addEventListener('click', function(e) {
        if (e.target.closest('button, a')) {
            return;
        }
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = document.body.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        document.body.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    }

    // Bloquear funções do teclado
    function setupKeyboardBlock() {
      document.addEventListener('keydown', function(e) {
        const blockedKeys = [123]; // F12
        const blockedCtrlShift = [73, 74, 85]; // I, J, U
        if (blockedKeys.includes(e.keyCode) ||
            (e.ctrlKey && e.shiftKey && blockedCtrlShift.includes(e.keyCode)) ||
            (e.ctrlKey && e.keyCode === 85)) {
          e.preventDefault();
        }
      });
    }

    // Efeito parallax
    function setupParallaxEffect() {
      window.addEventListener('scroll', function() {
          const scrollPosition = window.pageYOffset;
          const cards = document.querySelectorAll('.card');

          cards.forEach((card, index) => {
              if (!card.matches(':hover')) {
                  const speed = 0.05 + (index * 0.02);
                  card.style.transform = `translateY(${scrollPosition * speed}px)`;
              }
          });
      });
    }

    // Carregamento de imagens
    document.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.classList.add('loading');
      }
      img.onload = function() {
        this.classList.remove('loading');
      };
      img.onerror = function() {
        this.classList.remove('loading');
        this.alt = 'Imagem não carregada';
      };
    });
  
