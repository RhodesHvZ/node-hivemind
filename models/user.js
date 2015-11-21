
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  name: String,
  surname: String,
  avatar: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    autopopulate: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: false,
    required: true
  },
  superuser: {
    type: Boolean,
    default: false,
    required: true
  },
  last_login: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  messages: [{
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seen: {
      type: Boolean,
      default: false,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    msg: String
  }],
  notifications: [{
    // TODO
  }]
})

schema.plugin(autopopulate)

schema.virtual('fullname').get(function () {
  return `${this.name} ${this.surname}`
})

module.exports = mongoose.model('User', schema)
