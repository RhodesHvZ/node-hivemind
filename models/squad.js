
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  _game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
    autopopulate: true
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
    autopopulate: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    autopopulate: true
  }],
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    autopopulate: true
  }],
  faction: {
    type: String,
    default: 'human',
    enum: {
      values: 'human zombie'.split(' '),
      message: 'faction has to be either human or zombie'
    },
    required: true
  }
})

schema.plugin(autopopulate)

schema.index({ _game: 1, name: 1 }, { unique: true })

module.exports = mongoose.model('Squad', schema)
