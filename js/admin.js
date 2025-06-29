document.addEventListener('DOMContentLoaded', function() {
    // 1. Pemeriksaan Login
    if (localStorage.getItem('isAdmin') !== 'true') {
        alert('Akses ditolak. Silakan login sebagai admin.');
        window.location.href = 'login.html';
        return;
    }

    // 2. Variabel Global dan URL Backend yang Benar
    let portfolioData = {};
    const API_PORTFOLIO_URL = 'https://portofolio-backend-ten.vercel.app/api/portfolio';


    const navItems = document.querySelectorAll('.admin-nav-item');
    const panels = document.querySelectorAll('.admin-panel');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Hanya jalankan jika link adalah anchor (#)
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
    
                // 1. Hapus kelas 'active' dari semua menu dan panel
                navItems.forEach(i => i.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
    
                // 2. Tambahkan kelas 'active' ke menu yang diklik
                this.classList.add('active');
    
                // 3. Tampilkan panel yang sesuai dengan menu yang diklik
                const targetPanel = document.querySelector(this.getAttribute('href'));
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            }
        });
    });

    // 3. Struktur Data Default untuk Mencegah Error
    const initializeDefaultData = () => {
        return {
            home: {},
            about: "",
            skills: [],
            education: [],
            experience: [],
            projects: [],
            organization: [],
            activity: [],
            articles: [],
            contact: {}
        };
    };

    // 4. FUNGSI BARU UNTUK MEMUAT DATA DARI SERVER
    const loadData = () => {
        fetch(API_PORTFOLIO_URL)
            .then(res => res.json())
            .then(serverData => {
                const defaultData = initializeDefaultData();
                // Menggabungkan data dari server dengan struktur default
                // Ini mencegah error "cannot set properties of undefined"
                portfolioData = { ...defaultData, ...serverData };
                renderAllSections();
            })
            .catch(error => {
                console.error('Gagal memuat data dari server:', error);
                portfolioData = initializeDefaultData();
                renderAllSections();
            });
    };

    // 5. FUNGSI BARU UNTUK MENYIMPAN DATA KE SERVER
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
            alert('Terjadi kesalahan saat menyimpan data ke server.');
        });
    };

    // --- SISA KODE (SEMUA EVENT LISTENER FORM) TETAP SAMA ---
    // Pastikan semua listener form Anda (home, about, contact, dll.)
    // memanggil saveData() setelah mengubah portfolioData.

    // Contoh untuk form Home (pastikan blok kode Anda seperti ini)
    const homeForm = document.getElementById('home-form');
    if (homeForm) {
        homeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!portfolioData.home) portfolioData.home = {}; // Pencegahan error
            portfolioData.home.title = document.getElementById('hero-title').value;
            portfolioData.home.name = document.getElementById('hero-name').value;
            portfolioData.home.subtitle = document.getElementById('hero-subtitle').value;
            const profilePreviewSrc = document.getElementById('profile-preview').src;
            if (profilePreviewSrc.startsWith('data:image')) {
                portfolioData.home.profilePicture = profilePreviewSrc;
            }
            saveData(); // Memanggil fungsi penyimpanan yang benar
            alert('Data Halaman Utama berhasil diperbarui!');
        });
    }

    // (Kode lainnya seperti renderHome, setupCrud, dll., biarkan seperti adanya)
    // Kode di bawah ini mengasumsikan sisa file Anda sudah benar.
    // Jika Anda menempel seluruh kode dari awal hingga akhir,
    // pastikan semua fungsi render dan setupCrud ada di dalamnya.

    const renderHome = () => {
        const homeForm = document.getElementById('home-form');
        if (!homeForm) return;
        const heroTitleInput = document.getElementById('hero-title');
        const heroNameInput = document.getElementById('hero-name');
        const heroSubtitleInput = document.getElementById('hero-subtitle');
        const profilePreview = document.getElementById('profile-preview');
        const homeData = portfolioData.home || {};
        heroTitleInput.value = homeData.title || '';
        heroNameInput.value = homeData.name || '';
        heroSubtitleInput.value = homeData.subtitle || '';
        profilePreview.src = homeData.profilePicture || 'img/profil.png';
    };
    
    const profileUpload = document.getElementById('profile-picture-upload');
    if (profileUpload) {
        profileUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) { document.getElementById('profile-preview').src = e.target.result; };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    const aboutForm = document.getElementById('about-form');
    if (aboutForm) {
        aboutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            portfolioData.about = document.getElementById('about-text').value;
            saveData();
            alert('Deskripsi "Tentang Saya" berhasil diperbarui!');
        });
    }
    
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

    const renderAbout = () => {
        const aboutText = document.getElementById('about-text');
        if(aboutText) { aboutText.value = portfolioData.about || ''; }
    };

    const renderContact = () => {
        const contactFormAdmin = document.getElementById('contact-form-admin');
        if (!contactFormAdmin) return;
        const contactData = portfolioData.contact || {};
        document.getElementById('contact-email').value = contactData.email || '';
        document.getElementById('contact-linkedin').value = contactData.linkedin || '';
        document.getElementById('contact-github').value = contactData.github || '';
        document.getElementById('contact-whatsapp').value = contactData.whatsapp || '';
        document.getElementById('contact-value-title').value = contactData.valueTitle || '';
        document.getElementById('contact-value-amount').value = contactData.valueAmount || '';
        document.getElementById('contact-value-subtext').value = contactData.valueSubtext || '';
        document.getElementById('contact-discussion-prompt').value = contactData.discussionPrompt || '';
    };

    // Fungsi setupCrud Anda (biarkan seperti adanya)
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
        
        if(clearBtn) { clearBtn.addEventListener('click', clearForm); }
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
});
