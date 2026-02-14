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

const API_KEY = "12345678";

app.post('/api/update', (req, res) => {

  console.log("----- NEW REQUEST -----");
  console.log("Incoming Headers:", req.headers);
  console.log("Received Key:", req.headers['x-api-key']);
  console.log("Expected Key:", API_KEY);
  console.log("Body:", req.body);

  if (!req.headers['x-api-key']) {
    console.log("No API key header received");
    return res.status(403).send("No API key header received");
  }

  if (req.headers['x-api-key'] !== API_KEY) {
    console.log("Wrong API key");
    return res.status(403).send("Wrong API key");
  }

  tankData = {
    ...req.body,
    timestamp: Date.now()
  };

  console.log("Data Updated Successfully");

  res.send("OK");
});

app.get('/api/status', (req, res) => {
  res.json(tankData);
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
