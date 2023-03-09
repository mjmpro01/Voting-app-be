const userService = require("../services/userService");
const roleService = require("../services/roleService");
const bcrypt = require("bcrypt");
import jwt from 'jsonwebtoken';
import Constant from '../config/config.js';
import { createResponseObject } from '../../utils/response.js';
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
      const { email, password } = req.body;

      const user = await userService.findOneByEmail(email);
      if (!user) {
        const message = createResponseObject(Constant.ERROR_MESSAGE.INCORRECT_USERNAME_PASSWORD, null, null);
        return res
          .status(401)
          .json(message);
      }

      // const isPasswordMatch = await bcrypt.compare(
      //   password,
      //   user.password
      // );
      // console.log("🚀 ~ file: userController.js:42 ~ userController ~ login ~ isPasswordMatch:", isPasswordMatch)

      // if (!isPasswordMatch) {
      //   return res
      //     .status(401)
      //     .json(createResponseObject('Email or password is invalid', null, "Bad request"));
      // }
      
      const token = jwt.sign(
        { userId: user.id },
        Constant.PRIVATE_KEY
      );
      res.status(200).json(createResponseObject('Login successfully', { token }, null));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.default.prototype.findAllUser();
      res.status(201).json(createResponseObject('get all users successfully', users, null));
    } catch(e) {
      console.error(error);
      res.status(500).json({ message: "Internal Server" });
    }
  }
};
