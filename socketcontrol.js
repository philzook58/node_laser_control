var http = require('http');
var socket = require('socket.io-client')('http://45.55.243.197');
var multiplier = 100;
var fs = require('fs');
var port = "/dev/ttyACM0"
var mystream = fs.createWriteStream(port,{flags:'w'});

socket.on('connect', function(){});

socket.on('broadcast pos', function(data){
  var x = (parsed.x - 0.5) * 2 * multiplier;
  var y = (parsed.y - 0.5) * 2 * multiplier;
  mystream.write(x+','+y+";");
});
