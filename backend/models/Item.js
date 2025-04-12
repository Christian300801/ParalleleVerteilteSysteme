const fs = require('fs');
const mongoose = require('mongoose');
const Item = require('./models/Item');  

const apiData = JSON.parse(fs.readFileSync('REST_API.json', 'utf-8'));  

const items = [];

if (apiData.paths && apiData.paths['/items'] && apiData.paths['/items'].post && apiData.paths['/items'].post.requestBody && apiData.paths['/items'].post.requestBody.content['application/json'].schema) {
  const itemData = apiData.paths['/items'].post.requestBody.content['application/json'].schema.properties;

  if (itemData.name && itemData.quantity) {
    items.push({
      name: itemData.name.example,  
      quantity: itemData.quantity.example  
    });
  }
}

console.log('Extrahierte Artikel:', items);

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
