const Server = require('@hamjs/http-server');
const procedure = require('./procedure');

const server = new Server();

server.use((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
});

server.post('/', async (req, res) => {
  const { call, parameters } = req.body;

  if (procedure.exists(call)) {
    procedure.callHook('beforeCall', call, parameters);

    let result = await procedure.call(call, parameters);
    res.json(result);
  } else {
    throw Error(`Procedure "${data.call}" is undefined.`);
  }

});

/**
 * Listening
 * @param {int} port - The port of HTTP server
 * @param {function} callback - The callback
 *
 * @return {any} The callback return value
*/
const listen = (port, callback) => {
  server.listen(port);

  if (!!callback) {
    return callback();
  }
};

module.exports = {
  listen,
};
