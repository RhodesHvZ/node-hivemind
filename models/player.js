
var mongoose = require('mongoose')
var autopopulate = require('mongoose-autopopulate')
var Schema = mongoose.Schema
var bite_code_generator = require('../lib/bite_codes').generator

var schema = new Schema({
  _user: {
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
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  bite_code: {
    type: String,
    required: true,
    default: bite_code_generator
  },
  last_words: String
})

schema.plugin(autopopulate)

schema.index({ '_game.start_date': -1, '_user.surname': 1, '_user.name': 1 })
schema.index({ _user: 1, _game: 1 }, { unique: true })
schema.index({ _game: 1, bite_code: 1 }, { unique: true })

schema.virtual('status').get(function () {

})

module.exports = mongoose.model('Player', schema)
