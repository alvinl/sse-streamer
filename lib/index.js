
/**
 * Export `sseStream`
 */

module.exports = SseStream;

/**
 * Initiates a SSE stream
 *
 * @param {object} req Request object
 * @param {object} res Response object
 * @class
 */
function SseStream (req, res) {

  if (!(this instanceof SseStream))
    return new SseStream(req, res);

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
 * @param {Object}   payload Data to be sent as an event
 * @param {Function} cb      Optional callback
 */
SseStream.prototype.send = function (payload, cb) {

  var res = this.res;

  if (typeof payload !== 'object') {

    if (cb)
      return cb(new TypeError('Argument must be an Object'));

    throw new TypeError('Argument must be an Object');

  }

  var events = Object.keys(payload).map(function (event) {

     var eventKey = payload[event];

     if (typeof(eventKey) === 'object') {

      try {

        eventKey = JSON.stringify(eventKey);

      } catch (err) {

        if (cb)
          return cb(err);

        throw new Error(err);

      }

     }

     return event + ':' + eventKey + '\n';

  }).join('') + '\n';

  res.write(events);

  if (cb)
    return cb();

};
