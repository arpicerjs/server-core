const Server = require('@skuyjs/http-server');
const procedure = require('./procedure');

const server = new Server();
let rootURL = '/';


/**
 * Set root URL for the server
 * @param {string} path - The path of root URL
*/
const setRoot = (path) => {
  rootURL = path;
};

server.use((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
});

/**
 * Handle request by match and execute procedure
 * @param {int} req - The request object
 * @param {function} res - The response object
*/
const matchProcedure = async (req, res) => {
  const { call, parameters } = JSON.parse(req.body);

  if (!procedure.exists(call)) {
    return res.status(500).json(`procedure "${call}" is undefined.`);
  }

  procedure.callHook('beforeCall', call, parameters);

  try {
    let result = await procedure.call(call, parameters);
    return res.json(JSON.stringify(result));
  } catch (error) {
    return res.status(500).json(JSON.stringify(error));
  }
};

/**
 * Listening
 * @param {int} port - The port of HTTP server
 * @param {function} callback - The callback
 *
 * @return {any} The callback return value
*/
const listen = (port, callback) => {
  server.post(rootURL, matchProcedure);
  server.listen(port, callback);
};

module.exports = {
  setRoot,
  listen,
};
