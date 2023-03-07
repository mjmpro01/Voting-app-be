const { pool } = require("../services/db");
import Constant from '../config/config.js';
const bcrypt = require('bcrypt');
export default class UserService {
  
  static instance = new UserService();
  async findAll() {
    const users = await pool.query('SELECT * FROM public."User"');
    return users;
  };

  async create(info) {
    const hashedPassword = await this.hashPassword(info.password);
    const res = await pool.query(
      'INSERT INTO public."User" (username, password, email, status, "roleId", "majorId") VALUES ($1, $2, $3, $4, $5, $6)',
      [info.username, hashedPassword, info.email, "true", 2, info.majorId]
    );
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  async findOne(id) {
    const user = await pool.query('SELECT * FROM public."User" WHERE id = $1', [
      id,
    ]);
    if (user.rows.length > 0) {
      return user.rows[0];
    } else {
      return null;
    }
  };

  async hashPassword(password) {
    const saltRounds = Constant.instance.DEFAULT_SALT_ROUND;

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

  async findOneByUsername(username) {
    const user = await pool.query('SELECT * FROM public."User" WHERE username = $1', [username]);
    if (user.rows.length > 0) {
      return user.rows[0];
    }
  }

  async findOneByEmail(email) {
    const user = await pool.query('SELECT * FROM public."User" WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      return user.rows[0];
    }
  }

  async findOneRoleName(id) {
    const role = await pool.query('SELECT * FROM public."Role"');
    if (role.rows.length > 0) {
      return role.rows[0].name;
    }
  }
}