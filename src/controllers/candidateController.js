const candidateService = require("../services/candidateService");
const pollService = require("../services/pollService");
const userService = require("../services/userService");

import { createResponseObject } from "../../utils/response.js";

module.exports = class candidateController {
  async createCandidate(req, res) {
    try {
      const info = req.body;
      if (!info.userId || !info.pollId) {
        return res
          .status(400)
          .json({ message: "Please enter full information" });
      }

      if (!info.description) {
        info.description = null;
      }
     
      // check poll
      const existedPoll = await pollService.default.instance.findOne(
        info.pollId
      );
      if (!existedPoll) {
        return res
          .status(400)
          .json(
            createResponseObject("Poll is not existed", null, "Bad request")
          );
      }
      // check number of candidate of recent poll
      const teamSize = existedPoll.teamSize
      const countCandidate = await candidateService.default.instance.countCandidateByPollId(info.pollId);
      
      if (countCandidate >= teamSize) {
        res.status(400).json(createResponseObject("Poll is enough number of candidates", null, "Bad request"));
      }
      
      // check candidate have in database
      const existedUser = await userService.default.instance.findOneRoleUser(
        info.userId
      );
      if (!existedUser) {
        return res
          .status(400)
          .json(
            createResponseObject("User is not existed", null, "Bad request")
          );
      }

      const existedCandidate =
        await candidateService.default.instance.checkCandidateExistedByUserId_PollId(
          info.userId,
          info.pollId
        );
      if (existedCandidate) {
        return res
          .status(400)
          .json(
            createResponseObject("Candidate is existed", null, "Bad request")
          );
      }

      const candidate = await candidateService.default.instance.create(info);

      if (candidate) {
        return res
          .status(200)
          .json(
            createResponseObject("Create candidate successfully", null, null)
          );
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
  async getAllCandidateOfPoll(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Bad request" });
      }
      const existedPoll = await pollService.default.instance.findOne(id);
      if (!existedPoll) {
        return res
          .status(400)
          .json(
            createResponseObject("Poll is not existed", null, "Bad request")
          );
      }
      const candidates =
        await candidateService.default.instance.findCandidateByPollId(id);
      if (candidates) {
        return res
          .status(200)
          .json(
            createResponseObject(
              `get All candidates of pool ${id}`,
              candidates,
              null
            )
          );
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
