const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submitForm', async (req, res) => {
  const formData = req.body;

  try {
    const { name, age, selectedBatch } = formData;


    await pool.query('INSERT INTO your_table_name (name, age, selected_batch) VALUES ($1, $2, $3)', [name, age, selectedBatch]);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error during form submission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
