
module.exports = function (server) {
  server.get('/session', function (req, res) {
    if (req.session.views) {
      req.session.views++
      res.write(`<h1>Welcome ${req.session.id}</h1>`)
      res.write(`<p>Views: ${req.session.views}</p>`)
      res.end()
    } else {
      req.session.views = 1
      res.write(`<h1>Welcome ${req.session.id}</h1>`)
      res.end('<p>Welcome to the session demo. refresh to see what happens!</p>')
    }
  })
}
