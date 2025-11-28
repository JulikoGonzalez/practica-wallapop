document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-login');
    const mensajeError = document.querySelector('#mensaje-error');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue sola

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        // Limpiar errores previos
        mensajeError.classList.add('hidden');
        mensajeError.textContent = '';

        try {
            // Llamamos a la función de login de api.js
            await login(username, password);

            // Si pasa por aquí, es ÉXITO
            // Redirigimos a la página principal
            window.location.href = 'index.html';

        } catch (error) {
            // Si falla (contraseña mal, usuario no existe), mostramos error
            mensajeError.textContent = error.message;
            mensajeError.classList.remove('hidden');
        }
    });
});