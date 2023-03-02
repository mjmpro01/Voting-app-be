const userService = require('../services/userService');

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  res.send(user);
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await userService.createUser({ name, email });
  res.send(user);
};