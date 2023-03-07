const { pool } = require("../services/db");
export default class VoteService {
  static instance = new VoteService();
  async findByName(name) {
    const candidate = await pool.query(
      'SELECT * FROM public."Candidate" WHERE name = $1',
      [name]
    );
    if (candidate.rowCount > 0) {
      return candidate;
    }
  }
  async findAll() {
    const candidates = await pool.query('SELECT * FROM public."Candidate"');
    return candidates;
  }

  async create(info) {
    const res = await pool.query(
      'INSERT INTO public."Candidate" (name, description) VALUES ($1, $2)',
      [info.name, info.description]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  }
}
