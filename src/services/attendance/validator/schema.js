import Joi from 'joi';
import validate from '../../../middlewares/validate.js';

const entryExitSchema = Joi.object({
  member_id: Joi.any().required(),
});

const biometricSchema = Joi.object({
  fingerprint_template: Joi.string().required(),
});

export const validateEntryExit = validate(entryExitSchema);
export const validateBiometric = validate(biometricSchema);

