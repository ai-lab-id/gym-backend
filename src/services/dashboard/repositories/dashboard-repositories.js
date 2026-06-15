import pool from '../../../config/db.js';

class DashboardRepository {
  async getStats() {
    const [[{ totalMembers }]] = await pool.query(
      'SELECT COUNT(*) as totalMembers FROM member',
    );
    const [[{ activeMembers }]] = await pool.query(
      "SELECT COUNT(*) as activeMembers FROM membership WHERE status = 'Active'",
    );
    const [[{ todayCheckins }]] = await pool.query(
      'SELECT COUNT(*) as todayCheckins FROM attendance WHERE date = CURDATE()',
    );
    const [[{ monthlyRevenue }]] = await pool.query(
      "SELECT COALESCE(SUM(amount),0) as monthlyRevenue FROM payment WHERE status='Paid' AND MONTH(payment_date)=MONTH(CURDATE()) AND YEAR(payment_date)=YEAR(CURDATE())",
    );
    const [[{ activeCount }]] = await pool.query(
      "SELECT COUNT(*) as activeCount FROM membership WHERE status='Active'",
    );
    const [[{ expiredCount }]] = await pool.query(
      "SELECT COUNT(*) as expiredCount FROM membership WHERE status='Expired'",
    );
    const [[{ pendingCount }]] = await pool.query(
      "SELECT COUNT(*) as pendingCount FROM membership WHERE status='Pending'",
    );

    return {
      stats: { totalMembers, activeMembers, todayCheckins, monthlyRevenue },
      membershipStatus: {
        active: activeCount,
        expired: expiredCount,
        pending: pendingCount,
      },
    };
  }

  async getRecentMembers(limit = 5) {
    const [rows] = await pool.query(
      `
      SELECT m.member_id, m.first_name, m.last_name, ms.membership_type, m.join_date
      FROM member m
      LEFT JOIN membership ms ON m.member_id = ms.member_id
      ORDER BY m.created_at DESC LIMIT ?
    `,
      [limit],
    );
    return rows;
  }
}

export default new DashboardRepository();
