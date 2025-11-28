const API_URL = 'http://127.0.0.1:8000';

// --- GESTIÓN DE ANUNCIOS ---

// 1. Obtener todos los anuncios
async function obtenerAnuncios() {
    try {
        const response = await fetch(`${API_URL}/api/anuncios`);
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 2. Obtener UN anuncio por ID
async function obtenerAnuncio(id) {
    try {
        const response = await fetch(`${API_URL}/api/anuncios/${id}`);
        if (!response.ok) throw new Error('Anuncio no encontrado');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 3. Crear un anuncio 
async function crearAnuncio(datosAnuncio) {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Debes estar logueado para crear un anuncio');
    }

    try {
        const response = await fetch(`${API_URL}/api/anuncios`, {
            method: 'POST', // Método para guardar
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviamos el pase VIP
            },
            body: JSON.stringify(datosAnuncio)
        });

        if (!response.ok) {
            throw new Error('Error al guardar el anuncio');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// 4. Borrar un anuncio
async function borrarAnuncio(id) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No estás autenticado');

    try {
        const response = await fetch(`${API_URL}/api/anuncios/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al borrar (¿Eres el dueño?)');
        }
        return true;
    } catch (error) {
        throw error;
    }
}

// --- AUTENTICACIÓN (LOGIN / REGISTRO) ---

async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        return data;
    } catch (error) {
        throw error;
    }
}

async function registro(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }
        return true;
    } catch (error) {
        throw error;
    }
}

// Función auxiliar para saber si estamos logueados
function estaLogueado() {
    return localStorage.getItem('token') !== null;
}