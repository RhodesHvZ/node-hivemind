
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  _org: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true,
    autopopulate: true
  },
  _admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  }],

  registration_date: Date,
  start_date: Date,
  end_date: Date,

  rules: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    autopopulate: true
  },

  banner: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    autopopulate: true
  },

  fluff: {
    human: String,
    zombie: String
  },

  announcements: [{
    // TODO
  }]
})

schema.plugin(autopopulate)

schema.index({ name: 1, _org: 1 }, { unique: true })

module.exports = mongoose.model('Game', schema)
