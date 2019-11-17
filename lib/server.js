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
  });
  req.on('end', async () => {
    try {
      data = JSON.parse(data);
    } catch (e) {
      throw Error(`Cannot decode request body.`);
    }
    await callback(data);
  });
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  await getData(req, async (data) => {
    if (procedure.exists(data.call)) {
      procedure.callHook('beforeCall', data.call, data.parameters);
  
      let result = await procedure.call(data.call, data.parameters);

      if (typeof result === 'object') {
        result = JSON.stringify(result);
      }

      res.end(Buffer.from(result));
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
