import axios from 'axios';

// Die URL des Fastify-Backends
const API_URL = 'http://localhost:3000/items';

// Alle Artikel holen
export const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Artikel:', error);
  }
};

// Artikel hinzufügen oder aktualisieren
export const createOrUpdateItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Erstellen oder Aktualisieren des Artikels:', error);
  }
};

// Artikel löschen
export const deleteItem = async (itemId) => {
  try {
    await axios.delete(`${API_URL}/${itemId}`);
  } catch (error) {
    console.error('Fehler beim Löschen des Artikels:', error);
  }
};
