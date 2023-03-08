const voteService = require("../services/voteService");
const candidateService = require("../services/candidateService");
const { verifyToken } = require('../middlewares/auth');
const jwt = require("jsonwebtoken");
import { createResponseObject } from '../../utils/response.js';
const PollService = require('../services/pollService');

module.exports = class candidateController {
  async createVote(req, res) {
    try {
      const info = req.body;
      const token = verifyToken(req, res);
      const { userId } = jwt.decode(token);

      if (!userId) {
        return res.status(400).json({message: "Please login" });
      }
      if (!userId && !info.pollId && !info.candidateIds) {
        return res
          .status(400)
          .json(createResponseObject("Please enter full information", null, "Bad request" ));
      }

      // check user have permission vote for that poll
      const userPermission =  await candidateService.default.instance.checkCandidateExistedByUserId_PollId(userId, info.pollId);
      if (!userPermission) {
        return res.status(400).json(createResponseObject(`User does not have permission to vote in poll ${info.pollId}`, null, "Bad request"));
      }

      // check poll 
      const poll = await PollService.default.instance.findOne(info.pollId);
      if (!poll) {
        return res.status(400).json(createResponseObject("Poll is not existed", null, "Bad request"));
      }

      let teamSize;
      teamSize = poll.teamSize;
      
      // check condition teamSize to vote
      if (info.candidateIds.length !== Math.floor(0.8 * teamSize)) {
        return res.status(400).json(createResponseObject("User need to choose the right number of candidates", null, "Bad request"));
      }

      const candidateIds = info.candidateIds;
      for (const candidateId of candidateIds ) {
        // get info user by candidateId
        const candidate = await candidateService.default.instance.findOne(candidateId);

        // check candidates have exist in poll
        const existCandidate = await candidateService.default.instance.checkCandidateExistedByUserId_PollId(candidate.userId, info.pollId);
        if (!existCandidate) {
          return res.status(400).json(createResponseObject(`This candidate does not exist in poll: id:${candidate.id}`, null, "Bad request" ));
        }

        const checkExistedVote = await voteService.default.instance.checkExistedVote(userId, info.pollId, candidateId);
        if (checkExistedVote) {
          return res.status(400).json(createResponseObject(`Vote is existed with candidate: ${candidateId} `, null, "Bad request" ));
        }
      };

      candidateIds.map(async (candidateId) => {
        await voteService.default.instance.create(userId, info.pollId, candidateId);
      })
      
      return res.status(200).json(createResponseObject("Vote successfully", null, null));
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  };
  async getVotesByPollId(req, res) {
    try {
      const { id } = req.params;
      console.log("🚀 ~ file: voteController.js:73 ~ candidateController ~ getVotesByPollId ~ id:", id)
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
