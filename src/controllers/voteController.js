const voteService = require("../services/voteService");
const { verifyToken } = require('../middlewares/auth');
const jwt = require("jsonwebtoken");
module.exports = class candidateController {
  async createVote(req, res) {
    try {
      const info = req.body;
      const token = verifyToken(req, res);
      const { userId } = jwt.decode(token);

      if (!userId) {
        return res.status(400).json({ message: "Please login" });
      } else {
        info.userId = userId;
      }
      if (!info.userId && !info.pollId && !info.candidateId) {
        return res
          .status(400)
          .json({ message: "Please enter full information" });
      }
      const checkExistedVote = await voteService.default.instance.checkExistedVote(info);
      if (checkExistedVote) {
       return res.status(400).json({ message: "Vote has been created" });
      }
      const vote = await voteService.default.instance.create(info);

      if (vote) {
        return res.status(200).json({ message: "Create vote sucessfully" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
