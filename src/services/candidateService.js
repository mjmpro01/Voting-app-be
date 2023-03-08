const { pool } = require("../services/db");
export default class candidateService {
  static instance = new candidateService();
  async findOne(id) {
    const candidate = await pool.query(
      'SELECT * FROM public."Candidate" WHERE id = $1',
      [id]
    );
    if (candidate.rowCount > 0) {
      return candidate.rows[0];
    }
  }
  async findAll() {
    const candidates = await pool.query('SELECT * FROM public."Candidate"');
    return candidates;
  }

  async findCandidateByPollId(pollId) {
    const candidate = await pool.query(
      'SELECT A.id, A."pollId", B.username FROM public."Candidate" A, public."User" B WHERE A."pollId" = $1 and A."userId" = B.id',
      [pollId]
    );
    if (candidate.rowCount > 0) {
      return candidate.rows;
    }
  }

  async countCandidateByPollId(pollId) {
    const countCandidate = await pool.query(
      'SELECT COUNT (id) FROM public."Candidate" WHERE "pollId" = $1',
      [pollId]
    );
    if (countCandidate.rowCount > 0) {
      return countCandidate.rows[0].count;
    }
  }

  async create(info) {
    const res = await pool.query(
      'INSERT INTO public."Candidate" ("userId", "pollId", description) VALUES ($1, $2, $3)',
      [info.userId, info.pollId, info.description]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  async checkCandidateExistedByUserId_PollId(userId, pollId) {
    const candidate = await pool.query(
      'SELECT * FROM public."Candidate" WHERE "userId" = $1 and "pollId" = $2',
      [userId, pollId]
    );
    if (candidate.rowCount > 0) {
      return true;
    } else {
      return false 
    } 
  }
}
