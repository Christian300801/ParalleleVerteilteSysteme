const Fastify = require('fastify');
const fastify = Fastify({ logger: true });
const mongoose = require('mongoose');
const cors = require('@fastify/cors');

// CORS aktivieren
fastify.register(cors, {
  origin: "http://localhost:3000", // Angepasst an dein Frontend auf Port 3000
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});


// Definiere das Mongoose-Modell für Item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

// MongoDB-Verbindung herstellen
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/distributedSystems';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Fastify-Routen
// Beispiel für eine Route für den Root-Pfad
fastify.get('/', async (request, reply) => {
  return { message: 'Backend ist aktiv!' };
});

// GET: Alle Items
fastify.get('/items', async (request, reply) => {
  try {
    const items = await Item.find();
    return items;
  } catch (err) {
    reply.status(500).send({ message: 'Database error', err });
  }
});

// POST: Neues Item erstellen
fastify.post('/items', async (request, reply) => {
  const { name, quantity } = request.body;
  try {
    const newItem = new Item({ name, quantity });
    await newItem.save();
    return reply.status(201).send(newItem);
  } catch (err) {
    reply.status(500).send({ message: 'Error creating item', err });
  }
});

// PUT: Ein Item aktualisieren
fastify.put('/items/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, quantity }, { new: true });
    if (!updatedItem) {
      return reply.status(404).send({ message: 'Item not found' });
    }
    return updatedItem;
  } catch (err) {
    reply.status(500).send({ message: 'Error updating item', err });
  }
});

// DELETE: Ein Item löschen
fastify.delete('/items/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return reply.status(404).send({ message: 'Item not found' });
    }
    return reply.status(204).send();
  } catch (err) {
    reply.status(500).send({ message: 'Error deleting item', err });
  }
});

// Starte den Fastify-Server
fastify.listen({ port: 80, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
