
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  _org: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true,
    autopopulate: true
  },
  contextType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  file_name: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
})

schema.plugin(autopopulate)

schema.index({ _org: 1, timestamp: -1, name: 1 })

schema.virtual('static_path').get(function () {
  // TODO
})

module.exports = mongoose.model('File', schema)
