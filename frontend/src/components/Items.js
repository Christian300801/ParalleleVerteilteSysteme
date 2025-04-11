import React, { useState, useEffect } from 'react';
import { getItems, createOrUpdateItem, deleteItem } from '../api/itemsAPI';

const Items = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error('Erhaltene Daten sind kein Array:', data);
        setItems([]); // Leeres Array setzen, falls die Antwort kein Array ist
      }
    };
  
    fetchItems();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = await createOrUpdateItem(newItem);
    setItems([...items, updatedItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleDelete = async (itemId) => {
    await deleteItem(itemId);
    setItems(items.filter(item => item._id !== itemId));
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
