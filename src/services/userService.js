<<<<<<< HEAD
const userModel = require('../models/userModel');
=======
const userModel = require('../../models/userModel');
>>>>>>> 1c264da389618e84e9e34a79af6855ddfc84784f

exports.getUserById = async (userId) => {
  const user = await userModel.findById(userId);
  return user;
};

exports.createUser = async (userData) => {
  const user = await userModel.create(userData);
  return user;
};