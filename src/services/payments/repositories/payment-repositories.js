import pool from '../../../config/db.js';

class PaymentRepository {
  async findAll() {
    const [rows] = await pool.query(
      'SELECT * FROM payment ORDER BY created_at DESC',
    );
    return rows;
  }

  async getSummary() {
    const [[{ total }]] = await pool.query(
      "SELECT COALESCE(SUM(amount),0) as total FROM payment WHERE status='Paid'",
    );
    const [[{ monthly }]] = await pool.query(
      "SELECT COALESCE(SUM(amount),0) as monthly FROM payment WHERE status='Paid' AND MONTH(payment_date)=MONTH(CURDATE()) AND YEAR(payment_date)=YEAR(CURDATE())",
    );
    const [[{ pending }]] = await pool.query(
      "SELECT COALESCE(SUM(amount),0) as pending FROM payment WHERE status='Pending'",
    );
    const [[{ pendingCount }]] = await pool.query(
      "SELECT COUNT(*) as pendingCount FROM payment WHERE status='Pending'",
    );

    return { total, monthly, pending, pendingCount };
  }

  async countPayments() {
    const [[{ count }]] = await pool.query(
      'SELECT COUNT(*) as count FROM payment',
    );
    return count;
  }

  async create(payment) {
    const { payment_id, member_id, member_name, plan, amount, status, method } =
      payment;
    await pool.query(
      'INSERT INTO payment (payment_id, member_id, member_name, plan, amount, payment_date, status, method) VALUES (?,?,?,?,?,CURDATE(),?,?)',
      [payment_id, member_id, member_name, plan, amount, status, method],
    );
    return payment_id;
  }
}

export default new PaymentRepository();
