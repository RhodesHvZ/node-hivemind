var express = require('express')
var app = express()

require('./boot/server')(app)

/**
 * Routes
 */

require('./routes/index')(app)
require('./routes/settings')(app)
require('./routes/sessions')(app)
require('./routes/anvil_callback')(app)

/**
 * Start the server
 */

app.start = function () {
  app.listen(app.settings.port, function () {
    console.log('Server started on port %s', app.settings.port)
  })
}

/**
 * Exports
 */

module.exports = app

if (!module.parent) {
  app.start()
}
