Guía de Instalación y Ejecución del Proyecto 

Este repositorio contiene una aplicación completa con un Backend en Node.js y un Frontend en Flutter, utilizando una base de datos MySQL.

📌 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

Node.js (versión 16 o superior)
Flutter SDK
XAMPP o MySQL Server
Visual Studio Code o Android Studio
🗄️ 1. Configuración de la Base de Datos
Abre tu gestor de base de datos (phpMyAdmin o MySQL).
Crea una base de datos llamada:
api-crud
Importa el archivo api-crud.sql (debe estar en el proyecto).
⚙️ 2. Configuración del Backend (Node.js)

El backend se encuentra en la ruta:

Projects_back/api_basic
Pasos:
Abre una terminal y navega a la carpeta:
cd Projects_back/api_basic
Instala las dependencias:
npm install
Configura el archivo .env con estos datos:
PORT=3000
DB_NAME=api-crud
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
Ejecuta el servidor:
npm run dev

El backend correrá en:
👉 http://localhost:3000

📱 3. Configuración del Frontend (Flutter)

El frontend se encuentra en:

Front_login_ACTIVIDAD2/flutter_application_1
Pasos:
Abre otra terminal y entra a la carpeta:
cd Front_login_ACTIVIDAD2/flutter_application_1
Instala las dependencias:
flutter pub get
⚠️ Configuración importante (API):

Ve al archivo:

lib/services/api_services.dart

Y cambia la URL base si usas celular o emulador:

static const String baseUrl = 'http://192.168.X.X:3000/api_v1';

(No uses localhost en dispositivos físicos)

🔐 Credenciales de Acceso
Usuario: user@email.com
Contraseña: 12345678
🛠️ Solución de Problemas
Error de conexión:
Asegúrate de que el backend esté ejecutándose y que la IP sea correcta.
Error con MySQL:
Verifica que XAMPP esté activo y la base de datos exista.
Error de API:
Revisa que la ruta /api_v1 coincida con la del backend.
👨‍💻 Desarrollado por:

[Camilo Gil]
