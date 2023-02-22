const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });

    if (user) {
      return res.status(400).json({
        message: "user already exits",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (bcrypt.compare(password, user.password)) {
      res.status(200).json({
        message: "login success",
      });
    } else {
      res.status(400).json({
        message: "wrong password",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = {
  signup,
  login,
};
