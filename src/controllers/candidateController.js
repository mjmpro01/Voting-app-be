const candidateService = require("../services/candidateService");

module.exports = class candidateController {
  async createCandidate(req, res) {
    try {
      const info = req.body;
      if (!info.name) {
        return res
          .status(400)
          .json({ message: "Please enter full information" });
      }

      if (!info.description) {
        info.description = null;
      }

      const candidate = await candidateService.default.instance.create(info);

      if (candidate) {
        return res.status(200).json({ message: "Create candidate sucessfully" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
