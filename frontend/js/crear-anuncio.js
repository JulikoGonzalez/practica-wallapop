document.addEventListener('DOMContentLoaded', () => {

    // Si no estás logueado, te manda al login
    if (!estaLogueado()) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.querySelector('#form-crear-anuncio');
    const mensajeFeedback = document.querySelector('#mensaje-feedback');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const datosAnuncio = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            precio: parseFloat(formData.get('precio')),
            tipo: formData.get('tipo'),
            foto: formData.get('foto') || ''
        };

        mensajeFeedback.textContent = 'Guardando anuncio...';
        mensajeFeedback.className = 'bg-blue-100 text-blue-700 p-4 rounded mb-4 block';

        try {
            await crearAnuncio(datosAnuncio);

            mensajeFeedback.textContent = '¡Anuncio creado con éxito! Redirigiendo...';
            mensajeFeedback.className = 'bg-green-100 text-green-700 p-4 rounded mb-4 block';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } catch (error) {
            mensajeFeedback.textContent = error.message;
            mensajeFeedback.className = 'bg-red-100 text-red-700 p-4 rounded mb-4 block';
        }
    });
});