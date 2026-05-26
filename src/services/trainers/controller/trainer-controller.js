import trainerRepository from '../repositories/trainer-repositories.js';

class TrainerController {
  async getAllTrainers(req, res, next) {
    try {
      const trainers = await trainerRepository.findAll();
      res.json(trainers);
    } catch (err) {
      next(err);
    }
  }

  async addTrainer(req, res, next) {
    try {
      const { name, specialization, phone, email, experience } = req.validated;
      await trainerRepository.create({
        name,
        specialization,
        phone,
        email,
        experience
      });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async updateTrainer(req, res, next) {
    try {
      const { id } = req.params;
      const { name, specialization, phone, email, experience, status } = req.validated;
      await trainerRepository.update(id, {
        name,
        specialization,
        phone,
        email,
        experience,
        status
      });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async deleteTrainer(req, res, next) {
    try {
      const { id } = req.params;
      await trainerRepository.delete(id);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}

export default new TrainerController();
