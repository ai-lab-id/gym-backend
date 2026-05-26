import Joi from 'joi';
import validate from '../../../middlewares/validate.js';

const memberSchema = Joi.object({
  first_name: Joi.string().required(),
  phone: Joi.string().required(),
  last_name: Joi.string(),
  email: Joi.string(),
  gender: Joi.string(),
  address: Joi.string(),
});

const memberFingerprintSchema = Joi.object({
  fingerprint_template: Joi.string().required()
});

export const validateCreateMember = validate(memberSchema);
export const validateUpdateMember = validate(memberSchema);
export const validateMemberFingerprint = validate(memberFingerprintSchema);
