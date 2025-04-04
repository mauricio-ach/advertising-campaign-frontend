# Landing page para la administración de campañas publicitarias

## Requisitos
- npm

## Instalación
1. Clonar el repositorio utilizando git.
2. Asegurarse que la rama main esté actualizada con el repositorio.
3. Instalar dependencias con 
    ```
    npm i
    ```
4. Crear un archivo **.env** que contenga el siguiente valor, es importante que coincida con el host y puerto donde el API se encuentra escuchando, además que al utilizar VITE debe contener el prefijo forzosamente.
    ```
    VITE_BACKEND_URL={host/port} // Ejemplo http://localhost:3000
    ```
6. Ejecutar con:
    ```
    npm run dev
    ```