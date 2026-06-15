import pool from '../../../config/db.js';

class MemberRepository {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT m.member_id, m.first_name, m.last_name, m.phone, m.email, m.gender, m.address, m.join_date,
             ms.membership_type as plan, ms.status
      FROM member m
      LEFT JOIN membership ms ON m.member_id = ms.member_id
      ORDER BY m.created_at DESC
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT member_id, first_name, last_name, phone, email FROM member WHERE member_id = ?',
      [id],
    );
    return rows[0] || null;
  }

  async countMembers() {
    const [[{ count }]] = await pool.query(
      'SELECT COUNT(*) as count FROM member',
    );
    return count;
  }

  async create(member) {
    const { member_id, first_name, last_name, phone, email, gender, address } =
      member;
    await pool.query(
      'INSERT INTO member (member_id, first_name, last_name, phone, email, gender, address, join_date) VALUES (?,?,?,?,?,?,?,CURDATE())',
      [member_id, first_name, last_name, phone, email, gender, address],
    );
    return member_id;
  }

  async update(id, member) {
    const { first_name, last_name, phone, email, gender, address } = member;
    await pool.query(
      'UPDATE member SET first_name=?, last_name=?, phone=?, email=?, gender=?, address=? WHERE member_id=?',
      [first_name, last_name, phone, email, gender, address, id],
    );
    return true;
  }

  async registerFingerprint(id, fingerprintTemplate) {
    await pool.query(
      'UPDATE member SET fingerprint_template = ? WHERE member_id = ?',
      [fingerprintTemplate, id],
    );
    return true;
  }

  async delete(id) {
    await pool.query('DELETE FROM member WHERE member_id=?', [id]);
    return true;
  }
}

export default new MemberRepository();
