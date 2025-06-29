document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://portofolio-backend-ten.vercel.app/api';
    const contentWrapper = document.getElementById('article-content-wrapper');

    // Mengambil ID artikel dari URL (contoh: article-detail.html?id=12345)
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');

    if (!articleId) {
        contentWrapper.innerHTML = '<h1>Artikel tidak ditemukan.</h1><p>ID artikel tidak ada di URL.</p>';
        return;
    }

    // Mengambil data artikel tunggal dari backend
    fetch(`${API_BASE_URL}/articles/${articleId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Artikel tidak ditemukan atau terjadi error server.');
            }
            return response.json();
        })
        .then(article => {
            // Mengubah judul halaman
            document.title = article.title;
            const formattedBody = '<p>' + article.body.replace(/\n/g, '</p><p>') + '</p>';

            contentWrapper.innerHTML = `
                <div class="article-detail-header">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="article-detail-content">
                    <h1>${article.title}</h1>
                    <div class="meta">
                        <span>Diterbitkan pada: ${new Date(article.id).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div class="article-detail-body">
                        ${article.body || '<p><i>Isi artikel ini belum tersedia. Silakan edit melalui halaman admin.</i></p>'}
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            contentWrapper.innerHTML = `<h1>Gagal memuat artikel.</h1><p>${error.message}</p>`;
        });
});
