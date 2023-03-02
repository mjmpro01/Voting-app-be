const userModel = require('../models/userModel');

exports.getUserById = async (userId) => {
  const user = await userModel.findById(userId);
  return user;
};

exports.createUser = async (userData) => {
  const user = await userModel.create(userData);
  return user;
};