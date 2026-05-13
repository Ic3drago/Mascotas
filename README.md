# Pet Manager - Albergue de Mascotas 🐾

Un sistema moderno para gestionar registros de animales en un albergue. Creado con **React, TypeScript, Vite y Tailwind CSS**, utilizando principios de arquitectura limpia (MVC y Factory Pattern).

## ✨ Características

*   **Página de Inicio (Landing Page):** Interfaz amigable con fondo animado para dar la bienvenida a los usuarios.
*   **Gestión Visual de Animales:** Tarjetas dinámicas que muestran la foto de la mascota.
*   **Campos Dinámicos:** El formulario de registro se adapta automáticamente al tipo de animal:
    *   🐶 **Perros:** Registro de raza.
    *   🐱 **Gatos:** Color de pelaje.
    *   🦜 **Aves/Loros:** Si tienen la habilidad de hablar/cantar.
*   **URLs de Imágenes:** Integración para añadir fotos reales desde la web.
*   **Notificaciones In-App:** Sistema de *Toasts* flotantes personalizados (sin alertas invasivas del navegador).
*   **Arquitectura MVC y Factory:** Separación clara entre Modelos (Clases), Vistas (Componentes de React) y Controladores (Custom Hooks).

## 🚀 Tecnologías Utilizadas

*   **Frontend:** React 18
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS
*   **Iconos:** Lucide React
*   **Build Tool:** Vite

## 📦 Instalación y Ejecución

1.  Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2.  Clona el repositorio o navega a la carpeta del proyecto.
3.  Instala las dependencias:

    ```bash
    npm install
    ```

4.  Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

5.  Abre tu navegador en `http://localhost:5173`.

## 🗄️ Base de Datos (Supabase / PostgreSQL)

Este proyecto cuenta con una capa de servicio simulada (`animalService.ts`) que guarda los datos temporalmente en el `localStorage`.

Si deseas llevar el proyecto al siguiente nivel e integrarlo con una base de datos real (como **Supabase**), encontrarás en la raíz del proyecto un archivo llamado `supabase_schema.sql`.

Este archivo contiene:
*   Las instrucciones para crear la tabla de mascotas compatible con PostgreSQL.
*   Datos de prueba (Mocks) con imágenes de Unsplash, listos para ser copiados y pegados en el Editor SQL de tu proyecto en Supabase.
