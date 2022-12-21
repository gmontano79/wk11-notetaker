// DEPENDENCIES

const express = require('express');
const path = require('path');
const fs = require('fs');
var data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

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
app.get("/api/notes", function (req, res) {

  res.json(data);

});

app.get("/api/notes/:id", function (req, res) {

  res.json(data[Number(req.params.id)]);

});


app.post("/api/notes", function (req, res) {

  let newNote = req.body;
  let uniqueId = (data.length).toString();
  console.log(uniqueId);
  newNote.id = uniqueId;
  data.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(data), function (err) {
    if (err) throw (err);
  });

  res.json(data);

});

// DELETE REQUEST
app.delete("/api/notes/:id", function (req, res) {

  let noteId = req.params.id;
  let newId = 0;
  console.log(`Deleting note with id ${noteId}`);
  data = data.filter(currentNote => {
    return currentNote.id != noteId;
  });
  for (currentNote of data) {
    currentNote.id = newId.toString();
    newId++;
  }
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(data));
  res.json(data);
});


// LISTENING SERVER
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);

})








