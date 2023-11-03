import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch('http://localhost:3000/api/items') // Update the URL to your API endpoint
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Items from API</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            {item.image && ( // Conditionally render the image if item.image exists
              <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;