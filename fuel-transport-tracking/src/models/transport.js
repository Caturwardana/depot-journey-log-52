
const db = require('../db');

class Transport {
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT t.*, u.fullname as driver_name, d.name as depot_name, term.name as terminal_name
      FROM transports t
      LEFT JOIN users u ON t.driver_id = u.id
      LEFT JOIN depots d ON t.depot_id = d.id
      LEFT JOIN terminals term ON t.terminal_id = term.id
      ORDER BY t.created_at DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(`
      SELECT t.*, u.fullname as driver_name, d.name as depot_name, term.name as terminal_name
      FROM transports t
      LEFT JOIN users u ON t.driver_id = u.id
      LEFT JOIN depots d ON t.depot_id = d.id
      LEFT JOIN terminals term ON t.terminal_id = term.id
      WHERE t.id = ?
    `, [id]);
    return rows[0];
  }

  static async create(transportData) {
    const {
      unit_number, driver_id, depot_id, terminal_id, destination,
      fuel_type, volume, status, notes, latitude, longitude
    } = transportData;

    const [result] = await db.execute(`
      INSERT INTO transports (
        unit_number, driver_id, depot_id, terminal_id, destination,
        fuel_type, volume, status, notes, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [unit_number, driver_id, depot_id, terminal_id, destination, fuel_type, volume, status, notes, latitude, longitude]);

    return this.findById(result.insertId);
  }

  static async update(id, transportData) {
    const {
      unit_number, driver_id, depot_id, terminal_id, destination,
      fuel_type, volume, status, notes, latitude, longitude
    } = transportData;

    await db.execute(`
      UPDATE transports SET
        unit_number = ?, driver_id = ?, depot_id = ?, terminal_id = ?,
        destination = ?, fuel_type = ?, volume = ?, status = ?,
        notes = ?, latitude = ?, longitude = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [unit_number, driver_id, depot_id, terminal_id, destination, fuel_type, volume, status, notes, latitude, longitude, id]);

    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM transports WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async updateStatus(id, status) {
    await db.execute('UPDATE transports SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
    return this.findById(id);
  }
}

module.exports = Transport;
