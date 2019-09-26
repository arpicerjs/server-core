const procedure = require('./lib/procedure')
const server = require('./lib/server')

module.exports = {
  def: procedure.def,
  beforeCall: procedure.beforeCall,
  listen: server.listen,
};
