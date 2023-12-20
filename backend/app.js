const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();

const db = pgp({
  user: 'postgres',
  password: 'Admin0272',
  host: 'database-3.cb86aoug6oz9.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'demo',
  ssl: {
    rejectUnauthorized: false, // Bypass self-signed certificate validation
  },
});

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow requests from your frontend domain
const corsOptions = {
  origin: 'https://yoga-web-wnri.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/submitForm', async (req, res) => {
  const formData = req.body;

  try {
    // Assuming the payment was successful
    // You can update the payment status here if needed

    await db.none(
      'INSERT INTO yoga_registration(name, age, selected_batch, mobile, payment_status, edit_batch) VALUES($1, $2, $3, $4, $5, $6)',
      [
        formData.name,
        formData.age,
        formData.selectedBatch,
        formData.mobile,
        formData.payment_status,
        formData.edit_batch,
      ]
    );

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error inserting into the database:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
