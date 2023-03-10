const pollService = require("../services/pollService");
import { createResponseObject } from '../../utils/response.js';

module.exports = class pollController {
  async createPoll(req, res) {
    try {
      const info = req.body;
      if (!info.name || !info.teamSize) {
        return res
          .status(400)
          .json({ message: "Please enter full information" });
      }

      if (!info.description) {
        info.description = null;
      }
      const existedPoll = await pollService.default.instance.findByName(info.name);
      if (existedPoll) {
        return res.status(400).json(createResponseObject("Poll is existed", null, "Bad request"));
      }
      const poll = await pollService.default.instance.create(info);

      if (poll) {
        return res.status(200).json(createResponseObject("Create Poll successfully", null, null));
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  };
  
  async getAllPolls(req, res) {
    try {
      const polls = await pollService.default.instance.findAll();

      if (polls) {
        return res.status(200).json(createResponseObject("Get Polls successfully", polls, null));
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }

  async getTeamSizeByPollId(req, res) {
    try {
      const polls = await pollService.default.instance.findOne();

      if (polls) {
        return res.status(200).json(createResponseObject("Get Polls successfully", polls, null));
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
