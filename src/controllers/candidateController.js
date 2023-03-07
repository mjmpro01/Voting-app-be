const candidateService = require("../services/candidateService");
import { createResponseObject } from '../../utils/response.js';

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
      const existedCandidate = await candidateService.default.instance.findByName(info.name);
      if (existedCandidate) {
        return res.status(400).json(createResponseObject("Candidate is existed", null, "Bad request"));
      }
      const candidate = await candidateService.default.instance.create(info);

      if (candidate) {
        return res.status(200).json(createResponseObject("Create candidate successfully", null, null));
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server" });
    }
  }
};
