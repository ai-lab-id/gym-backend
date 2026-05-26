import paymentRepository from '../repositories/payment-repositories.js';

class PaymentController {
  async getPayments(req, res, next) {
    try {
      const payments = await paymentRepository.findAll();
      const summary = await paymentRepository.getSummary();
      res.json({ payments, summary });
    } catch (err) {
      next(err);
    }
  }

  async addPayment(req, res, next) {
    try {
      const { member_id, member_name, plan, amount, status, method } = req.validated;
      
      const count = await paymentRepository.countPayments();
      const payment_id = `PAY${1001 + count}`;
      
      await paymentRepository.create({
        payment_id,
        member_id,
        member_name,
        plan,
        amount,
        status,
        method
      });
      
      res.json({ success: true, payment_id });
    } catch (err) {
      next(err);
    }
  }
}

export default new PaymentController();
