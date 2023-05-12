const path = require("path");
const fs = require("fs");
const app = require("express").Router();
const uniqid = require("uniqid");

// GET request for notes
app.get("/api/notes", (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);

  // fs.readFile(`./db/db.json`, (err, data) => {
  //   if (err) {
  //     res.status(404).send("Oops!");
  //   } else {
  //     const existingNotes = JSON.parse(data);
  //     res.json(existingNotes);
  //   }
  // });
  res.sendFile(path.join(__dirname, "db/db.json"));
});

// POST request to add a note
app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uniqid(),
    };

    // Convert the data to a string so we can save it
    //const noteString = JSON.stringify(newNote);
    fs.readFile(`./db/db.json`, (err, data) => {
      if (err) {
        res.status(404).send("Oops!");
      } else {
        const existingNotes = JSON.parse(data);
        existingNotes.push(newNote);

        fs.writeFile(`./db/db.json`, JSON.stringify(existingNotes), (err) =>
          err
            ? console.error(err)
            : console.log(
                `Review for ${newNote.title} has been written to JSON file`
              )
        );
      }
    });

    // Write the string to a file

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting Note");
  }
});

app.delete("/api/notes:id", (req, res) => {
    // read notes from db.json
    const readNotes = JSON.parse(fs.readFile('db/db.json'))
    // removing note with id
    const deleteNotes = readNotes.filter(({id})=> id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFile('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);

});
