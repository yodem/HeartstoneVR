const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = function(req, res){
    var username = req.query.username;
    var password = req.query.password;
    console.log(player.findPlayer(username, password, Player));
    if (player.findPlayer(username, password, Player) == true) {
      res.json({
        text: '{status:"logged in"}'
      });
    } else {
      res.json({
        text: '{status:"logged in"}'
      });
    }
};

exports.register = function(req, res) {
  //get user register data
  var username = req.body[0].value;
  var password = req.body[1].value
  var playerName = req.body[2].value
  createPlayer.createPlayer(username, password, playerName, Player)
};

exports.join = function(req, res) {
  var gameId = req.body[0].value;
  console.log(gameId);
  res.send(gameId)
};

exports.join = function(req, res) {
  var event = req.body.event;
  state.event.push(event);
  res.send('{"status":"event"}');
};