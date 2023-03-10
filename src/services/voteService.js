const { pool } = require("../services/db");

class VoteService {
  async findOne(id) {
    const res = await pool.query(
      'SELECT * FROM public.vote WHERE id = $1',[id]
    );
    if (res.rowCount > 0) { 
      return res.rows[0];
    } else return null;
  }

  async findOneByPollId_UserId(pollId, userId) {
    const res = await pool.query(
      'SELECT * FROM public.vote WHERE "pollId" = $1 and "userId" = $2',[pollId, userId]
    );
    if (res.rowCount > 0) { 
      return res.rows[0];
    } else return null;
  }
  async findAll() {
    const res = await pool.query('SELECT * FROM public.vote');
    if (res.rowCount > 0) { 
      return res.rows;
    } else return null;
  }

  async create(id, userId, pollId, vote) {
    const res = await pool.query(
      'INSERT INTO public.vote("id", "userId", "pollId", vote) VALUES ($1, $2, $3, $4)',
      [id, userId, pollId, vote]
    );
    if (res.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  };

  async update(info) {
    const res = await pool.query(`UPDATE public.vote SET "userId"=$2, "pollId"=$3, vote=$4 WHERE id = $1`, [info.id, info.userId, info.pollId, info.vote])
    if (res.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  }
  async updateVote(id, vote) {
    const res = await pool.query(`UPDATE public.vote SET vote=$2 WHERE id = $1`, [id, vote]);
    if (res.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  }
  async delete(id) {
    const res = await pool.query(`DELETE FROM public.vote WHERE id = $1`, [id])
    if (res.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  async findVoteDetail(id, pollId) {
      const res = await pool.query(`SELECT "voter".id, "voter".username, "voter".email, "voteUsers".id as candidateId, "voteUsers".username as candidateName, "voteUsers".email as candidateEmail from "user" AS "voter" LEFT JOIN vote ON "voter"."id" = "vote"."userId" 
      LEFT JOIN "user" AS "voteUsers" 
      ON "vote"."vote" @> to_jsonb(array_to_json(Array["voteUsers"."id"]))
      WHERE "vote"."pollId" = $1 and "vote".id = $2`,[id, pollId]);
  
      if (res.rowCount > 0) {
        return res.rows;
      } else {
        return null;
      }
    }
}

module.exports = new VoteService();
