import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import config from '../config/index.js';
import { UnauthorizedError, ForbiddenError } from '../exceptions/index.js';

/**
 * Middleware untuk memverifikasi token JWT Admin
 * Token harus dikirim melalui header: Authorization: Bearer <token>
 */
export const authenticate = async (req, res, next) => {
  try {
    // 1. Ambil token dari header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Unauthorized');
    }

    // 2. Parse token dari format "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Format token tidak valid');
    }

    // 3. Verifikasi token menggunakan JWT
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.secret);
    } catch (err) {
      throw new UnauthorizedError('Token tidak valid atau sudah expired');
    }

    // 4. Verifikasi ke database mysql apakah admin_id masih terdaftar
    const [rows] = await pool.query(
      'SELECT admin_id, username, role, created_at FROM admin_user WHERE admin_id = ?',
      [decoded.admin_id]
    );

    if (rows.length === 0) {
      throw new UnauthorizedError('Admin tidak ditemukan');
    }

    // 5. Simpan data admin ke request object
    req.admin = rows[0];

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware untuk otorisasi berdasarkan role tertentu
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      throw new UnauthorizedError('Unauthorized');
    }

    if (!roles.includes(req.admin.role)) {
      throw new ForbiddenError('Akses ditolak: Anda tidak memiliki wewenang');
    }

    next();
  };
};
