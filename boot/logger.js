/**
 * Module Dependencies
 */

var cwd = process.cwd()
var env = process.env.NODE_ENV || 'development'
var path = require('path')
var bunyan = require('express-bunyan-logger')
var cardinal = require('cardinal')
var theme = require('cardinal/themes/default')
var stream = require('stream')

/**
 * Log Level Mappings
 */

var log_levels = {
  20: 'DEBUG',
  30: 'INFO',
  40: 'WARN',
  50: 'ERROR'
}

/**
 * Logger default streams
 */

var loggers = {
  msg: {
    stream: new stream.Writable({
      write: function (chunk, encoding, next) {
        chunk = JSON.parse(chunk)
        chunk.level = log_levels[chunk.level] || chunk.level
        console.log(`[${chunk.level}] ${chunk.msg}`)
        next()
      }
    })
  },
  cardinal: {
    stream: new stream.Writable({
      write: function (chunk, encoding, next) {
        chunk = JSON.parse(chunk)
        var text = JSON.stringify({
          msg: chunk.msg,
          level: log_levels[chunk.level] || chunk.level
        }, null, 2)
        console.log(cardinal.highlight(text, {
          json: true,
          theme: theme
        }))
        next()
      }
    })
  },
  file: {
    path: path.join(cwd, 'logs', env + '.log')
  }
}

/**
 * Export
 */

module.exports = function (config) {
  var streams = []
  if (!env.match('/test/i')) {
    config.streams.forEach(function (item) {
      streams.push(loggers[item])
    })
  }

  var logger = bunyan({
    name: 'request',
    streams: streams
  })

  module.exports = logger

  return logger
}

