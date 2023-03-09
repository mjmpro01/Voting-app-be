const { pool } = require("../services/db");
class PollService {
  async findOne(id) {
    const poll = await pool.query(
      'SELECT * FROM public."poll" WHERE id = $1',
      [id]
    );
    if (poll.rowCount > 0) {
      return poll.rows[0];
    }
  }
  
  async findByName(name) {
    const polls = await pool.query(
      'SELECT * FROM public."poll" WHERE name = $1',
      [name]
    );
    if (polls.rowCount > 0) {
      return polls.rows[0];
    }
  }
  async findAll() {
    const polls = await pool.query('SELECT * FROM public."poll"');
    if (polls.rowCount > 0) {
      return polls.rows;
    }
  }

  async create(info) {
    const res = await pool.query(
      'INSERT INTO public.poll(name, description, "creatorId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)',
      [info.name, info.description, info.creatorId, new Date().toISOString(), new Date().toISOString()]
    );
    if (res.rowCount > 0) {
      return res.rows[0];
    } else {
      return null;
    }
  }

  async update(info) {
    const res = await pool.query(
      `UPDATE public.poll SET name=$1, description=$2, creatorId=$3, createdAt=$4, updatedAt=&5, status= $6`,
      [info.name, info.description, info.creatorId, new Date().toISOString(), new Date().toISOString()]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  async delete(id) {
    const res = await pool.query(
      `DELETE FROM public.poll
      WHERE id = $1`,
      [id]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  async findPollByUserId(id) {
    const res = await pool.query(`SELECT * FROM PUBLIC."poll" 
    LEFT JOIN PUBLIC."vote" on PUBLIC."poll".id = PUBLIC."vote"."pollId"
    WHERE "creatorId" = $1 OR PUBLIC."vote"."userId" = $1`, [id]);

    if (res.rowCount > 0) {
      return res.rows;
    } else {
      return null;
    }
  }

  async findPollDetailForKeyPoll(id) {
    const res = await pool.query(`SELECT * from "user" LEFT JOIN vote ON "user"."id" = "vote"."userId" 
    LEFT JOIN "user" AS "voteUsers" 
    ON "vote"."vote" @> to_jsonb(array_to_json(Array["voteUsers"."id"]))
    WHERE "vote"."pollId" = $1`,[id]);

    if (res.rowCount > 0) {
      return res.rows;
    } else {
      return null;
    }
  }

  async findPollDetailForUser(id, userId) {
    const res = await pool.query(`SELECT "vote".id, "user".username, "voteUsers".username from "user" LEFT JOIN vote ON "user"."id" = "vote"."userId" 
    LEFT JOIN "user" AS "voteUsers" 
    ON "vote"."vote" @> to_jsonb(array_to_json(Array["voteUsers"."id"]))
    WHERE "vote"."pollId" = $1 and "vote"."userId" = $2` ,[id, userId]);

    if (res.rowCount > 0) {
      return res.rows;
    } else {
      return null;
    }
  }

  async findCandidateByPollId(id) {
    const res = await pool.query(`SELECT "user".id, "user".username FROM "user" LEFT JOIN vote ON "user"."id" = "vote"."userId"
    WHERE "vote". "pollId" = $1`,[id]);
    
    if (res.rowCount > 0) {
      return res.rows;
    } else {
      return null;
    }

  }

  async countUserJoinedPoll(id) {
    const res = await pool.query(`select count ("vote"."userId")
    from (public."poll"  right join public."vote" on public."poll".id = public."vote"."pollId") 
    inner join public."user" on public."user".id = public."vote"."userId"
    where "poll".id = $1 and "user".status = 1`, [id]);

    if (res.rowCount > 0) {
      console.log("🚀 ~ file: pollService.js:103 ~ PollService ~ countUserJoinedPoll ~ res.rows[0]:", res.rows[0])
      return res.rows[0];
    } else {
      return null;
    }
  }

} 

module.exports = new PollService();
