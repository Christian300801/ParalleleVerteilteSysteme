# 1. Base Image - Verwenden des offiziellen Node.js-Images für den Build-Prozess
FROM node:18 AS build

# 2. Arbeitsverzeichnis im Container
WORKDIR /app

# 3. Kopiere package.json und package-lock.json und installiere Abhängigkeiten
COPY package*.json ./
RUN npm install

# 4. Kopiere den gesamten Code ins Arbeitsverzeichnis
COPY . .

# 5. Baue die React-App für die Produktion
RUN npm run build

# 6. Serve die App mit einem statischen Webserver (z. B. serve)
FROM nginx:alpine

# 7. Kopiere die gebauten Dateien vom Build-Container in das Nginx-Verzeichnis
COPY --from=build /app/build /usr/share/nginx/html

# 8. Setze den Nginx-Port auf 80
EXPOSE 80

# 9. Startbefehl für Nginx
CMD ["nginx", "-g", "daemon off;"]
