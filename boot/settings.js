var cwd = process.cwd()
var env = process.env.NODE_ENV || 'development'
var crypto = require('crypto')
var path = require('path')
var fs = require('fs')
var pkg = require(path.join(cwd, 'package.json'))
var secrets_path = path.join(cwd, 'config', 'secrets.json')
var logger_path = path.join(cwd, 'config', 'logger.json')
var secrets = secrets_path
var logger = logger_path
var settings = {}

/**
 * Load secrets
 */

try {
  secrets = require(secrets)
} catch (e) {
  console.log('No secrets file detected. Generating new secrets.')
  secrets = {
    mongo_addr: 'localhost',
    mongo_port: 27017,
    cookie_secret: crypto.randomBytes(64).toString('hex'),
    session_secret: crypto.randomBytes(64).toString('hex'),
    anvil: {
      issuer: 'http://localhost:3000',
      client_id: 'YOUR_CLIENT_ID_HERE',
      client_secret: 'YOUR_CLIENT_SECRET_HERE'
    }
  }
  fs.writeFile(secrets_path, JSON.stringify(secrets, null, 2), function (err) {
    if (err) {
      return console.log(err.stack)
    } else {
      console.log('Mischief managed.')
    }
    console.log('Server shutting down. Please check config/secrets.json before starting the server again.')
    process.exit(0)
  })
}
settings.secrets = secrets

/**
 * Load logger settings
 */

try {
  logger = require(logger)
} catch (e) {
  console.log('No logger settings file detected. Using defaults.')
  logger = {
    streams: ['msg', 'file']
  }
  fs.writeFile(logger_path, JSON.stringify(logger, null, 2), function (err) {
    if (err) {
      return console.log(err.stack)
    } else {
      console.log('Logger settings file created.')
    }
  })
}
settings.loggers = logger

/**
 * Anvil
 */

/**
 * Mongoose Settings
 */

settings.mongo = `mongodb://${secrets.mongo_addr}${secrets.mongo_port !== 27017 ? ':' + secrets.mongo_port : ''}/${env}`

/**
 * Version
 */

settings.version = pkg.version

/**
 * Port
 */

settings.port = process.env.PORT || settings.port || 3000

/**
 * Export
 */

module.exports = settings
