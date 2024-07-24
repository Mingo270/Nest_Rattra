# Utilisez une image de base pour Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier tout le contenu du projet dans le répertoire de travail
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Exposer le port que l'application utilise
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
