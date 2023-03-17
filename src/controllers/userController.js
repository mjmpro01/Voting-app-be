const userService = require("../services/userService");
const bcrypt = require("bcrypt");
import jwt from 'jsonwebtoken';
import Constant from '../config/config.js';
import { createResponseObject } from '../../utils/response.js';
class userController {
  async register(req, res) {
    const info = req.body;
    if (!info.username || !info.password) {
      return res.status(400).json({ message: 'Username and password are required' });
    };
    try {
      const checkExistedEmail = await userService.findOneByEmail(info.email);
      if (checkExistedEmail) {
        return res.status(400).json({ message: 'Email has already used' });
      }
      const user = await userService.create(info);
      if (user) {
        res.status(201).json(createResponseObject("User is created successful", user, null));
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    } catch(e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.findOneByEmail(email);
      if (!user) {
        const message = createResponseObject(Constant.ERROR_MESSAGE.INCORRECT_USERNAME_PASSWORD, null, null);
        return res
          .status(401)
          .json(message);
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordMatch) {
        return res
          .status(401)
          .json(createResponseObject('Email or password is invalid', null, "Bad request"));
      }
      
      const token = jwt.sign(
        { userId: user.id },
        Constant.PRIVATE_KEY
      );
      console.log('POST ')
      res.status(200).json(createResponseObject('Login successfully', { token }, null));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.findAll();
      res.status(201).json(createResponseObject('get all users successfully', users, null));
    } catch(e) {
      console.error(error);
      res.status(500).json({ message: "Internal Server" });
    }
  }

  async getMe(req, res) {
    try {
      const { userId } = req.ctx;
      const me = await userService.findOne(userId);
      res.status(201).json(createResponseObject('get all users successfully', me, null));
    } catch(e) {
      console.error(error);
      res.status(500).json({ message: "Internal Server" });
    }
  }
};


module.exports = new userController();