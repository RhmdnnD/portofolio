document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isAdmin') !== 'true') {
        alert('Akses ditolak. Silakan login sebagai admin.');
        window.location.href = 'login.html';
        return;
    }

    let portfolioData = {};

    const adminMenuToggle = document.getElementById('admin-menu-toggle');
    const adminSidebar = document.getElementById('admin-sidebar');
    const adminHeaderTitle = document.querySelector('.admin-header-title');

    if (adminMenuToggle && adminSidebar) {
        adminMenuToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('active');
            adminMenuToggle.classList.toggle('open');
        });

        // Tutup sidebar jika user mengklik di luar area sidebar
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = adminSidebar.contains(event.target);
            const isClickOnToggle = adminMenuToggle.contains(event.target);
            if (!isClickInsideSidebar && !isClickOnToggle && adminSidebar.classList.contains('active')) {
                adminSidebar.classList.remove('active');
                adminMenuToggle.classList.remove('open');
            }
        });
    }

    // Perbarui judul header saat panel diganti
    const adminNavItems = document.querySelectorAll('.admin-nav-item');
    adminNavItems.forEach(item => {
        item.addEventListener('click', function() {
            if (adminHeaderTitle && !this.classList.contains('back-link')) {
                adminHeaderTitle.textContent = this.textContent;
            }
            // Tutup sidebar setelah item menu diklik di mobile
            if (window.innerWidth <= 992) {
                adminSidebar.classList.remove('active');
                adminMenuToggle.classList.remove('open');
            }
        });
    });

    const initializeDefaultData = () => {
        return {
            home: {
                title: "Halo, saya",
                name: "Rahmad Ananda",
                subtitle: "Web Developer | UI/UX Designer",
                profilePicture: "img/profil.png"
            },
            about: "Perkenalkan, saya Rahmad Ananda, seorang mahasiswa Teknik Informatika di Universitas Maritim Raja Ali Haji dengan minat yang mendalam pada pengembangan web dan desain UI/UX. Saya bersemangat dalam menciptakan situs web yang tidak hanya fungsional tetapi juga memberikan pengalaman pengguna yang intuitif dan menarik. Saya senang mengubah ide-ide kompleks menjadi desain yang sederhana dan elegan, serta selalu antusias untuk mempelajari teknologi baru.",
            skills: [],
            education: [],
            experience: [],
            projects: [],
            organization: [],
            activity: [],
            articles: [],
            contact: {
                email: "mailto:rahmadananda15@gmail.com",
                linkedin: "https://linkedin.com/in/rahmad-ananda-039b13282",
                github: "https://github.com/namaanda",
                whatsapp: "https://wa.me/6282276506041",
                valueTitle: "Nilai per Bulan",
                valueAmount: "Rp 12.000.000,-",
                valueSubtext: "*Rata-rata harga layanan/bisnis bulanan",
                discussionPrompt: "Ingin berdiskusi lebih lanjut? Silakan kirim pesan menggunakan formulir di bawah ini."
            }
        };
    };

    const API_PORTFOLIO_URL = 'https://portofolio-backend-ten.vercel.app/api/portfolio';

    const loadData = () => {
        fetch(API_PORTFOLIO_URL)
            .then(res => res.json())
            .then(data => {
                portfolioData = data || initializeDefaultData();
                renderAllSections();
            })
            .catch(error => {
                console.error('Gagal memuat data dari server:', error);
                portfolioData = initializeDefaultData(); // Gunakan data default jika gagal
                renderAllSections();
            });
    };
    
    const saveData = () => {
        fetch(API_PORTFOLIO_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(portfolioData),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Data berhasil disimpan ke server.');
        })
        .catch(error => {
            console.error('Gagal menyimpan data ke server:', error);
            alert('Terjadi kesalahan saat menyimpan data.');
        });
    };

    const navItems = document.querySelectorAll('.admin-nav-item');
    const panels = document.querySelectorAll('.admin-panel');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                navItems.forEach(i => i.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                document.querySelector(this.getAttribute('href')).classList.add('active');
            }
        });
    });

    const renderHome = () => {
        const homeForm = document.getElementById('home-form');
        if (!homeForm) return;
        const heroTitleInput = document.getElementById('hero-title');
        const heroNameInput = document.getElementById('hero-name');
        const heroSubtitleInput = document.getElementById('hero-subtitle');
        const profilePreview = document.getElementById('profile-preview');
        
        const homeData = portfolioData.home;
        if(homeData){
            heroTitleInput.value = homeData.title || '';
            heroNameInput.value = homeData.name || '';
            heroSubtitleInput.value = homeData.subtitle || '';
            profilePreview.src = homeData.profilePicture || 'img/profil.png';
        }
    };
    
    const profileUpload = document.getElementById('profile-picture-upload');
    if (profileUpload) {
        profileUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profile-preview').src = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const homeForm = document.getElementById('home-form');
    if (homeForm) {
        homeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            portfolioData.home.title = document.getElementById('hero-title').value;
            portfolioData.home.name = document.getElementById('hero-name').value;
            portfolioData.home.subtitle = document.getElementById('hero-subtitle').value;
            const profilePreviewSrc = document.getElementById('profile-preview').src;
            if (profilePreviewSrc.startsWith('data:image')) {
                portfolioData.home.profilePicture = profilePreviewSrc;
            }
            saveData();
            alert('Data Halaman Utama berhasil diperbarui!');
        });
    }

    const renderAbout = () => {
        const aboutText = document.getElementById('about-text');
        if(aboutText) {
            aboutText.value = portfolioData.about || '';
        }
    };
    const aboutForm = document.getElementById('about-form');
    if (aboutForm) {
        aboutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            portfolioData.about = document.getElementById('about-text').value;
            saveData();
            alert('Deskripsi "Tentang Saya" berhasil diperbarui!');
        });
    }

    const renderContact = () => {
        const contactFormAdmin = document.getElementById('contact-form-admin');
        if (!contactFormAdmin) return;
        const contactData = portfolioData.contact;
        if (contactData) {
            document.getElementById('contact-email').value = contactData.email || '';
            document.getElementById('contact-linkedin').value = contactData.linkedin || '';
            document.getElementById('contact-github').value = contactData.github || '';
            document.getElementById('contact-whatsapp').value = contactData.whatsapp || '';
            document.getElementById('contact-value-title').value = contactData.valueTitle || '';
            document.getElementById('contact-value-amount').value = contactData.valueAmount || '';
            document.getElementById('contact-value-subtext').value = contactData.valueSubtext || '';
            document.getElementById('contact-discussion-prompt').value = contactData.discussionPrompt || '';
        }
    };
    const contactFormAdmin = document.getElementById('contact-form-admin');
    if (contactFormAdmin) {
        contactFormAdmin.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!portfolioData.contact) portfolioData.contact = {};
            
            portfolioData.contact.email = document.getElementById('contact-email').value;
            portfolioData.contact.linkedin = document.getElementById('contact-linkedin').value;
            portfolioData.contact.github = document.getElementById('contact-github').value;
            portfolioData.contact.whatsapp = document.getElementById('contact-whatsapp').value;
            portfolioData.contact.valueTitle = document.getElementById('contact-value-title').value;
            portfolioData.contact.valueAmount = document.getElementById('contact-value-amount').value;
            portfolioData.contact.valueSubtext = document.getElementById('contact-value-subtext').value;
            portfolioData.contact.discussionPrompt = document.getElementById('contact-discussion-prompt').value;
            saveData();
            alert('Informasi kontak berhasil diperbarui!');
        });
    }

    const setupCrud = (sectionName, idPrefix) => {
        const form = document.getElementById(`${idPrefix}-form`);
        if (!form) return () => {}; 

        const list = document.getElementById(`${idPrefix}-list`);
        const clearBtn = document.getElementById(`clear-${idPrefix}-form`);

        const imageUpload = document.getElementById(`${idPrefix}-image-upload`);
        if (imageUpload) {
            const imagePreview = document.getElementById(`${idPrefix}-preview`);
            const imageBase64Input = document.getElementById(`${idPrefix}-image-base64`);
            
            imageUpload.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        imagePreview.src = e.target.result;
                        if(imageBase64Input) imageBase64Input.value = e.target.result;
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }

        const renderList = () => {
            if (!list) return;
            list.innerHTML = '';
            if (portfolioData[sectionName]) {
                portfolioData[sectionName].forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${item.name || item.title}</span>
                        <div class="crud-buttons">
                            <button class="edit-btn"><i class="fas fa-edit"></i></button>
                            <button class="delete-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    `;
                    li.querySelector('.edit-btn').addEventListener('click', () => editItem(item));
                    li.querySelector('.delete-btn').addEventListener('click', () => deleteItem(item.id));
                    list.appendChild(li);
                });
            }
        };

        const editItem = (item) => {
            form.reset();
            form.querySelectorAll('input[type="hidden"]').forEach(input => input.value = '');
            form.querySelector('input[type="hidden"]').value = item.id;
            for (const key in item) {
                if (key !== 'id' && form.querySelector(`#${idPrefix}-${key}`)) {
                     form.querySelector(`#${idPrefix}-${key}`).value = item[key];
                }
            }
            if (imageUpload) {
                const imagePreview = document.getElementById(`${idPrefix}-preview`);
                const imageBase64Input = document.getElementById(`${idPrefix}-image-base64`);
                imagePreview.src = item.image || 'https://placehold.co/600x400/282828/E0E0E0?text=Pratinjau';
                if(imageBase64Input) imageBase64Input.value = item.image || '';
            }
        };
        
        const deleteItem = (id) => {
            if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
                portfolioData[sectionName] = portfolioData[sectionName].filter(item => item.id !== id);
                saveData();
                renderList();
            }
        };

        const clearForm = () => {
            form.reset();
            form.querySelectorAll('input[type="hidden"]').forEach(input => input.value = '');
            if (imageUpload) {
                document.getElementById(`${idPrefix}-preview`).src = 'https://placehold.co/600x400/282828/E0E0E0?text=Pratinjau';
            }
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const idInput = form.querySelector('input[type="hidden"]');
            const id = parseInt(idInput.value);
            
            const newItemData = {};
            form.querySelectorAll('input, textarea').forEach(input => {
                if (input.id && input.type !== 'file' && input.type !== 'hidden') {
                    const key = input.id.replace(`${idPrefix}-`, '');
                    newItemData[key] = input.type === 'number' ? parseInt(input.value) : input.value;
                }
            });

            const imageBase64Input = document.getElementById(`${idPrefix}-image-base64`);
            if (imageUpload && imageBase64Input && imageBase64Input.value) {
                newItemData.image = imageBase64Input.value;
            }

            if (id) {
                const itemIndex = portfolioData[sectionName].findIndex(item => item.id === id);
                if(imageUpload && !newItemData.image) {
                    newItemData.image = portfolioData[sectionName][itemIndex].image;
                }
                portfolioData[sectionName][itemIndex] = { ...portfolioData[sectionName][itemIndex], ...newItemData };
            } else {
                newItemData.id = Date.now();
                if (!portfolioData[sectionName]) portfolioData[sectionName] = [];
                portfolioData[sectionName].push(newItemData);
            }
            saveData();
            renderList();
            clearForm();
        });
        
        if(clearBtn) {
            clearBtn.addEventListener('click', clearForm);
        }

        return renderList;
    };
    
    const renderSkills = setupCrud('skills', 'skill');
    const renderEducation = setupCrud('education', 'education');
    const renderExperience = setupCrud('experience', 'experience');
    const renderProjects = setupCrud('projects', 'project');
    const renderOrganization = setupCrud('organization', 'organization');
    const renderActivity = setupCrud('activity', 'activity');
    const renderArticles = setupCrud('articles', 'article'); 


    const renderAllSections = () => {
        renderHome();
        renderAbout();
        renderSkills();
        renderEducation();
        renderExperience();
        renderProjects();
        renderOrganization();
        renderActivity();
        renderArticles();
        renderContact();
    };

    loadData();
    renderAllSections();
});
