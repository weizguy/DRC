const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Parse json request body middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require('./routes/routes')(app, fs);

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});
