// pages/api/submitForm.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
  
      try {
        // Assuming you have a deployed backend URL
        const response = await fetch('https://your-backend-url.com/submitForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          res.status(200).json(responseData);
        } else {
          res.status(response.status).end();
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.status(405).end('Method Not Allowed');
    }
  }
  