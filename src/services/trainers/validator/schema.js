import Joi from 'joi';
import validate from '../../../middlewares/validate.js';

const createTrainerSchema = Joi.object({
  name: Joi.string().required(),
  specialization: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  experience: Joi.number(),
});

const updateTrainerSchema = Joi.object({
  name: Joi.string().required(),
  specialization: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  experience: Joi.number(),
  status: Joi.string().required(),
});

export const validateCreateTrainer = validate(createTrainerSchema);
export const validateUpdateTrainer = validate(updateTrainerSchema);
