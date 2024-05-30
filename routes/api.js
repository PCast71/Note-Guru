const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const notesPath = path.join(__dirname, '../db/db.json');

const readNotes = async () => {
    try {
        const data = await fs.readFile(notesPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading notes:', err);
        return [];
    }
    };
  

const writeNotes = async (notes) => {
    try {
    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
    } catch (err) {
        console.error("Error writing to db", err);
    }
}; 

router.get('/notes', async (req, res) => {
   const notes = await readNotes();
   res.json(notes);
});

router.post('/notes', async (req, res) => {
    const notes = await readNotes();
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notes.push(newNote);
    await writeNotes(notes);
    res.json(newNote);
});

router.delete('/notes/:id', async (req, res) => {
    const notes = await readNotes();
    const noteId = req.params.id;
    const newNotes = notes.filter(note => note.id !== noteId);
    writeNotes(newNotes);
    res.json({ message: 'Note deleted'});
});

module.exports = router;