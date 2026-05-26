import Joi from 'joi';
import validate from '../../../middlewares/validate.js';

const createPaymentSchema = Joi.object({
  member_id: Joi.any().required(),
  amount: Joi.number().required(),
  status: Joi.string().required(),
  member_name: Joi.string(),
  plan: Joi.string(),
  method: Joi.string(),
});

export const validateCreatePayment = validate(createPaymentSchema);
