const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Nur-e-Hidayah API Running' });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
