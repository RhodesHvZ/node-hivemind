
var router = require('express').Router()
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
  restify.serve(router, User, {
    // middleware: server.anvil.verify({ scope: 'scope' })
  })

  restify.serve(router, Org, {
  })

  restify.serve(router, File, {
  })

  restify.serve(router, Game, {
  })

  restify.serve(router, Player, {
  })

  restify.serve(router, Squad, {
  })

  restify.serve(router, Event, {
  })

  restify.serve(router, SquadEvent, {
  })

  restify.serve(router, PlayerChat, {
  })

  restify.serve(router, UserChat, {
  })

  restify.serve(router, Ticket, {
  })

  server.use(router)
}
