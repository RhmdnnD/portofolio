document.addEventListener('DOMContentLoaded', function() {
    // --- Logika Hamburger Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('nav-active');
        });

        // Tutup menu saat sebuah link di dalamnya diklik
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav-active')) {
                    menuToggle.classList.remove('open');
                    navMenu.classList.remove('nav-active');
                }
            });
        });
    }

    // --- Autentikasi dan Navigasi Dinamis ---
    function setupAuthNav() {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const adminLink = document.getElementById('admin-link');
        const logoutLink = document.getElementById('logout-link');

        if (isAdmin) {
            if (adminLink) adminLink.style.display = 'list-item';
            if (logoutLink) {
                logoutLink.style.display = 'list-item';
                const logoutBtn = logoutLink.querySelector('a');
                if (!logoutBtn.hasAttribute('data-listener-attached')) {
                    logoutBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        localStorage.removeItem('isAdmin');
                        window.location.reload();
                    });
                    logoutBtn.setAttribute('data-listener-attached', 'true');
                }
            }
        }
    }

    const API_PORTFOLIO_URL = 'https://portofolio-backend-ten.vercel.app/';

    let portfolioData = {};

    function loadDynamicData() {
        fetch(API_PORTFOLIO_URL)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    portfolioData = data;
                    renderDynamicContent();
                }
            })
            .catch(error => console.error("Gagal mengambil data portofolio:", error));
    }

    function renderDynamicContent() {
        // Render Home
        if (portfolioData.home) {
            const homeData = portfolioData.home;
            const heroTitleEl = document.getElementById('dynamic-hero-title');
            const heroSubtitleEl = document.getElementById('dynamic-hero-subtitle');
            const profilePicEl = document.getElementById('dynamic-profile-pic');
            
            if(heroTitleEl) heroTitleEl.innerHTML = `${homeData.title || 'Halo, saya'}<br><span id="dynamic-hero-name">${homeData.name || 'Nama Anda'}</span>`;
            if(heroSubtitleEl) heroSubtitleEl.textContent = homeData.subtitle || 'Sub-judul Anda';
            if(profilePicEl) profilePicEl.src = homeData.profilePicture || 'img/profil.png';
        }

        // Render "Tentang Saya"
        const aboutMeElement = document.getElementById('dynamic-about-me');
        if (aboutMeElement && portfolioData.about) {
            aboutMeElement.textContent = portfolioData.about;
        }

        // Render Skills
        const skillsGrid = document.getElementById('dynamic-skills-grid');
        if (skillsGrid && portfolioData.skills) {
            skillsGrid.innerHTML = '';
            portfolioData.skills.forEach(skill => {
                const skillHTML = `
                    <div class="skill-item-circular" data-progress="${skill.progress}" style="--skill-color: ${skill.color};">
                        <div class="skill-circle">
                            <div class="skill-inner">
                                <i class="${skill.icon}"></i>
                                <div class="percentage">0%</div>
                            </div>
                        </div>
                        <div class="skill-name">${skill.name}</div>
                    </div>`;
                skillsGrid.innerHTML += skillHTML;
            });
             animateSkills();
        }
        
        // Render Edukasi
        const educationTimeline = document.getElementById('dynamic-education-timeline');
        if(educationTimeline && portfolioData.education) {
            educationTimeline.innerHTML = '';
            portfolioData.education.forEach(edu => {
                const eduHTML = `
                <div class="timeline">
                    <div class="timeline-item">
                        <h3>${edu.title}</h3>
                        <p>${edu.subtitle}, ${edu.period}</p>
                    </div>
                </div>`;
                educationTimeline.innerHTML += eduHTML;
            });
        }
        
        // Render Experience
        const experienceTimeline = document.getElementById('dynamic-experience-timeline');
        if(experienceTimeline && portfolioData.experience) {
            experienceTimeline.innerHTML = '';
            portfolioData.experience.forEach(exp => {
                let pointsHTML = '';
                if (exp.description && exp.description.trim() !== '') {
                    pointsHTML = '<ul>';
                    exp.description.split('\n').forEach(point => {
                        if (point.trim() !== '') {
                            pointsHTML += `<li>${point.trim()}</li>`;
                        }
                    });
                    pointsHTML += '</ul>';
                }
                
                const expHTML = `
                <div class="timeline">
                    <div class="timeline-item">
                        <h3>${exp.title}</h3>
                        <p>${exp.subtitle}, ${exp.period}</p>
                        ${pointsHTML}
                    </div>
                </div>`;
                experienceTimeline.innerHTML += expHTML;
            });
        }

        // Render Organisasi
        const organizationTimeline = document.getElementById('dynamic-organization-timeline');
        if(organizationTimeline && portfolioData.organization) {
            organizationTimeline.innerHTML = '';
            portfolioData.organization.forEach(org => {
                const orgHTML = `
                <div class="timeline">
                    <div class="timeline-item">
                        <h3>${org.title}</h3>
                        <p>${org.subtitle}, ${org.period}</p>
                    </div>
                </div>`;
                organizationTimeline.innerHTML += orgHTML;
            });
        }

        // Render Aktivitas
        const activityTimeline = document.getElementById('dynamic-activity-timeline');
        if(activityTimeline && portfolioData.activity) {
            activityTimeline.innerHTML = '';
            portfolioData.activity.forEach(act => {
                const actHTML = `
                <div class="timeline">
                    <div class="timeline-item">
                        <h3>${act.title}</h3>
                        <p>${act.subtitle}, ${act.period}</p>
                    </div>
                </div>`;
                activityTimeline.innerHTML += actHTML;
            });
        }
        
        // Render Proyek
        const projectsGrid = document.getElementById('dynamic-projects-grid');
        if(projectsGrid && portfolioData.projects) {
            projectsGrid.innerHTML = '';
            portfolioData.projects.forEach(proj => {
                const projHTML = `
                <div class="project-item">
                    <img src="${proj.image}" alt="${proj.title}" onerror="this.src='https://placehold.co/600x400/282828/E0E0E0?text=Gambar+Error'">
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                    <a href="${proj.link}" target="_blank">Lihat Proyek</a>
                </div>`;
                projectsGrid.innerHTML += projHTML;
            });
        }

        // Render Artikel
        const articlesGrid = document.getElementById('dynamic-articles-grid');
        if (articlesGrid && portfolioData.articles) {
            articlesGrid.innerHTML = '';
            portfolioData.articles.forEach(article => {
                const articleHTML = `
                <div class="article-item">
                    <img src="${article.image || 'https://placehold.co/600x400/333/E0E0E0?text=Artikel'}" alt="${article.title}" class="article-image">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.link}" target="_blank">Baca Selengkapnya</a>
                </div>`;
                articlesGrid.innerHTML += articleHTML;
            });
        }

        // Render Kontak
        if(portfolioData.contact){
            const contactData = portfolioData.contact;
            document.getElementById('dynamic-email').href = contactData.email || '#';
            document.getElementById('dynamic-linkedin').href = contactData.linkedin || '#';
            document.getElementById('dynamic-github').href = contactData.github || '#';
            document.getElementById('dynamic-whatsapp').href = contactData.whatsapp || '#';
            document.getElementById('dynamic-value-title').textContent = contactData.valueTitle || '';
            document.getElementById('dynamic-value-amount').textContent = contactData.valueAmount || '';
            document.getElementById('dynamic-value-subtext').textContent = contactData.valueSubtext || '';
            document.getElementById('dynamic-discussion-prompt').textContent = contactData.discussionPrompt || '';
        }
    }

    // --- Inisialisasi dan Event Listeners Lainnya ---
    setupAuthNav();
    loadDynamicData();

    // 1. Smooth scrolling
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    document.querySelectorAll('.navbar nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // 2. Highlight navigasi saat scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar nav ul li a');
    window.addEventListener('scroll', () => {
        let currentActiveSectionId = '';
        const scrollPosition = window.pageYOffset + navbarHeight + 50;
        sections.forEach(section => {
            if (section.id && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // 3. Animasi Skill Circle
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item-circular');
        if (skillItems.length > 0) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const item = entry.target;
                        const circle = item.querySelector('.skill-circle');
                        const percentageDiv = item.querySelector('.percentage');
                        const targetProgress = parseInt(item.getAttribute('data-progress'), 10);
                        let currentProgress = 0;
                        
                        const interval = setInterval(() => {
                            currentProgress++;
                            const angle = (currentProgress / 100) * 360;
                            percentageDiv.textContent = `${currentProgress}%`;
                            circle.style.background = `conic-gradient(var(--skill-color, #A0A0A0) ${angle}deg, #444 ${angle}deg)`;

                            if (currentProgress >= targetProgress) {
                                clearInterval(interval);
                                percentageDiv.textContent = `${targetProgress}%`;
                            }
                        }, 20);
                        observer.unobserve(item);
                    }
                });
            }, { threshold: 0.5 });
            skillItems.forEach(item => observer.observe(item));
        }
    }
    
    // 4. Modal Kontak
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.querySelector('.close-btn');
    const openModal = () => { if (modal) modal.style.display = 'block'; };
    const closeModal = () => { if (modal) modal.style.display = 'none'; };
    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const modal = document.getElementById('contact-modal'); // Pastikan modal diakses
            const closeModal = () => { if (modal) modal.style.display = 'none'; }; // Pastikan fungsi close ada

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Pesan Anda berhasil terkirim!');
                    closeModal();
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('Oops! Terjadi masalah saat mengirim formulir.');
                        }
                    })
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('Oops! Terjadi masalah saat mengirim pesan Anda.');
            });
        });
    }

    // 5. Inisialisasi Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#888", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 100 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }
});
