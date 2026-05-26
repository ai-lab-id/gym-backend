import memberRepository from '../repositories/member-repositories.js';

class MemberController {
  async getAllMembers(req, res, next) {
    try {
      const members = await memberRepository.findAll();
      res.json(members);
    } catch (err) {
      next(err);
    }
  }

  async getMemberById(req, res, next) {
    try {
      const { id } = req.params;
      const member = await memberRepository.findById(id);

      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      res.json(member);
    } catch (err) {
      next(err);
    }
  }

  async addMember(req, res, next) {
    try {
      const { first_name, last_name, phone, email, gender, address } = req.validated;

      const count = await memberRepository.countMembers();
      const member_id = `MBR${1001 + count}`;

      await memberRepository.create({
        member_id,
        first_name,
        last_name,
        phone,
        email,
        gender,
        address
      });

      res.json({ success: true, member_id });
    } catch (err) {
      next(err);
    }
  }

  async updateMember(req, res, next) {
    try {
      const { first_name, last_name, phone, email, gender, address } = req.validated;
      const { id } = req.params;

      await memberRepository.update(id, {
        first_name,
        last_name,
        phone,
        email,
        gender,
        address
      });

      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async deleteMember(req, res, next) {
    try {
      const { id } = req.params;
      await memberRepository.delete(id);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  async registerFingerprint(req, res, next) {
    try {
      const { id } = req.params;
      const { fingerprint_template } = req.validated;

      if (!fingerprint_template) {
        return res.status(400).json({ error: 'fingerprint_template is required' });
      }

      const member = await memberRepository.findById(id);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      await memberRepository.registerFingerprint(id, fingerprint_template);
      res.json({ success: true, message: 'Fingerprint registered successfully' });
    } catch (err) {
      next(err);
    }
  }
}

export default new MemberController();

