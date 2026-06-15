import pool from '../../../config/db.js';

class AuthRepository {
  async findByCredentials(username, password) {
    const [rows] = await pool.query(
      'SELECT * FROM admin_user WHERE username = ? AND password = ?',
      [username, password],
    );
    return rows[0] || null;
  }
}

export default new AuthRepository();
