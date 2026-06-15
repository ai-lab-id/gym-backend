import pool from '../../../config/db.js';

class AttendanceRepository {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT a.*, CONCAT(m.first_name,' ',m.last_name) as member_name
      FROM attendance a
      LEFT JOIN member m ON a.member_id = m.member_id
      ORDER BY a.entry_time DESC LIMIT 50
    `);
    return rows;
  }

  async findByFingerprint(fingerprintTemplate) {
    const [rows] = await pool.query(
      `
      SELECT m.member_id, CONCAT(m.first_name, ' ', m.last_name) as member_name, ms.status as membership_status
      FROM member m
      LEFT JOIN membership ms ON m.member_id = ms.member_id
      WHERE m.fingerprint_template = ?
      ORDER BY ms.created_at DESC LIMIT 1
    `,
      [fingerprintTemplate],
    );
    return rows[0] || null;
  }

  async findActiveEntryToday(member_id) {
    const [rows] = await pool.query(
      'SELECT id FROM attendance WHERE member_id=? AND date=CURDATE() AND exit_time IS NULL',
      [member_id],
    );
    return rows[0] || null;
  }

  async createEntry(member_id) {
    await pool.query(
      'INSERT INTO attendance (member_id, entry_time, date) VALUES (?, NOW(), CURDATE())',
      [member_id],
    );
    return true;
  }

  async updateExit(id) {
    await pool.query('UPDATE attendance SET exit_time = NOW() WHERE id = ?', [
      id,
    ]);
    return true;
  }
}

export default new AttendanceRepository();
