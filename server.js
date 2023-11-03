// const express = require('express');
// const cors = require('cors'); // Import the cors package
// const app = express();
// const path = require('path');
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors());

// // Sample data (in-memory store)
// const items = [
//   { id: 1, name: 'Item 1', image : 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png' },
//   { id: 2, name: 'Item 2' },
//   { id: 3, name: 'Item 3' },
// ];

// // API endpoints
// app.get('/api/items', (req, res) => {
//   res.json(items);
// });

// app.get('/api/items/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const item = items.find((i) => i.id === id);

//   if (!item) {
//     res.status(404).json({ error: 'Item not found' });
//   } else {
//     res.json(item);
//   }
// });

// app.post('/api/items', (req, res) => {
//   const newItem = req.body;
//   newItem.id = items.length + 1;
//   items.push(newItem);
//   res.status(201).json(newItem);
// });

// app.put('/api/items/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const updatedItem = req.body;
//   const index = items.findIndex((i) => i.id === id);

//   if (index === -1) {
//     res.status(404).json({ error: 'Item not found' });
//   } else {
//     items[index] = { id, ...updatedItem };
//     res.json(items[index]);
//   }
// });

// app.delete('/api/items/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = items.findIndex((i) => i.id === id);

//   if (index === -1) {
//     res.status(404).json({ error: 'Item not found' });
//   } else {
//     const deletedItem = items.splice(index, 1)[0];
//     res.json(deletedItem);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// Data fetching via mongo

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/demoitems', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  // Other item properties
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Item = mongoose.model('Item', ItemSchema);

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});