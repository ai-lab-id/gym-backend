import dashboardRepository from '../repositories/dashboard-repositories.js';

class DashboardController {
  async getDashboardData(req, res, next) {
    try {
      const statsData = await dashboardRepository.getStats();
      const recentMembers = await dashboardRepository.getRecentMembers(5);

      res.json({
        stats: statsData.stats,
        membershipStatus: statsData.membershipStatus,
        recentMembers,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new DashboardController();
