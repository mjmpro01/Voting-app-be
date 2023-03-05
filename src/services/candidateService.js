const { pool } = require("../services/db");
export default class VoteService {
 static instance = new VoteService();
 async findAll() {
   const votes = await pool.query('SELECT * FROM public."Candidate"');
   return votes;
 };

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
