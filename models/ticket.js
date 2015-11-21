
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  _game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
    autopopulate: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  },
  subject: {
    type: String,
    required: true
  },
  tags: [String],
  replies: [{
    attachment: {
      type: Schema.Types.ObjectId,
      ref: 'File',
      autopopulate: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true
    },
    event: [{
      eventType: {
        type: String,
        required: true
      },
      value: String
    }],
    msg: String
  }]
})

schema.plugin(autopopulate)

schema.index({ _game: 1, 'replies.timestamp': -1 })
schema.index({ _game: 1, name: 1 })

schema.virtual('static_path').get(function () {
  // TODO
})

module.exports = mongoose.model('Ticket', schema)
