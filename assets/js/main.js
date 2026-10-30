/**
 * Vijay Kumar - Developer Portfolio
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Link Spy
  const navbar = document.querySelector('.custom-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('show');
    }

    // Scrollspy highlight
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Typing Effect for Sub-headline
  const typedSpan = document.getElementById('typedText');
  if (typedSpan) {
    const words = [
      'I build digital solutions',
      'I create AI automation workflows',
      'I develop modern web applications',
      'I craft scalable cloud systems'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }
    type();
  }

  // 3. Code Snippet Copy Action
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeToCopy = `const developer = {
  name: 'Vijay Kumar',
  role: 'Full Stack Developer',
  passion: 'AI & Automation',
  build: 'Digital Solutions'
};
console.log("Let's build the future");`;

      navigator.clipboard.writeText(codeToCopy).then(() => {
        const originalHtml = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = '<i class="bi bi-check-lg text-success"></i>';
        showToast('Code copied to clipboard!');
        setTimeout(() => {
          copyCodeBtn.innerHTML = originalHtml;
        }, 2000);
      }).catch(() => {
        showToast('Unable to copy code', 'warning');
      });
    });
  }

  // 4. Animated Skill Bars using IntersectionObserver
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  if (skillBars.length > 0) {
    const observerOptions = { threshold: 0.25 };
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    }, observerOptions);

    skillBars.forEach((bar) => skillObserver.observe(bar));
  }

  // 5. Interactive Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Interactive Voice Agent Audio Preview
  const playVoiceBtn = document.getElementById('playVoiceBtn');
  const voiceAudio = document.getElementById('voiceAudio');
  if (playVoiceBtn && voiceAudio) {
    playVoiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (voiceAudio.paused) {
        voiceAudio.play().then(() => {
          playVoiceBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Playing AI Voice...';
          playVoiceBtn.classList.add('playing');
        }).catch(() => {
          showToast('Audio playback could not start automatically', 'info');
        });
      } else {
        voiceAudio.pause();
        voiceAudio.currentTime = 0;
        playVoiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i> Listen AI Voice';
        playVoiceBtn.classList.remove('playing');
      }
    });

    voiceAudio.addEventListener('ended', () => {
      playVoiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i> Listen AI Voice';
      playVoiceBtn.classList.remove('playing');
    });
  }

  // 7. Dynamic Project Modal Details
  const projectData = {
    ats: {
      title: 'ATS Resume Screening Automation',
      image: 'assets/img/project-ats.png',
      badge: 'AI & Automation Workflow',
      tags: ['n8n', 'Google Sheets', 'OpenAI / Gemini', 'Email Automation', 'REST API'],
      summary: 'A complete end-to-end automated workflow that receives candidate resumes via webhook or email, parses candidate skills and work history, calculates an ATS match score based on job requirements, stores categorized data in Google Sheets, and triggers automated email notifications.',
      highlights: [
        'Automated multi-format resume ingestion (PDF, DOCX)',
        'LLM-powered contextual matching against job description',
        'Automatic scoring (0-100%) and instant Google Sheets synchronization',
        'Real-time automated status email notification to candidates & HR'
      ],
      github: 'https://github.com',
      live: '#'
    },
    voice: {
      title: 'AI Voice Agent',
      image: 'assets/img/project-voice.png',
      badge: 'Conversational Voice AI',
      tags: ['ElevenLabs', 'n8n', 'FastAPI', 'WebSockets', 'AI Voice'],
      summary: 'An intelligent real-time AI conversational voice agent created using ElevenLabs voice cloning and generative AI. Built to handle customer queries, interactive technical tutoring, and workflow execution with ultra-low latency response.',
      highlights: [
        'Natural speech synthesis and realistic voice modulation using ElevenLabs',
        'Bi-directional streaming with instant context comprehension',
        'Automated intent extraction and webhook triggering in n8n',
        'Audio playground enabled with custom sample integration'
      ],
      github: 'https://github.com',
      live: '#'
    },
    vkstore: {
      title: 'VK Store - Modern E-Commerce Platform',
      image: 'assets/img/project-vkstore.png',
      badge: 'Full-Stack Web App',
      tags: ['React.js', 'Vite', 'JavaScript', 'CSS3', 'Responsive UI'],
      summary: 'A sleek, lightning-fast modern e-commerce storefront crafted with React and modern UI practices. Features clean product cataloging, responsive cart management, price filtering, search, and a seamless checkout experience.',
      highlights: [
        'Component-driven architecture built with React and Vite for sub-second page loads',
        'Intuitive cart state management with real-time total and discount calculations',
        'Modern responsive UI optimized for desktops, tablets, and smartphones',
        'Modern dark/light aesthetic matching contemporary shopping platforms'
      ],
      github: 'https://github.com',
      live: 'https://vk-store-chi.vercel.app/'
    }
  };

  const projectModalEl = document.getElementById('projectDetailModal');
  const projectModal = projectModalEl ? new bootstrap.Modal(projectModalEl) : null;

  document.querySelectorAll('[data-project-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-target');
      const data = projectData[key];
      if (!data) return;

      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectBadge').textContent = data.badge;
      document.getElementById('modalProjectImg').src = data.image;
      document.getElementById('modalProjectSummary').textContent = data.summary;

      // Render tags
      const tagsContainer = document.getElementById('modalProjectTags');
      tagsContainer.innerHTML = '';
      data.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'project-tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });

      // Render highlights
      const highlightsContainer = document.getElementById('modalProjectHighlights');
      highlightsContainer.innerHTML = '';
      data.highlights.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-check-circle-fill text-purple me-2"></i> ${item}`;
        highlightsContainer.appendChild(li);
      });

      // Update Live Link
      const liveBtn = document.getElementById('modalProjectLiveLink');
      if (liveBtn) {
        if (data.live && data.live !== '#') {
          liveBtn.href = data.live;
          liveBtn.setAttribute('target', '_blank');
          liveBtn.innerHTML = 'Visit Live Site <i class="bi bi-box-arrow-up-right ms-1"></i>';
        } else {
          liveBtn.href = '#contact';
          liveBtn.removeAttribute('target');
          liveBtn.innerHTML = 'Discuss This Project <i class="bi bi-arrow-right ms-1"></i>';
        }
      }

      if (projectModal) projectModal.show();
    });
  });

  // 8. Contact & Hire Me Form Handlers
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent successfully to Vijay Kumar.');
      contactForm.reset();
      const hireModal = bootstrap.Modal.getInstance(document.getElementById('hireModal'));
      if (hireModal) hireModal.hide();
    });
  }

  // 9. Toast Notification Helper
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-dark border-0 mb-2 shadow-lg';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    const iconClass = type === 'success' ? 'bi-check-circle-fill text-success' : 'bi-info-circle-fill text-info';

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${iconClass} fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }
});
