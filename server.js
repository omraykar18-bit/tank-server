const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tankData = {
  top: 0,
  bottom: 0,
  motor: false,
  timestamp: Date.now()
};

const API_KEY = "12345";

app.post('/api/update', (req, res) => {

  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(403).send("Unauthorized");
  }

  tankData = {
    ...req.body,
    timestamp: Date.now()
  };

  res.send("OK");
});

app.get('/api/status', (req, res) => {
  res.json(tankData);
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
