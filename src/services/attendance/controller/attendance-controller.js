import attendanceRepository from '../repositories/attendance-repositories.js';

class AttendanceController {
  async getAttendance(req, res, next) {
    try {
      const rows = await attendanceRepository.findAll();
      res.json(rows);
    } catch (err) {
      next(err);
    }
  }

  async markEntry(req, res, next) {
    try {
      const { member_id } = req.validated;

      const existing = await attendanceRepository.findActiveEntryToday(member_id);
      if (existing) {
        return res.status(400).json({ error: 'Member already checked in today' });
      }

      await attendanceRepository.createEntry(member_id);
      res.json({ success: true, message: 'Entry marked successfully' });
    } catch (err) {
      next(err);
    }
  }

  async markExit(req, res, next) {
    try {
      const { member_id } = req.validated;

      const existing = await attendanceRepository.findActiveEntryToday(member_id);
      if (!existing) {
        return res.status(400).json({ error: 'No active entry found for today' });
      }

      await attendanceRepository.updateExit(existing.id);
      res.json({ success: true, message: 'Exit marked successfully' });
    } catch (err) {
      next(err);
    }
  }

  async biometricAttendance(req, res, next) {
    try {
      const { fingerprint_template } = req.validated;

      // Find member by fingerprint
      const member = await attendanceRepository.findByFingerprint(fingerprint_template);
      if (!member) {
        return res.status(404).json({ error: 'Fingerprint not registered or member not found' });
      }

      // Check membership status
      if (member.membership_status !== 'Active') {
        return res.status(400).json({ error: `Membership is ${member.membership_status || 'Inactive'}` });
      }

      const { member_id, member_name } = member;

      // Check if already checked in today (entry exists but no exit)
      const existing = await attendanceRepository.findActiveEntryToday(member_id);
      if (!existing) {
        // Record Check-in (entry)
        await attendanceRepository.createEntry(member_id);
        return res.json({
          success: true,
          type: 'check-in',
          member_id,
          member_name,
          message: `Check-in successful for ${member_name}`
        });
      } else {
        // Record Check-out (exit)
        await attendanceRepository.updateExit(existing.id);
        return res.json({
          success: true,
          type: 'check-out',
          member_id,
          member_name,
          message: `Check-out successful for ${member_name}`
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new AttendanceController();

