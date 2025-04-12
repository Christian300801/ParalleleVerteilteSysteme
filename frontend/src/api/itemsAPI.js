import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/items';

export const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

    return response.data;
  } catch (error) {
    console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    console.error('Fehler beim Abrufen der Artikel:', error);
  }
};

export const createOrUpdateItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Erstellen oder Aktualisieren des Artikels:', error);
  }
};

export const deleteItem = async (itemId) => {
  try {
    await axios.delete(`${API_URL}/${itemId}`);
  } catch (error) {
    console.error('Fehler beim Löschen des Artikels:', error);
  }
};
