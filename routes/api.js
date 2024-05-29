const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const notesPath = path.join(__dirname, '../db/db.json');

const readNotes = () => {
    fs.readFileSync(notesPath, 'utf8');
    return JSON.parse(data);
};

const writeNotes = (notes) => {
    fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
}; 

router.post('/notes', (req, res) => {
    const notes = readNotes();
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
});

router.delete('/notes/:id',  (req, res) => {
    const notes = readNotes();
    const noteId = req.params.id;
    const newNotes = notes.filter(note => note.id !== noteId);
    writeNotes(newNotes);
    res.json({ message: 'Note deleted'});
});

module.exports = router;