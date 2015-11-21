var path = require('path')
var cwd = process.cwd()

module.exports = function (server) {
  server.get('/callback', function (req, res) {
    res.sendFile(path.join(cwd, 'public', 'callback.html'))
  })
}
