'use strict';

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.ObjectId;

/*
 * Game Schema
 */
const gameSchema = new mongoose.Schema({
  players: [{type: ObjectId, ref: 'Player'}],
  available: {type: Boolean, default: true}
})

gameSchema.methods = {

  //join game method, which takes player and add it to the player array
  joinGame: function(player) {
    if (this.players.length >= 0 && this.players.length <= 1) {
      this.players.push(player);
    }
    //if it is the last player, change the game availablity to false
    if (this.players.length == 2) {
      this.set('available', 'false')
    }

  },

  //exit game method, which remove player from the game
  exitGame: function(player) {
    remove(this.players, player);
    this.set('available', 'true');
  },

  remove: function (array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }
}

gameSchema.statics = {
  /**
   * Find game by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function (_id) {
    return this.findOne({ _id })
      .exec();
  },

}

//game model
mongoose.model("Game", gameSchema);
