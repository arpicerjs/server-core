const procedure = require('./lib/procedure')
const server = require('./lib/server')

procedure.def('beforeCall', () => {});

module.exports = {
  def: procedure.def,
  beforeCall: procedure.beforeCall,
  listen: server.listen,
};
