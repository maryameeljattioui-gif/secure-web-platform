# Étape 1 : Build de l'application React avec Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

RUN npm install

# Copie du reste du code source du frontend
COPY . .

# Compilation du projet (génère le dossier /app/dist)
RUN npm run build

# Étape 2 : Serveur de production avec Nginx
FROM nginx:alpine

# Copie de la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers statiques compilés depuis l'étape 'builder'
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]