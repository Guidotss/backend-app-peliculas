# Establecemos la imagen base
FROM node:14-alpine

# Creamos el directorio de la aplicación dentro del contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Exponemos el puerto en el que la aplicación va a escuchar
EXPOSE 3000

# Definimos el comando para iniciar la aplicación
CMD ["npm", "start"]