
/**
 * Export `sseStream`
 */

module.exports = sseStream;

/**
 * Initiates a SSE stream
 * 
 * @param  {object} req 
 * @param  {object} res
 */

function sseStream (req, res) {

  this.res = res;

  req.socket.setTimeout(0);

  res.writeHead(200, {

    'Content-Type':  'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection':    'keep-alive'

  });

}


/**
 * Parses and sends a SSE
 * 
 * @param  {Object}   payload Data to be sent as an event
 * @param  {Function} cb      Optional callback
 */

sseStream.prototype.send = function (payload, cb) {

  var res          = this.res,
      typeErrorMsg = 'Argument must be an Object';

  if (typeof(payload) !== 'object') {

    if (cb) return cb(new TypeError(typeErrorMsg));

    throw new TypeError(typeErrorMsg);

  }

  var eventKeys = Object.keys(payload);
  
  var events = eventKeys.map(function (event) {
  
     var eventKey = payload[event];

     if (typeof(eventKey) === 'object') {

      try {

        eventKey = JSON.stringify(eventKey);

      } catch (err) {

        if (cb) return cb(err);

        throw new Error(err);

      }

     }

     return event + ':' + eventKey + '\n';
  
  }).join('') + '\n';

  res.write(events);

  if (cb) return cb();

};
