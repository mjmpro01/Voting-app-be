const { pool } = require("../services/db");
export default class PollService {
  static instance = new PollService();
  async findAll() {
    const users = await pool.query('SELECT * FROM public."User"');
    return users;
  }

  async create(info) {
    const res = await pool.query(
      'INSERT INTO public."Poll" (name, "teamSize", description, "createdAt", "majorId") VALUES ($1, $2, $3, $4, $5)',
      [info.name, info.teamSize, info.description, new Date(), info.majorId]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  }
}
