import membershipRepository from '../repositories/membership-repositories.js';
import memberRepository from '../../members/repositories/member-repositories.js';
import paymentRepository from '../../payments/repositories/payment-repositories.js';

class MembershipController {
  async getAllMemberships(req, res, next) {
    try {
      const memberships = await membershipRepository.findAll();
      res.json(memberships);
    } catch (err) {
      next(err);
    }
  }

  async addMembership(req, res, next) {
    try {
      const { member_id, membership_type, start_date, end_date, validity, amount } = req.validated;
      
      await membershipRepository.expireActiveMembership(member_id);
      
      await membershipRepository.create({
        member_id,
        membership_type,
        start_date,
        end_date,
        validity,
        amount,
        status: 'Active'
      });
      
      const member = await memberRepository.findById(member_id);
      const member_name = member ? `${member.first_name} ${member.last_name}` : '';
      
      const paymentCount = await paymentRepository.countPayments();
      const payment_id = `PAY${1001 + paymentCount}`;
      
      await paymentRepository.create({
        payment_id,
        member_id,
        member_name,
        plan: membership_type,
        amount,
        status: 'Paid',
        method: 'Cash'
      });
      
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async updateMembership(req, res, next) {
    try {
      const { id } = req.params;
      const { membership_type, start_date, end_date, validity, amount, status } = req.validated;
      
      await membershipRepository.update(id, {
        membership_type,
        start_date,
        end_date,
        validity,
        amount,
        status
      });
      
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async deleteMembership(req, res, next) {
    try {
      const { id } = req.params;
      await membershipRepository.delete(id);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}

export default new MembershipController();
