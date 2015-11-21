
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema

var schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
    /*
    validate: {
      validator: function (item) {
        return item.test() // Boolean result
      },
      message: '{VALUE} is not valid'
    }
    */
  },
  logo: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    autopopulate: true
  }
})

schema.plugin(autopopulate)

module.exports = mongoose.model('Organisation', schema)
