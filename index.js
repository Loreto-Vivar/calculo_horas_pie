document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const searchInput = document.getElementById('tool-search');

    // 1. Initial entrance animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '20px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // 2. Extensibility: Real-time Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            cards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tag = card.querySelector('.card-tag').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm) || tag.includes(searchTerm)) {
                    card.style.display = 'flex';
                    // Re-trigger animation feel
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    }

    console.log('Premium Dashboard: Extensibility and Pastel Engine initialized.');
});

/**
 * Verifica la clave de acceso para el área restringida.
 * En una aplicación real, esto se validaría contra un servidor.
 */
function verificarClave() {
    const claveCorrecta = "2024"; // Clave de ejemplo
    const ingreso = prompt("Ingrese la clave de administración para acceder al módulo mensajes y archivos:");

    if (ingreso === claveCorrecta) {
        window.location.href = "mensaje_archivos/archivos.html";
    } else if (ingreso !== null) {
        alert("Clave incorrecta. Acceso denegado.");
    }
}