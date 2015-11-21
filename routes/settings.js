
module.exports = function (server) {
  server.get('/settings', function (req, res) {
    res.send('<pre>' + JSON.stringify(server.settings, null, 2) + '</pre>')
  })
}
