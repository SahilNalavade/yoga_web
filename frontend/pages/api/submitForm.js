const backendUrl = 'https://yoga-web-orcin.vercel.app/submitForm';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        res.status(200).json(responseData);
      } else {
        console.error('Failed to submit form:', response.status, responseData);
        res.status(response.status).json({ error: 'Failed to submit form' });
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
