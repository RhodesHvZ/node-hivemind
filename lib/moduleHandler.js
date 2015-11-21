var fs = require('fs')
var path = require('path')

module.exports = function (server, paths, callback) {
  server.registerModules = function (modules, callback) {
    var plugins = []

    modules.forEach(function (jsModule) {
      var isDirectory = false

      try {
        isDirectory = fs.lstatSync(jsModule).isDirectory()
      } catch (e) { }

      if (isDirectory) {
        var modules = fs.readdirSync(jsModule)

        modules.forEach(function (mod) {
          if (path.extname(mod) === '.js' && path.basename(mod) !== 'index.js') {
            plugins.push({
              register: require(path.join(jsModule, mod))
            })
          }
        })
      } else {
        plugins.push({
          register: require(jsModule + '.js')
        })
      }
    })
    // server.register(plugins, function(err) {
    //   callback(err)
    // })
  }

  server.registerModules(paths, callback)
}

