
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  chatter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  },
  _game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
    autopopulate: true
  },
  chat: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  msg: String
})

schema.plugin(autopopulate)

schema.index({ _game: 1, chat: 1, timestamp: -1 })

module.exports = mongoose.model('UserChat', schema)
