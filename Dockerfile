# Build del CSS y dependencias completas
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración y entorno
COPY package*.json ./
COPY .env .env

# Instalar todas las dependencias necesarias para la compilación (Tailwind, etc.)
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir el CSS con Tailwind
RUN npm run build:css

# Imagen final para producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo package.json y package-lock.json para instalar las dependencias mínimas
COPY package*.json ./

# Instalar solo dependencias necesarias para producción
RUN npm install --omit=dev

# Copiar la aplicación completa desde el builder
COPY --from=builder /app .

# Puerto de la aplicación
EXPOSE 3000

# Iniciar la app
CMD ["node", "app.js"]
