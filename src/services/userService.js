const { pool } = require("../services/db");
import Constant from '../config/config.js';
const bcrypt = require('bcrypt');
class UserService {
  
  async findAll() {
    const users = await pool.query('SELECT id, username, email FROM public."user" WHERE role = 2');
    if (users.rowCount > 0) {
      return users.rows;
    } else return null;
  };

  async create(info) {
    const hashedPassword = await this.hashPassword(info.password);
    const res = await pool.query(
      `INSERT INTO public."user"(
        username, email, password, role, status, "createdAt", "updatedAt")
        VALUES ($1, $2, $3 , $4, $5, $6, $7) RETURNING id, username, email`,
      [info.username, info.email, hashedPassword, 2, 1, new Date().toISOString(), new Date().toISOString()]
    );
    if (res.rowCount > 0) {
      return res.rows[0];
    } else {
      return null;
    }
  };

  async findOne(id) {
    const user = await pool.query('SELECT * FROM public."user" WHERE id = $1', [
      id,
    ]);
    if (user.rows.length > 0) {
      return user.rows[0];
    } else {
      return null;
    }
  };

  async update(info) {
    const res = await pool.query(`UPDATE public."user"
    SET username=$2, email=$3, password=$4, role=$5, status=$6, "createdAt"=$7, "updatedAt"=$8
    WHERE id = $1`, [info.id, info.name, info.email, info.password, info.role, info.status, info.createdAt, info.updatedAt])
    if (res.rowCount > 0) {
      return true;
    } else {
      return false;
    }

  }


  async delete(id) { 
    const user = await pool.query(`DELETE FROM public."user" WHERE id = $1 `, [ id ]);
    if (user.rows.length > 0) {
      return user.rows[0];
    } else {
      return null;
    }
  }
  async hashPassword(password) {
    const saltRounds = Constant.DEFAULT_SALT_ROUND;

    return bcrypt.hashSync(password, saltRounds);
  };

  async generateToken(info) {
    const token = sign(info, Constant.instance.PRIVATE_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return token;
  };

  // Compare hash password in db with plain password
  async (password, { password: hashPassword }) {
    return bcrypt.compareSync(password, hashPassword);
  };

  async findOneByUsername(name) {
    const user = await pool.query('SELECT * FROM public."user" WHERE name = $1', [name]);
    if (user.rows.length > 0) {
      return user.rows[0];
    }
  }

  async findOneByEmail(email) {
    const user = await pool.query('SELECT * FROM public."user" WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      return user.rows[0];
    }
  }

  async findOneByEmail(email) {
    const user = await pool.query('SELECT * FROM public."user" WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      return user.rows[0];
    } else return null;
  }

  async findOneRoleName(id) {
    const role = await pool.query('SELECT * FROM public."Role"');
    if (role.rows.length > 0) {
      return role.rows[0].name;
    }
  }
}
module.exports = new UserService();