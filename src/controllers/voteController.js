const voteService = require("../services/voteService");
const { verifyToken } = require('../middlewares/auth');
const jwt = require("jsonwebtoken");
import { createResponseObject } from '../../utils/response.js';

module.exports = class candidateController {
  async createVote(req, res) {
    try {
      const info = req.body;
      const token = verifyToken(req, res);
      const { userId } = jwt.decode(token);

      if (!userId) {
        return res.status(400).json({message: "Please login" });
      } else {
        info.userId = userId;
      }
      if (!info.userId && !info.pollId && !info.candidateId) {
        return res
          .status(400)
          .json(createResponseObject("Please enter full information", null, "Bad request" ));
      }
      const checkExistedVote = await voteService.default.instance.checkExistedVote(info);
      if (checkExistedVote) {
       return res.status(400).json(createResponseObject("Vote is created successfully", null, null ));
      }
      const vote = await voteService.default.instance.create(info);

      if (vote) {
        return res.status(200).json();
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  };
  async getVotesByPollId(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({message: "Bad request" });
      } 
      const votes = await voteService.default.instance.findAllByPollId(id);
      if (votes) {
        return res.status(200).json(createResponseObject("200 OK ", votes, null));
      } else {
        return res.status(400).json(createResponseObject("Poll is not existed", null, "Bad request"));
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
