const voteService = require("../services/voteService");
const pollService = require("../services/pollService");
import { createResponseObject } from '../../utils/response.js';
 class VoteController {
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
  async createVote(req, res) {
    try {
      const info = req.body;
      const { userId } = req.ctx;

      if (!info.pollId) {
        return res
          .status(400)
          .json(createResponseObject("Please enter full information", null, "Bad request" ));
      }
      // check users have permission to vote
      const vote = await voteService.findOneByPollId_UserId(info.pollId, userId);

      if (!vote) {
        return res
          .status(403)
          .json(createResponseObject("User does not permission to vote", null, "Bad request" ));
      }

      const poll = await pollService.findOne(info.pollId);
      if (!poll) {
        return res
          .status(400)
          .json(createResponseObject("Poll is not existed", null, "Bad request" ));
      } 

      const { count } = await pollService.countUserJoinedPoll(info.pollId);
      
      const voteUsers = JSON.parse(info.vote);

      for (const userId of voteUsers) {
        const candidate = await voteService.findOneByPollId_UserId(info.pollId, userId);
        if (!candidate) {
          return res
          .status(400)
          .json(createResponseObject(`This candidate: ${userId} does not exist in poll`, null, "Bad request" ));
        }
      }
    
      if (voteUsers.length !== Math.floor(0.8 * count)) {
        return res
        .status(400)
        .json(createResponseObject("You need to vote enough number of candidates", null, "Bad request" ));
      }

      await voteService.updateVote(vote.id, info.vote);
      return res.status(200).json(createResponseObject(" Vote is updated successfully ", null, null));
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
module.exports = new VoteController();
