const pollService = require("../services/pollService");
import { createResponseObject } from '../../utils/response.js';
const userService = require('../services/userService');
import VoteService from '../services/voteService.js';
import { v4 as uuidv4 } from 'uuid';
class pollController {
  async createPoll(req, res) {
    try {
      const info = req.body;
      const { userId } = req.ctx;
      if (userId) {
        info.creatorId = userId;
      }
      if (!info.name || !info.creatorId) {
        return res
          .status(400)
          .json({ message: "Please enter full information" });
      }

      if (!info.description) {
        info.description = null;
      }
      const existedPoll = await pollService.findByName(info.name);
      if (existedPoll) {
        return res.status(400).json(createResponseObject("Name poll is existed", null, "Bad request"));
      }

      for (const userId of info.userIds) {
        const user = await userService.findOne(userId);
        if (!user) {
          return res.status(400).json(createResponseObject(`User: ${userId} is not existed `, null, "Bad request"));
        }
      }
      await pollService.create(info);

      const poll = await pollService.findByName(info.name);
      if (!poll) {
        return res.status(500).json(createResponseObject(`Create poll fail`, null, "Internal server"));
      }
      await info.userIds.map(async (userId) => {
        const id = uuidv4();
        await VoteService.create(id, userId, poll.id, null);
      })
      
      return res.status(200).json(createResponseObject("Create Poll successfully", null, null));
      
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  };
  
  async getPollByUserId(req, res) {
    try {
      const { userId } = req.ctx;
      if (!userId) {
        return res.status(400).json({message: "Please login" });
      }
      const polls = await pollService.findPollByUserId(userId);
      if (polls) {
        return res.status(200).json(createResponseObject("Get Polls successfully", polls, null));
      } 
    } catch (e){
      return res.status(500).json({ message: "Internal server" });
    }
  }

  async getAllPolls(req, res) {
    try {
      const polls = await pollService.findAll();

      if (polls) {
        return res.status(200).json(createResponseObject("Get Polls successfully", polls, null));
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }

  async getPollDetail(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.ctx;
      const poll = await pollService.findOne(id);

      if (!poll) {
        return res.status(400).json(createResponseObject("Poll is not exist", null, "Bad request"));
      }

      const candidates = await pollService.findCandidateByPollId(id);
      const joiner = candidates.some(candidate => candidate.id === userId);
      if (!joiner) {
        return res.status(403).json(createResponseObject("User does not have permission to join this poll", null, "permission"));
      }

      let pollDetails;
      if (userId === poll.creatorId ) {
        pollDetails = await pollService.findPollDetailForPollAdmin(id);
      } else {
        pollDetails = await pollService.findPollDetailForUser(id, userId);
      }
    
      if (!joiner) {
        return res.status(403).json(createResponseObject("User does not have permission to join this poll", null, "permission"));
      }
      if (polls) {
        return res.status(200).json(createResponseObject("Get Polls detail successfully", polls, null));
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  };

};

module.exports = new pollController();
