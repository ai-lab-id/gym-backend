import Joi from 'joi';
import validate from '../../../middlewares/validate.js';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateLogin = validate(loginSchema);
