PRUEBA TÉCNICA

Esta aplicación se encuentra diseñada para la gestión de productos, permitiendo crear, leer, actualizar y realizar un borrado lógico.

Tecnologías utilizadas:
- Frontend:
  React.js (vite)
  Tailwind css
  State management con hooks ('useState', 'useEffect')
- Backend:
  Node.js con Express.js
  PostgreSQL como motor de base de datos relacional
  Node-Postgress Persistencia de datos

Infraestructura y herramientas:
- Docker & Docker compose para los contenedores
- Git control de versiones

Caracteristicas principales:
- Borrado lógico: Los productos no se eliminan de la base de datos si no que se inhabilitan y el usuario no los puede ver, garantizando la integridad referencial.
- Normalización de datos: Validación de tipos (booleanos y numéricos) en el frontend y backend.
- Entorno contenerizado: Configuración lista para desplegar en cualquier entorno mediante Docker.

Instalación y ejecución

Para correr el proyecto localmente, se debe tener intalado en la maquina el Docker Desktop (http://www.docker.com/)
1. Clonar el repositorio localmente
  - git clone https://github.com/lindahurtado/catolog-products.git
  - cd TU_REPOSITORIO
2. Levantar los servicios
  - docker-compose up --build
3. Acceder a la aplicación
  - Frontend: http://localhost:5173
  - Backend: http://localhost:3000/products


Autor
- Linda Yire Hurtado Forero - Ingeniera de sistemas

Respuesta: 
¿Qué cambios harías si este servicio tuviera que soportar 1 millón de usuarios diarios?

Respuesta: 
Para realizar un sistema que pueda soportar a 1 millón de usuarios se debe abarcar 3 frentes: infraestructura, base de datos y rendimiento; pasar de una arquitectura monolítica a una distribuida donde en la infraestructura se debe implementar un balanceador de carga para repatir el tráfico entre múltiples instancias del backend, en temas de base de datos se pues optimizar la conexión a la base de datos por medio de un gestor de conexiones, dado que aunque PsotgreSQL es robusta esta puede colapsar el servidos con esa cantidad de usuarios y por último con base al rendimiento se puede implementar el cache de manera que no todas las peticiones toquen el PostgreSQL.
