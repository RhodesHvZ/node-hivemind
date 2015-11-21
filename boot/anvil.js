var AnvilConnect = require('anvil-connect-express')

module.exports = function (server) {
  var settings = server.settings.secrets.anvil

  var anvil = new AnvilConnect({
    issuer: settings.issuer,
    client_id: settings.client_id,
    client_secret: settings.client_secret
  })

  return anvil
}
