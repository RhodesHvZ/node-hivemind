/**
 * Configuration Dependencies
 */

var cwd = process.cwd()
var path = require('path')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var settings = require('./settings')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var logger = require('./logger')(settings.loggers)
var express = require('express')
var anvil = require('./anvil')
var restify = require('./restify')
mongoose.connect(settings.mongo)
var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection })

module.exports = function (server) {
  /**
   * Disable default header
   */

  server.disable('x-powered-by')

  /**
   * Method Override
   */

  server.use(methodOverride())

  /**
   * Request Parsing
   */

  server.use(cookieParser(settings.secrets.cookie_secret))
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())

  /**
   * Settings
   */

  Object.keys(settings).forEach(function (key) {
    server.set(key, settings[key])
  })

  /**
   * Anvil
   */

  server.anvil = anvil(server)

  /**
   * DB
   */

  server.db = mongoose.connection

  /**
   * Express Session
   */

  if (process.env.NODE_ENV === 'production') {
    server.use(session({
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      secret: server.settings.secrets.session_secret,
      proxy: true,
      cookie: {
        secure: true
      }
    }))
  } else {
    server.use(session({
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      secret: server.settings.secrets.session_secret
    }))
  }

  /**
   * Restify
   */

  restify(server)

  /**
   * Logger
   */

  server.use(logger)

  /**
   * Static Files
   */

  server.use(express.static(path.join(cwd, 'public')))
  server.use('/bower_components', express.static(path.join(cwd, 'bower_components')))
}
