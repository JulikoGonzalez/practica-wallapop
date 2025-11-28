// Esperar a que el HTML cargue
document.addEventListener('DOMContentLoaded', async () => {
    const listaAnuncios = document.querySelector('#lista-anuncios');
    const mensajeFeedback = document.querySelector('#mensaje-feedback');

    // --- NUEVA PARTE: GESTIÓN DE SESIÓN (LOGIN/LOGOUT) ---
    // Buscamos la caja del menú por el ID que acabamos de poner en el HTML
    const menuUsuario = document.getElementById('menu-usuario');

    // Usamos la función de api.js para saber si hay token
    if (estaLogueado() && menuUsuario) {
        // Si estamos dentro, cambiamos el HTML del menú
        menuUsuario.innerHTML = `
            <span class="mr-4 font-semibold hidden sm:inline">¡Hola!</span>
            <a href="crear-anuncio.html" class="bg-yellow-400 text-teal-900 px-3 py-1 rounded font-bold hover:bg-yellow-300 transition mr-4">
                + Crear Anuncio
            </a>
            <button id="btn-logout" class="underline hover:text-gray-200 cursor-pointer">
                Cerrar Sesión
            </button>
        `;

        // Damos vida al botón de cerrar sesión
        document.getElementById('btn-logout').addEventListener('click', () => {
            localStorage.removeItem('token'); // Borramos el token
            window.location.reload(); // Recargamos la página para volver al estado normal
        });
    }
    // -----------------------------------------------------

    // Función auxiliar para mostrar mensajes (carga, error, vacío)
    function mostrarMensaje(texto) {
        mensajeFeedback.textContent = texto;
        mensajeFeedback.classList.remove('hidden');
        listaAnuncios.innerHTML = ''; // Limpiar lista
    }

    function ocultarMensaje() {
        mensajeFeedback.classList.add('hidden');
    }

    // Estado: CARGA
    mostrarMensaje('Cargando anuncios...');

    try {
        // Llamamos a la función que creamos en api.js
        const anuncios = await obtenerAnuncios();

        // CHIVATO: Para ver en la consola si llegan los anuncios (incluido el nuevo)
        console.log('Anuncios cargados:', anuncios);

        ocultarMensaje();

        // Estado: VACÍO (Si no hay anuncios)
        if (anuncios.length === 0) {
            mostrarMensaje('No hay anuncios disponibles en este momento.');
            return;
        }

        // Estado: ÉXITO (Pintamos los anuncios)
        anuncios.forEach(anuncio => {
            // Creamos el HTML de cada tarjeta
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer';

            // Si no tiene foto, ponemos una por defecto
            const imagenSrc = anuncio.foto ? anuncio.foto : 'https://via.placeholder.com/300x200?text=Sin+Foto';

            // Etiqueta de Compra o Venta
            const etiquetaTipo = anuncio.tipo === 'venta'
                ? '<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-bold">Se Vende</span>'
                : '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-bold">Se Compra</span>';

            card.innerHTML = `
                <img src="${imagenSrc}" alt="${anuncio.nombre}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-lg font-bold text-gray-900 truncate">${anuncio.nombre}</h3>
                        ${etiquetaTipo}
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${anuncio.descripcion}</p>
                    <div class="text-xl font-bold text-teal-600">${anuncio.precio} €</div>
                </div>
            `;

            // Añadimos el evento para ir al detalle
            card.addEventListener('click', () => {
                window.location.href = `detalle.html?id=${anuncio.id}`;
            });

            listaAnuncios.appendChild(card);
        });

    } catch (error) {
        // Estado: ERROR
        console.error(error);
        mostrarMensaje('Hubo un error al cargar los anuncios. Por favor, revisa que el servidor esté encendido.');
    }
});