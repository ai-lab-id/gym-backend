import Joi from 'joi';
import validate from '../../../middlewares/validate.js';

const createMembershipSchema = Joi.object({
  member_id: Joi.any().required(),
  membership_type: Joi.string().required(),
  amount: Joi.number().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  validity: Joi.string().required(),
});

const updateMembershipSchema = Joi.object({
  membership_type: Joi.string().required(),
  amount: Joi.number().required(),
  status: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  validity: Joi.string().required(),
});

export const validateCreateMembership = validate(createMembershipSchema);
export const validateUpdateMembership = validate(updateMembershipSchema);