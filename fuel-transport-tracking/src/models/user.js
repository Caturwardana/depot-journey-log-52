
const db = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async findAll() {
    const [rows] = await db.execute('SELECT id, username, fullname, role, created_at FROM users ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT id, username, fullname, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async create(userData) {
    const { username, password, fullname, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.execute(
      'INSERT INTO users (username, password, fullname, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, fullname, role]
    );
    
    return { id: result.insertId, username, fullname, role };
  }

  static async update(id, userData) {
    const { username, fullname, role } = userData;
    
    await db.execute(
      'UPDATE users SET username = ?, fullname = ?, role = ? WHERE id = ?',
      [username, fullname, role, id]
    );
    
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
