// controllers/notesController.js

const Note = require('../models/note'); // import your model

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.all();
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.find(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    console.error('Error fetching note:', err);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

exports.createNote = async (req, res) => {
  const { title, content, created_by } = req.body;

  if (!title || !created_by) {
    return res.status(400).json({ error: 'Title and created_by are required' });
  }

  try {
    const newNote = await Note.create({ title, content, created_by });
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.update(id, { title, content });
    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
    res.json(updatedNote);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Note.delete(id);
    if (!deleted) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
