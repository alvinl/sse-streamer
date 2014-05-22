sse-streamer
============
[![Build Status](https://travis-ci.org/alvinl/sse-streamer.svg?branch=master)](https://travis-ci.org/Alvinlz/sse-streamer)

A helper module for Server-Sent Events

## Install

```
npm install git://github.com/Alvinlz/sse-streamer.git
```

## Example

The following example will send an event every 5 seconds
``` js

var sseStreamer = require('sse-streamer'),
    express     = require('express'),
    app         = express();

var iteration = 0;

app.get('/stream', function (req, res) {

  var sseStream = new sseStreamer(req, res);

  setInterval(function () {
  
    iteration++;
  
    sseStream.send({ data: 'Hello!', event: 'update', id: iteration }); 
  
  }, 5000);

});

app.listen(4000);
```
