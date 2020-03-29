const procedure = require('./lib/procedure')
const server = require('./lib/server')

procedure.def('beforeCall', () => {});

module.exports = {
  inject: procedure.inject,
  def: procedure.def,
  beforeCall: procedure.beforeCall,
  listen: server.listen,
};
