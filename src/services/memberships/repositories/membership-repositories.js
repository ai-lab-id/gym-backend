import pool from '../../../config/db.js';

class MembershipRepository {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT ms.*, CONCAT(m.first_name,' ',m.last_name) as member_name
      FROM membership ms
      LEFT JOIN member m ON ms.member_id = m.member_id
      ORDER BY ms.created_at DESC
    `);
    return rows;
  }

  async expireActiveMembership(member_id) {
    await pool.query(
      "UPDATE membership SET status = 'Expired' WHERE member_id = ? AND status = 'Active'",
      [member_id],
    );
    return true;
  }

  async create(membership) {
    const {
      member_id,
      membership_type,
      start_date,
      end_date,
      validity,
      amount,
      status,
    } = membership;
    const [result] = await pool.query(
      'INSERT INTO membership (member_id, membership_type, start_date, end_date, validity, amount, status) VALUES (?,?,?,?,?,?,?)',
      [
        member_id,
        membership_type,
        start_date,
        end_date,
        validity,
        amount,
        status || 'Active',
      ],
    );
    return result.insertId;
  }

  async update(id, membership) {
    const { membership_type, start_date, end_date, validity, amount, status } =
      membership;
    await pool.query(
      'UPDATE membership SET membership_type=?, start_date=?, end_date=?, validity=?, amount=?, status=? WHERE membership_id=?',
      [membership_type, start_date, end_date, validity, amount, status, id],
    );
    return true;
  }

  async delete(id) {
    await pool.query('DELETE FROM membership WHERE membership_id=?', [id]);
    return true;
  }
}

export default new MembershipRepository();
