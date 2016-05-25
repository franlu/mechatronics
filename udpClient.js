var PORT = 6000;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = new Buffer('-2.004_1.321_2.453');

var client = dgram.createSocket('udp4');

//for (i=0; i< 10; i++) {
  client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
      console.log('UDP message sent to ' + HOST +':'+ PORT);
      client.close();
  });
//}
