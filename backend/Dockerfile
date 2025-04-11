# 1. Base Image
FROM node:18

# 2. Arbeitsverzeichnis im Container
WORKDIR /app

# 3. Package-Dateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# 4. Den Rest der App kopieren
COPY . .

# 5. Port freigeben (standardmäßig 3000)
EXPOSE 3001

# 6. Startbefehl
CMD ["node", "server.js"]
