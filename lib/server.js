const http = require('http');
const procedure = require('./procedure');

/**
 * Get data from request body
 * @param {object} req - The request object
 * @param {function} callback - The callback for HTTP request data
*/
const getData = (req, callback=()=>{}) => {
  let data = ''
  req.on('data', chunk => {
    data += chunk.toString();
  })
  req.on('end', async () => {
    data = JSON.parse(data);
    await callback(data);
  })
};

const server = http.createServer(async (req, res) => {
  await getData(req, async (data) => {
    if (procedure.exists(data.call)) {
      procedure.callHook('beforeCall', data.call, data.parameters);
  
      const result = await procedure.call(data.call, data.parameters);
  
      res.end(JSON.stringify(result));
    } else {
      throw Error(`Procedure "${data.call}" is undefined.`);
    }
  });
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
