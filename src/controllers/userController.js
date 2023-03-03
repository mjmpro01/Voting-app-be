const userService = require("../services/userService");
const bcrypt = require("bcrypt");
import jwt from 'jsonwebtoken';
import Constant from '../config/config.js';
module.exports = class userController {
  async register(req, res) {
    const info = req.body;
    if (!info.username || !info.password) {
      return res.status(400).json({ message: 'Username and password are required' });
    };
    try {
      const checkExistedEmail = await userService.default.prototype.findOneByEmail(info.email);
      if (checkExistedEmail) {
        return res.status(400).json({ message: 'Email has already used' });
      }
      await userService.default.prototype.create(info);
      res.status(201).json({ message: 'User created' });
    } catch(e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  };

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = userService.default.prototype.findOneByUsername(username);
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
