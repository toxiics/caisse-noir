const db = require("../models");
const Team = db.team;

exports.allAccess = (req, res) => {
  Team.find({}).exec((err, teams) => {
    res.status(200).send(teams)
  })
};

exports.teamBoard = (req, res) => {
  Team.findOne({
      id: req.teamId
    })
    .populate("users", "-__v")
    .exec((err, team) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }
      if (!team) {
        return res.status(404).send({
          message: "Team Not found."
        });
      }

      res.status(200).send({
        id: team._id,
        name: team.name,
        users: team.users
      });
    });
};

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };

exports.deleteTeam = (req, res) => {
  if (req.userId) {
    Team.deleteOne({
      id: req.userId
    }, err => {
      if (err) {
        res.status(500).send({
          message: err + " : user not deleted"
        });
        return;
      }

      res.status(200).send({
        message: "Team was deleted successfully!",
        code: 200
      });
    })
  }
};
