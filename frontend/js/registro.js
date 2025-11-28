document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-registro');
    const mensajeFeedback = document.querySelector('#mensaje-feedback');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        // Resetear mensajes
        mensajeFeedback.className = 'hidden';
        mensajeFeedback.textContent = '';

        try {
            // Llamamos a la función registro que ya creamos en api.js
            await registro(username, password);

            // ÉXITO
            mensajeFeedback.textContent = 'Usuario creado correctamente. Redirigiendo al login...';
            mensajeFeedback.className = 'bg-green-100 text-green-700 border border-green-400 px-4 py-3 rounded mb-4 block';

            // Esperamos un momento y mandamos al usuario a loguearse
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);

        } catch (error) {
            // ERROR (Ej: el usuario ya existe)
            mensajeFeedback.textContent = error.message || 'Error al registrar el usuario';
            mensajeFeedback.className = 'bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded mb-4 block';
        }
    });
})