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
5. los querys para poder crear las tablas de users y requests son los siguentes:

DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
	UID SERIAL PRIMARY KEY,
	EMAIL VARCHAR(50) NOT NULL UNIQUE,
	PASSWORD VARCHAR(60) NOT NULL,
	USERNAME VARCHAR(50) NOT NULL
);
ALTER TABLE users ADD COLUMN role VARCHAR(10) DEFAULT 'USER';
ALTER TABLE users ADD CONSTRAINT  role_check CHECK (role IN ('USER', 'ADMIN'));

--crea un usuario nuevo y cambiale el role de USER a ADMIN con el siguiente comando 
UPDATE users
SET role = 'ADMIN'
WHERE email = 'CuentaAdmin@docutrack.com';

SELECT * FROM USERS;

DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(uid) ON DELETE CASCADE,
	full_name VARCHAR(100) NOT NULL,
	document_type VARCHAR(50) NOT NULL,
	file_url TEXT NOT NULL,
	status VARCHAR(30) DEFAULT 'Recibido',
	created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Panama')	
)

  ALTER TABLE request
	ADD COLUMN birth_date DATE,
	ADD COLUMN gender VARCHAR(20);
	ALTER TABLE requests ADD COLUMN reason TEXT;
	ALTER TABLE request ADD COLUMN certificate_url TEXT;
  ALTER TABLE requests ADD COLUMN document_type TEXT;

SELECT * FROM requests;
6. Inicia el backend: `npm run dev`  
7. Inicia el frontend: `npm run dev`  
8. ¡Listo! Ya funcionaria correctamente el proyecto de DocuTrack.
