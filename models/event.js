
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
    autopopulate: true
  },
  from: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    autopopulate: true
  }],
  _admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  event: [String]
})

schema.plugin(autopopulate)

schema.index({ _game: 1, timestamp: -1 })
schema.index({ _game: 1, to: 1, timestamp: -1 })
schema.index({ _game: 1, from: 1, timestamp: -1 })

module.exports = mongoose.model('Event', schema)
