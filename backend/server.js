// Importiere Fastify und setze die Fastify-Instanz auf
const Fastify = require('fastify');
const fastify = Fastify({
  logger: true
});

const fs = require('fs');

// Die OpenAPI-Spezifikation aus der JSON-Datei laden
const openApiSpec = require('./REST_API.json'); // Pfad zur rest_api.json





// In-Memory-Datenbank für Demo-Zwecke
let items = [
  { id: 1, name: 'Apples', quantity: 5 },
  { id: 2, name: 'Bread', quantity: 2 },
  { id: 3, name: 'Milk', quantity: 1 }
];

// Hilfsfunktion, um die nächste ID zu ermitteln
const getNextId = () => {
  const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxId + 1;
};

// Route: GET alle Items
fastify.get('/items', async (request, reply) => {
  return items;
});

// Route: GET Item nach ID
fastify.get('/items/:itemId', async (request, reply) => {
  const itemId = parseInt(request.params.itemId);
  const item = items.find(item => item.id === itemId);
  
  if (!item) {
    return reply.status(404).send({ message: 'Item not found' });
  }
  
  return item;
});

// Route: POST neues Item erstellen oder existierendes Item aktualisieren
fastify.post('/items', async (request, reply) => {
  const { name, quantity } = request.body;
  
  // Basisvalidierung
  if (!name || typeof quantity !== 'number') {
    return reply.status(400).send({ message: 'Name is required and quantity must be a number' });
  }
  
  // Überprüfen, ob ein Item mit diesem Namen bereits existiert
  const existingItemIndex = items.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
  
  if (existingItemIndex !== -1) {
    // Aktualisiere die Menge des existierenden Items
    items[existingItemIndex].quantity += quantity;
    return reply.status(200).send(items[existingItemIndex]);
  }
  
  // Neues Item erstellen, wenn der Name noch nicht existiert
  const newItem = {
    id: getNextId(),
    name,
    quantity
  };
  
  items.push(newItem);
  return reply.status(201).send(newItem);
});

// Route: PUT Item aktualisieren
fastify.put('/items/:itemId', async (request, reply) => {
  const itemId = parseInt(request.params.itemId);
  const { name, quantity } = request.body;
  
  // Basisvalidierung
  if (!name || typeof quantity !== 'number') {
    return reply.status(400).send({ message: 'Name is required and quantity must be a number' });
  }
  
  const itemIndex = items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return reply.status(404).send({ message: 'Item not found' });
  }

  // Überprüfen, ob ein Item mit dem neuen Namen existiert (aber nicht das aktuelle Item)
  const existingItemWithSameName = items.find(item => 
    item.name.toLowerCase() === name.toLowerCase() && item.id !== itemId
  );
  
  if (existingItemWithSameName) {
    // Wenn der Name geändert wird, aber bereits existiert, kombinieren wir die Mengen und löschen dieses Item
    existingItemWithSameName.quantity += quantity;
    items.splice(itemIndex, 1);
    return reply.status(200).send(existingItemWithSameName);
  }
  
  // Normale Aktualisierung, wenn keine Namenskonflikte bestehen
  items[itemIndex] = {
    id: itemId,
    name,
    quantity
  };
  
  return reply.status(200).send(items[itemIndex]);
});

// Route: DELETE ein Item
fastify.delete('/items/:itemId', async (request, reply) => {
  const itemId = parseInt(request.params.itemId);
  const itemIndex = items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    return reply.status(404).send({ message: 'Item not found' });
  }
  
  // Item entfernen
  items.splice(itemIndex, 1);
  
  return reply.status(204).send();
});


// Server starten
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    // Gebe ein Objekt mit `host` und `port` an
    await fastify.listen({ port: port, host: '0.0.0.0' }); 
    console.log(`Shopping API server running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

