const knex = require('knex')(require('./knexfile')); // Import and initialize Knex

class Note {
    constructor(id, title, content, created_at, updated_at, created_by) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.created_by = created_by;

    }

    static async create(noteData) {
        const [id] = await knex('notes').insert(noteData);
        return this.find(id);
    }

    static async find(id) {
        const note = await knex('notes').where('id', id).first();
        return note ? new Note(note.id, note.title, note.content, note.created_at, note.updated_at, created_by) : null;
    }

    static async all() {
        const notes = await knex('notes').select('*');
        return notes.map(note => new Note(note.id, note.title, note.content, note.created_at, note.updated_at, created_by));
    }

    static async update(id, noteData) {
        await knex('notes').where('id', id).update(noteData);
        return this.find(id);
    }

    static async delete(id) {
        return knex('notes').where('id', id).del();
    }
}

module.exports = Note;