import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';
import authRepository from '../repositories/auth-repositories.js';

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.validated;
      const user = await authRepository.findByCredentials(username, password);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT Token`
      const access_token = jwt.sign(
        { admin_id: user.admin_id, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.json({
        success: true,
        access_token
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
