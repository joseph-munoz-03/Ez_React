# Imagen base con Java 21
FROM eclipse-temurin:21-jdk

# Directorio de trabajo
WORKDIR /app

# Copiar el JAR generado
COPY target/Ez-0.0.1-SNAPSHOT.jar app.jar

# Puerto que usa Render
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java","-jar","app.jar"]