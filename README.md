# Wallapop Clone - Práctica Frontend

Este proyecto es una aplicación web SPA (Single Page Application) que simula las funcionalidades básicas de Wallapop. Desarrollado con HTML, JavaScript (Vanilla) y Tailwind CSS.

## 📋 Requisitos implementados

El proyecto cumple con los siguientes requisitos funcionales:

* **Listado de anuncios:** Visualización de productos con imagen, nombre, precio y tipo (compra/venta).
* **Detalle de anuncio:** Vista ampliada de la información del producto.
* **Filtrado:** Diferenciación visual entre anuncios de "Compra" y "Venta".
* **Autenticación:**
    * Login de usuarios (token JWT).
    * Registro de nuevos usuarios.
    * Gestión de sesión (persistencia del token).
* **Gestión de anuncios:**
    * Creación de anuncios (solo usuarios logueados).
    * Eliminado de anuncios (solo el propietario del anuncio).
* **Feedback al usuario:** Gestión de estados de carga, éxito y error.

## 🛠️ Tecnologías utilizadas

* **Frontend:** HTML5, CSS3 (Tailwind CSS via CDN), JavaScript (ES6+).
* **Backend:** `sparrest.js` (basado en json-server) para simular el API REST.

## 🚀 Cómo arrancar el proyecto

Para probar la aplicación en tu entorno local, sigue estos pasos:

### 1. Configurar el Backend (Servidor)

El backend se encuentra en la carpeta `backend`. Necesitas tener [Node.js](https://nodejs.org/) instalado.

```bash
cd backend
npm install
npm start

PRACTICA DESARROLLADA POR JULIO JOSE VARAS GONZALEZ
