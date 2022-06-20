const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  User.find({}).exec((err, users) => {
    res.status(200).send(users)
  })
};

exports.userBoard = (req, res) => {
  User.findOne({
      id: req.userId
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }
      var token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        lastname: user.lastname,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.deleteUser = (req, res) => {
  if (req.userId) {
    User.deleteOne({
      id: req.userId
    }, err => {
      if (err) {
        res.status(500).send({
          message: err + " : user not deleted"
        });
        return;
      }

      res.status(200).send({
        message: "User was deleted successfully!",
        code: 200
      });
    })
  }
};
