const pollService = require("../services/pollService");

module.exports = class pollController {
  async createPoll(req, res) {
    try {
      const info = req.body;
      if (!info.name || !info.teamSize || !info.majorId) {
        return res
          .status(400)
          .json({ message: "Please enter full information" });
      }

      if (!info.description) {
        info.description = null;
      }

      const poll = await pollService.default.instance.create(info);

      if (poll) {
        return res.status(200).json({ message: "Create Poll sucessfully" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
