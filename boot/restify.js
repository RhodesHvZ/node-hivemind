
var restify = require('express-restify-mongoose')
var User = require('../models/user')
var Org = require('../models/org')
var File = require('../models/file_manager')
var Game = require('../models/game')
var Player = require('../models/player')
var Squad = require('../models/squad')
var Event = require('../models/event')
var SquadEvent = require('../models/squad_event')
var PlayerChat = require('../models/playerchat')
var UserChat = require('../models/userchat')
var Ticket = require('../models/ticket')

module.exports = function (server) {
  restify.defaults({
    onError: function (err, req, res, next) {
      req.log.error(err)
      res.status(500).json({
        error: err.error || err.message || err.name,
        error_description: err.error_description || err.description || err.message,
        error_uri: err.error_uri
      })
    }
  })

  restify.serve(server, User, {
    preMiddleware: server.anvil.verifier()
  })

  restify.serve(server, Org, {
  })

  restify.serve(server, File, {
  })

  restify.serve(server, Game, {
  })

  restify.serve(server, Player, {
  })

  restify.serve(server, Squad, {
  })

  restify.serve(server, Event, {
  })

  restify.serve(server, SquadEvent, {
  })

  restify.serve(server, PlayerChat, {
  })

  restify.serve(server, UserChat, {
  })

  restify.serve(server, Ticket, {
  })
}
