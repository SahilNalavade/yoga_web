const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();

const db = pgp({
  user: 'postgres',
  password: 'Admin0272', 
  host: 'localhost', 
  port: 5432, 
  database: 'initial_db',
});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/submitForm', async (req, res) => {
  const formData = req.body;

  try {
    await db.none('INSERT INTO yoga_registration(name, age, selected_batch, mobile,pa) VALUES($1, $2, $3, $4)', [
      formData.name,
      formData.age,
      formData.selectedBatch,
      formData.mobile,
    ]);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error inserting into the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
