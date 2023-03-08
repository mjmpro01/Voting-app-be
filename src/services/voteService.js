const { pool } = require("../services/db");

export default class VoteService {
  static instance = new VoteService();
  async findAll() {
    const votes = await pool.query('SELECT * FROM public."Vote"');
    return votes;
  }

  async create(userId, pollId, candidateId) {
    const res = await pool.query(
      'INSERT INTO public."Vote" ("userId", "pollId", "candidateId") VALUES ($1, $2, $3)',
      [userId, pollId, candidateId]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  async checkExistedVote(userId, pollId, candidateId) {
    const res = await pool.query(
      'SELECT * FROM public."Vote" WHERE "userId" = $1 and "pollId" = $2 and "candidateId" = $3',
      [userId, pollId, candidateId]
    );
    if (res.rowCount > 0) {
      return true;
    } else {
      return false;
    } 
  }

  async findAllByPollId(pollId) {
    const res = await pool.query('SELECT A."userId", B.username, A."candidateId", D.username FROM PUBLIC."Vote" A, PUBLIC."User" B, PUBLIC."Candidate" C,  PUBLIC."User" D WHERE A."userId" = B.id AND A."pollId" = $1 AND A."candidateId" = C.id AND C."userId" = D.id', [pollId]);
    if (res.rowCount > 0) {
      return res.rows;
    } else {
      return null;
    } 
  }
}
