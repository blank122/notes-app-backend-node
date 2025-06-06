const knexConfig = require('../knexfile'); // ✅ Correctly load knexfile
const knex = require('knex')(knexConfig.development); // ✅ Use the correct environment config

class User {
    constructor(id, first_name, last_name, email, password, created_at, updated_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static async create(userData) {
        const [id] = await knex('users').insert(userData);
        return this.find(id);
    }

    static async find(id) {
        const user = await knex('users').where('id', id).first();
        return user ? new User(user.id, user.first_name, user.last_name, user.email, user.password, user.created_at, user.updated_at) : null;
    }

    static async findByEmail(email) {
        const user = await knex('users').where('email', email).first();
        return user ? new User(user.id, user.first_name, user.last_name, user.email, user.password, user.created_at, user.updated_at) : null;
    }

    static async all() {
        const users = await knex('users').select('*');
        return users.map(user => new User(user.id, user.first_name, user.last_name, user.email, user.password, user.created_at, user.updated_at));
    }

    static async update(id, userData) {
        await knex('users').where('id', id).update(userData);
        return this.find(id);
    }

    static async delete(id) {
        return knex('users').where('id', id).del();
    }
}

module.exports = User;
