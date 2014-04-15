
var request     = require('supertest'),
    express     = require('express'),
    should      = require('should'),
    sseStreamer = require('../');
    
describe('sseStreamer', function () {

  it('should should fail with invalid args (using callback)', function (done) {
  
    var app = express();

    app.get('/stream', function (req, res) {
    
      var sseStream = new sseStreamer(req, res); 

      sseStream.send(1, function (err) {
      
        should.exist(err);
        return done();
      
      });

    });

    request(app)
      .get('/stream')
      .end(function (err, res) {
      
        should.not.exist(err);
      
      });
  
  });

  it('should should fail with invalid args (no callback)', function (done) {
  
    var app = express();

    app.get('/stream', function (req, res) {
    
      var sseStream = new sseStreamer(req, res); 

      sseStream.send(1);

    });

    request(app)
      .get('/stream')
      .end(function (err, res) {
      
        should.exist(err);
        return done();
      
      });
  
  });

  it('should pass with valid args (using callback)', function (done) {
  
    var app = express();

    app.get('/stream', function (req, res) {
    
      var sseStream = new sseStreamer(req, res); 

      sseStream.send({ data: 'Hello!' }, function (err) {
      
        should.not.exist(err);
        return res.end(); 
      
      });

    });

    request(app)
      .get('/stream')
      .end(function (err, res) {
      
        should.not.exist(err);
        res.text.should.equal('data:Hello!\n\n');
        res.headers.should.have.property('content-type', 'text/event-stream');
        return done();

      });
  
  });

  it('should pass with valid args (no callback)', function (done) {
  
    var app  = express(),
        date = Date.now();

    app.get('/stream', function (req, res) {
    
      var sseStream = new sseStreamer(req, res); 

      sseStream.send({ data: 'Hello!', id: date });
      return res.end();
      
    });

    request(app)
      .get('/stream')
      .end(function (err, res) {
      
        should.not.exist(err);
        res.text.should.equal('data:Hello!\nid:' + date + '\n\n');
        res.headers.should.have.property('content-type', 'text/event-stream');
        return done();

      });
  
  });

});