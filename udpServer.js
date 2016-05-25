var PORT = 6000;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var fs = require('fs');
var server = dgram.createSocket('udp4');
var moment = require('moment');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    var str = decoder.write(message);
    var arr = str.split("_");
    var time = moment().format("x");//Unix ms timestamp
    console.log(time);
    console.log("[" + time +"]" + " X: " + arr[0] + " Y: " + arr[1] + " Z: " + arr[2]);
    var stream = fs.createWriteStream("data.tsv", {'flags': 'a'});
    stream.once('open', function(fd) {
     stream.write(time + "_" +message + "\n");
    });

});

server.bind(PORT, HOST);
