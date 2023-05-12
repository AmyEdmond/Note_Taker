const path = require('path');
const app = require('express').Router();


// GET Route for note page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);
module.exports = app;