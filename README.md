# DocuTrack - Sistema de Solicitudes de Certificados

DocuTrack es una aplicación Full Stack que permite a los usuarios registrarse, enviar solicitudes de certificados adjuntando archivos, y a los administradores gestionar esas solicitudes con control de estados y carga de certificados emitidos en PDF.

# Tecnologías utilizadas

- Frontend: React + Vite + TailwindCSS  
- Backend: Node.js + Express  
- Base de datos: PostgreSQL  
- Autenticación: JWT  
- Subida de archivos: Multer  
- Control de acceso: Roles (USER, ADMIN)

# Flujo del sistema

# Usuario
- Se registra o inicia sesión.
- Desde su perfil puede:
  - Enviar una nueva solicitud de certificado (formulario con datos + archivo adjunto).
  - Ver el estado actual de sus solicitudes: `Recibido` o `Emitido`.
  - Permite descargar el certificado (PDF) cuando el estado de la solicitud esta en `Emitido`.

# Administrador
- Accede al panel de administración.
- Visualiza todas las solicitudes del sistema.
- Puede:
  - Ver detalles completos de cada solicitud.
  - Cambiar el estado a `Aprobado`, `Rechazado` o `Pedir Corrección`.
  - Cargar un archivo PDF del certificado solo cuando el estado es `Aprobado`.

# Roles y Seguridad

- Las rutas están protegidas por `verifyToken` y `isAdmin`.
- Solo usuarios autenticados acceden a su perfil o pueden hacer solicitudes.
- Solo administradores pueden acceder al panel y cambiar estados o subir certificados.

# Cómo correr el proyecto localmente

1. Clona el repositorio de github
2. Instala dependencias en `/frontend` y `/backend`  
3. Configura las variables `.env` (incluyendo `JWT_SECRET` y conexión a PostgreSQL) 
4. crear las tablas users y requests en tu base de datos local de progestsql
5. Inicia el backend: `npm run dev`  
6. Inicia el frontend: `npm run dev`  
7. ¡Listo! Ya funcionaria correctamente el proyecto de DocuTrack.
