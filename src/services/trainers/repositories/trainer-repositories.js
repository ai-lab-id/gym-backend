import pool from '../../../config/db.js';

class TrainerRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM TRAINER ORDER BY created_at DESC');
    return rows;
  }

  async create(trainer) {
    const { name, specialization, phone, email, experience } = trainer;
    await pool.query(
      'INSERT INTO TRAINER (name, specialization, phone, email, experience) VALUES (?,?,?,?,?)',
      [name, specialization, phone, email, experience || 0]
    );
    return true;
  }

  async update(id, trainer) {
    const { name, specialization, phone, email, experience, status } = trainer;
    await pool.query(
      'UPDATE TRAINER SET name=?, specialization=?, phone=?, email=?, experience=?, status=? WHERE trainer_id=?',
      [name, specialization, phone, email, experience, status, id]
    );
    return true;
  }

  async delete(id) {
    await pool.query('DELETE FROM TRAINER WHERE trainer_id=?', [id]);
    return true;
  }
}

export default new TrainerRepository();
