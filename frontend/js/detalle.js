document.addEventListener('DOMContentLoaded', async () => {
    // 1. Obtener ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const anuncioId = parametrosURL.get('id');

    const contenedorDetalle = document.querySelector('#detalle-anuncio');
    const mensajeFeedback = document.querySelector('#mensaje-feedback');

    function mostrarMensaje(texto) {
        mensajeFeedback.textContent = texto;
        mensajeFeedback.classList.remove('hidden');
        contenedorDetalle.classList.add('hidden');
    }

    if (!anuncioId) {
        mostrarMensaje('No se ha especificado ningún anuncio.');
        return;
    }

    mostrarMensaje('Cargando información del anuncio...');

    try {
        const anuncio = await obtenerAnuncio(anuncioId);

        // Ocultar mensaje de carga y mostrar tarjeta
        mensajeFeedback.classList.add('hidden');
        contenedorDetalle.classList.remove('hidden');

        // Renderizar
        renderizarDetalle(anuncio);

    } catch (error) {
        mostrarMensaje('Error al cargar el anuncio.');
    }

    function renderizarDetalle(anuncio) {
        const imagenSrc = anuncio.foto ? anuncio.foto : 'https://via.placeholder.com/600x400?text=Sin+Foto';

        const etiquetaTipo = anuncio.tipo === 'venta'
            ? '<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full uppercase font-bold text-sm">Se Vende</span>'
            : '<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full uppercase font-bold text-sm">Se Compra</span>';

        // --- LÓGICA DEL BOTÓN BORRAR ---
        // Si estamos logueados, mostramos el botón.
        let botonBorrarHTML = '';

        if (estaLogueado()) {
            botonBorrarHTML = `
                <button id="btn-borrar" class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition flex items-center gap-2 font-bold shadow-md">
                    🗑️ Borrar Anuncio
                </button>
             `;
        }
        // -------------------------------

        contenedorDetalle.innerHTML = `
            <div class="md:flex">
                <div class="md:w-1/2">
                    <img src="${imagenSrc}" alt="${anuncio.nombre}" class="w-full h-96 object-cover bg-gray-200 rounded-lg">
                </div>
                <div class="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <div class="flex justify-between items-start mb-4">
                        ${etiquetaTipo}
                        <span class="text-3xl font-bold text-teal-600">${anuncio.precio} €</span>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">${anuncio.nombre}</h2>
                    <p class="text-gray-700 text-lg leading-relaxed mb-6">${anuncio.descripcion}</p>
                    
                    <div class="border-t pt-4 text-gray-500 text-sm mb-8">
                        <p>Anuncio ID: ${anuncio.id}</p>
                    </div>
                    
                    <div class="flex gap-4 items-center flex-wrap">
                        <button onclick="window.location.href='index.html'" class="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition">
                            Volver
                        </button>
                        
                        ${botonBorrarHTML}
                    </div>
                </div>
            </div>
        `;

        // Damos funcionalidad al botón (si existe)
        const btnBorrar = document.getElementById('btn-borrar');
        if (btnBorrar) {
            btnBorrar.addEventListener('click', async () => {
                // Confirmación obligatoria según requisitos
                const confirmar = confirm('¿Seguro que quieres borrar este anuncio? Esta acción no se puede deshacer.');

                if (confirmar) {
                    try {
                        await borrarAnuncio(anuncio.id);
                        alert('Anuncio borrado correctamente.');
                        window.location.href = 'index.html'; // Vuelta al listado
                    } catch (error) {
                        alert('Hubo un error al borrar. (Nota: Solo puedes borrar tus propios anuncios).');
                    }
                }
            });
        }
    }
});