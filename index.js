const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable all CORS requests
app.use(cors());

// Root endpoint: expects a "url" query parameter
app.get('/get', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send({ error: 'URL is required as a query parameter.' });
  }
  
  try {
    // Fetch the requested resource with responseType 'arraybuffer' for binary data.
    const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
    
    // Set content-type based on the fetched resource.
    res.set('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching URL:', error.message);
    res.status(500).send({ error: 'Error fetching URL.' });
  }
});

app.listen(PORT, () => {
  console.log(`CORS proxy server is running on port ${PORT}`);
});
