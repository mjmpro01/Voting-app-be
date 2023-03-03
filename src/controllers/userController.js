const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const { pool } = require("../services/db.js");
import jwt from 'jsonwebtoken';
import Constant from '../config/config.js';
module.exports = class userController {
  async register(req, res) {
    const { username, password, email } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO public."User" (username, password, email, status, "roleId", "majorId") VALUES ($1, $2, $3, $4, $5, $6)',
        [username, hashedPassword, email, "true", 2, 1]
      );
      res.status(201).json({ message: "User created" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await pool.query('SELECT * FROM public."User" WHERE username = $1', [
        username,
      ]);

      if (user.rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác" });
      }

      const token = jwt.sign(
        { userId: user.rows[0].id },
        Constant.instance.PRIVATE_KEY
      );

      res.json({ message: "Đăng nhập thành công", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi" });
    }
  }
};
