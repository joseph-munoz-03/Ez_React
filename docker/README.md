================================================================================
                    DOCKER SETUP - EZ REACT PROJECT
================================================================================

Carpeta centralizada con toda la configuración Docker y Hosting.

================================================================================
1. CONTENIDO DE LA CARPETA
================================================================================

docker/
├── ✅ docker-compose.yml         → Orquestación de servicios
├── ✅ Dockerfile.backend         → Build Backend Spring Boot
├── ✅ Dockerfile.frontend        → Build Frontend React + Nginx
├── ✅ nginx.conf                 → Configuración Nginx (reverse proxy)
├── ✅ .env.example               → Variables de entorno (template)
├── ✅ .dockerignore              → Archivos a excluir del build
├── ✅ README.md                  → Este archivo
└── (scripts personalizados opcionales)

================================================================================
2. INSTRUCCIONES DE USO LOCAL
================================================================================

A. Primera vez - Setup inicial
──────────────────────────────

1. Compilar Backend (generar JAR)
   cd Ez_back
   mvn clean package -DskipTests
   cd ../docker

2. Crear archivo .env
   cp .env.example .env
   
   Editar valores importantes:
   - JWT_SECRET → cambiar con valor seguro
   - MAIL_USERNAME/PASSWORD → configure Gmail
   - MERCADOPAGO_ACCESS_TOKEN → token real
   - MYSQL_ROOT_PASSWORD → contraseña fuerte

3. Iniciar servicios
   docker-compose up -d

   Esperar ~40s para que todo esté listo

B. Verificar que todo esté corriendo
───────────────────────────────────

   docker-compose ps

   Esperado:
   - ez-mysql        ✓ healthy
   - ez-backend      ✓ healthy  
   - ez-frontend     ✓ healthy

C. Acceder a la aplicación
──────────────────────────

   Frontend:   http://localhost:3000
   Backend:    http://localhost:8080
   API:        http://localhost:8080/api
   Health:     http://localhost:8080/actuator/health

D. Ver logs en tiempo real
──────────────────────────

   Todo:         docker-compose logs -f
   Backend:      docker-compose logs -f ez-backend
   Frontend:     docker-compose logs -f ez-frontend
   MySQL:        docker-compose logs -f mysql

E. Detener servicios
───────────────────

   Parar sin borrar datos:
   docker-compose down

   Parar y borrar TODO (incluyendo base de datos):
   docker-compose down -v

================================================================================
3. ACTUALIZAR Y RECONSTRUIR
================================================================================

Cambios en Backend (código Java)
─────────────────────────────────

1. Editar código en Ez_back/src/...
2. Compilar:
   cd Ez_back && mvn clean package -DskipTests && cd ../docker
3. Reconstruir imagen:
   docker-compose build --no-cache ez-backend
4. Reiniciar:
   docker-compose up -d ez-backend

Cambios en Frontend (código React)
──────────────────────────────────

1. Editar código en Ez_front/src/...
2. Reconstruir imagen:
   docker-compose build --no-cache ez-frontend
3. Reiniciar:
   docker-compose up -d ez-frontend

Cambios en Nginx (configuración)
────────────────────────────────

1. Editar nginx.conf
2. Reconstruir imagen:
   docker-compose build --no-cache ez-frontend
3. Reiniciar:
   docker-compose up -d ez-frontend

================================================================================
4. TROUBLESHOOTING
================================================================================

❌ Error: "Cannot connect MySQL"
────────────────────────────────

Verificar:
  docker-compose logs mysql
  
Solución:
  1. Esperar 10-15 segundos (healthcheck)
  2. Verificar Puerto 3306 no esté ocupado
  3. Resetear: docker-compose down -v && docker-compose up -d

❌ Error: "Backend connection refused"
──────────────────────────────────────

Solucionar:
  1. Verificar compilación:
     cd Ez_back && mvn clean compile
  2. Ver logs:
     docker-compose logs ez-backend
  3. Recrear:
     docker-compose build --no-cache && docker-compose up -d

❌ Error: "Frontend no carga"
─────────────────────────────

Verificar:
  docker-compose logs ez-frontend
  
Soluciones:
  1. Verificar .env REACT_APP_API_URL correcta
  2. Verificar nginx.conf tiene configuración proxy
  3. Limpiar caché: docker-compose build --no-cache ez-frontend

❌ Error: "Puerto ya en uso"
───────────────────────────

Si puerto 8080/3000/3306 está ocupado:
  
  Opción 1: Liberar puerto
    # Windows
    netstat -ano | findstr :8080
    taskkill /PID <PID> /F
  
  Opción 2: Cambiar en docker-compose.yml
    ports:
      - "8081:8080"  # usar 8081 en lugar de 8080

================================================================================
5. PUSH A DOCKERHUB (Opcional)
================================================================================

Login
  docker login
  (ingresa usuario/contraseña de Docker Hub)

Tag
  docker tag ez-backend:latest tu-usuario/ez-backend:1.0
  docker tag ez-frontend:latest tu-usuario/ez-frontend:1.0

Push
  docker push tu-usuario/ez-backend:1.0
  docker push tu-usuario/ez-frontend:1.0

Otros pueden descargar:
  docker pull tu-usuario/ez-backend:1.0
  docker pull tu-usuario/ez-frontend:1.0

================================================================================
6. DEPLOYING A PRODUCCIÓN (Render.com)
================================================================================

A. Preparación
───────────────

1. Push a GitHub
   git add . && git commit -m "Docker setup" && git push

2. Variables de entorno en Render
   (Settings > Environment)
   
   JWT_SECRET=valor-seguro
   MERCADOPAGO_ACCESS_TOKEN=token-real
   MAIL_USERNAME=email@gmail.com
   MAIL_PASSWORD=contraseña-app
   REACT_APP_API_URL=https://tu-api.render.com

B. Backend en Render
─────────────────────

1. Nuevo Web Service
2. Conectar GitHub repo
3. Build Command: mvn clean package -DskipTests
4. Start Command: java -jar target/Ez-0.0.1-SNAPSHOT.jar
5. Usar variables .env de Render

C. Frontend en Render
──────────────────────

1. Nuevo Static Site
2. Conectar GitHub repo
3. Build Command: npm run build
4. Publish Directory: build
5. Environment: REACT_APP_API_URL=https://tu-api.render.com

================================================================================
7. LIMPIEZA Y MANTENIMIENTO
================================================================================

Limpiar contenedores
   docker-compose down -v

Limpiar imágenes no usadas
   docker image prune -f

Limpiar todo (CUIDADO!)
   docker system prune -af

Backup DE la Base DE Datos
   docker exec ez-mysql mysqldump -u root -proot_password ez_dtabse > backup.sql

Restaurar Base DE Datos
   docker exec -i ez-mysql mysql -u root -proot_password ez_dtabse < backup.sql

================================================================================
8. CHECKLIST ANTES DE PRODUCCIÓN
================================================================================

[ ] Backend se compila sin errores
[ ] Frontend buildea sin warnings
[ ] .env creado con valores reales
[ ] JWT_SECRET cambiado (valor seguro)
[ ] Email configurado (SMTP)
[ ] Mercado Pago token real
[ ] Base DE datos inicializada
[ ] Todos los servicios health
[ ] Archivos estáticos cargan
[ ] API responde sin CORS errors
[ ] WebSocket funciona
[ ] Proxy nginx funciona
[ ] Logs se generan correctamente

================================================================================
