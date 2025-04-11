const fs = require('fs');
const mongoose = require('mongoose');
const Item = require('./models/Item');  // Dein Item-Modell

const apiData = JSON.parse(fs.readFileSync('openapi.json', 'utf-8'));  // Lade die OpenAPI-Datei

const items = [];

// Extrahiere Artikel-Informationen
if (apiData.paths && apiData.paths['/items'] && apiData.paths['/items'].post && apiData.paths['/items'].post.requestBody && apiData.paths['/items'].post.requestBody.content['application/json'].schema) {
  const itemData = apiData.paths['/items'].post.requestBody.content['application/json'].schema.properties;

  if (itemData.name && itemData.quantity) {
    items.push({
      name: itemData.name.example,  // Beispielname: "Bananas"
      quantity: itemData.quantity.example  // Beispielmenge: 5
    });
  }
}

console.log('Extrahierte Artikel:', items);

// Füge die Artikel in die MongoDB-Datenbank ein
mongoose.connect('mongodb://mongo:27017/mydatabase')
  .then(async () => {
    try {
      await Item.insertMany(items);
      console.log('✅ Artikel wurden erfolgreich in die Datenbank eingefügt');
    } catch (err) {
      console.error('Fehler beim Einfügen der Artikel:', err);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => console.log('MongoDB-Verbindungsfehler:', err));
