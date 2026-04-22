# On utilise uniquement Nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# On copie le dossier 'dist' de ton PC vers le conteneur
COPY dist /usr/share/nginx/html

# On expose le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]