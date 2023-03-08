const { pool } = require("../services/db");
export default class PollService {
  static instance = new PollService();
  async findOne(id) {
    const poll = await pool.query(
      'SELECT * FROM public."Poll" WHERE id = $1',
      [id]
    );
    if (poll.rowCount > 0) {
      return poll.rows[0];
    }
  }
  
  async findByName(name) {
    const polls = await pool.query(
      'SELECT * FROM public."Poll" WHERE name = $1',
      [name]
    );
    if (polls.rowCount > 0) {
      return polls;
    }
  }
  async findAll() {
    const polls = await pool.query('SELECT * FROM public."Poll"');
    if (polls.rowCount > 0) {
      return polls.rows;
    }
  }

  async create(info) {
    const res = await pool.query(
      'INSERT INTO public."Poll" (name, "teamSize", description, "createdAt") VALUES ($1, $2, $3, $4)',
      [info.name, info.teamSize, info.description, new Date()]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  }
}
