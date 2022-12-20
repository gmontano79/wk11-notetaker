// DEPENDENCIES

const express = require('express');
const path = require('path');
const fs = require('fs');
const utils = require("expressjs-utils");

// SERVER

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MIDDLEWARE
app.use(express.static("./Develop/public"));


// HTML ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// GET REQUEST
app.get('/api/notes', (req, res) => {
  readFileAsync('./Develop/db/db.json', 'utf8')
    .then((data) => {
      notes = [].contact(JSON.parse(data))
      res.json(notes);
    })
});

// POST REQUEST
app.post('/api/notes', (req, res) => {
  const note = req.body;
  readFileAsync('./Develop/db/db.json', 'utf8')
    .then((data) => {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1
      notes.push(note);
      return notes
    }).then((notes) => {
      writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
      res.json(note);
    })
});

// DELETE REQUEST
app.delete('/api/notes/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  readFileAsync('./Develop/db/db.json')
    .then((data) => {
      const notes = [].concat(JSON.parse(data));
      const newNotesData = []
      for (var i = 0; i < notes.length; i++) {
        if (idToDelete !== notes[i].id) {
          newNotesData.push(noes[i])
        }
      }
      return newNotesData
    }).then((notes) => {
      writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
      res.send('Saved Sucessfully!');
    })
})







// LISTENING SERVER
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);

})








