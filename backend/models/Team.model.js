var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Team = new Schema({
  name: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

module.exports = Team;
