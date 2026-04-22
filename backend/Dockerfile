
# 1. On part d'une image Node.js légère (Alpine)
FROM node:20-alpine

# 2. On définit le dossier de travail dans le conteneur
WORKDIR /app

# 3. On copie d'abord les fichiers de dépendances pour optimiser le cache
COPY package*.json ./

# 4. On installe les dépendances (y compris cors et pg)
RUN npm cache clean --force && npm install

# 5. On copie tout le reste de ton code source
COPY . .

# 6. On expose le port sur lequel ton serveur écoute
EXPOSE 5000

# 7. La commande pour lancer ton application
CMD ["node", "index.js"]