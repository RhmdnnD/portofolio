document.addEventListener('DOMContentLoaded', function() {
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

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            errorMessage.textContent = ''; // Kosongkan pesan error

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Ganti URL dengan URL backend Anda setelah di-hosting di Langkah 5
            const API_LOGIN_URL = 'https://portofolio-backend-ten.vercel.app/api/login';

            fetch(API_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Username atau password salah');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    localStorage.setItem('isAdmin', 'true');
                    window.location.href = 'admin.html'; // Arahkan ke admin.html setelah berhasil
                }
            })
            .catch(error => {
                errorMessage.textContent = error.message;
            });
        });
    }
});
