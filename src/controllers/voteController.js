const voteService = require("../services/voteService");
const pollService = require("../services/pollService");
import { createResponseObject } from '../../utils/response.js';
 class VoteController {
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
  async createVote(req, res) {
    try {
      const info = req.body;
      const { id } = req.params; 
      const { userId } = req.ctx;
      let data = {};

      if (!id) {
        return res
          .status(400)
          .json(createResponseObject("Please enter full information", null, "Bad request" ));
      }

      const poll = await pollService.findOne(id);
      if (!poll) {
        return res
          .status(400)
          .json(createResponseObject("Poll is not existed", null, "Bad request" ));
      } 
      // check users have permission to vote
      const vote = await voteService.findOneByPollId_UserId(id, userId);

      if (!vote) {
        return res
          .status(403)
          .json(createResponseObject("User does not permission to vote", null, "Bad request" ));
      }

      if (vote.vote) {
        return res
          .status(400)
          .json(createResponseObject("You already voted for this poll", null, "Bad request" ));
      }

      const { count } = await pollService.countUserJoinedPoll(id);
      
      for (const userId of info.vote) {
        const candidate = await voteService.findOneByPollId_UserId(id, userId);
        if (!candidate) {
          return res
          .status(400)
          .json(createResponseObject(`This candidate: ${userId} does not exist in poll`, null, "Bad request" ));
        }
      }
    
      if (info.vote.length !== Math.floor(0.8 * count)) {
        return res
        .status(400)
        .json(createResponseObject(`Number of candidate is wrong, must be ${Math.floor(0.8 * count)} vote`, null, "Bad request" ));
      }

      await voteService.updateVote(vote.id, JSON.stringify(info.vote));
      const updatedVotes = await voteService.findVoteDetail(id, vote.id);
      data.id = vote.id;
      let votes = [];
      for (const updatedVote of updatedVotes) {
        const voter = {
          id: updatedVote.id,
          name: updatedVote.username,
          email: updatedVote.email
        };
        let candidate = {
          id: updatedVote.candidateid,
          name: updatedVote.candidatename,
          email: updatedVote.candidateemail
        }; 
        votes.push({voter,candidate});
      }
      data.votes = votes;
      return res.status(200).json(createResponseObject("You voted successfully", data, null));
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
module.exports = new VoteController();
