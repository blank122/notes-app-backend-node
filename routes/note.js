const express = require('express');
const router = express.Router();
const notesController = require('../controller/NotesController');

// Define endpoints
router.get('/notes', notesController.getAllNotes);
router.post('/note', notesController.createNote);
router.put('/note:id', notesController.updateNote);
router.delete('/note:id', notesController.deleteNote);

module.exports = router;
