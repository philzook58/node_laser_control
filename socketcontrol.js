var http = require('http');
var socket = require('socket.io-client')('http://45.55.243.297');
var multiplier = 100;
var fs = require('fs');
var port = "/dev/ttyACM0"
var mystream = fs.createWriteStream(port,{flags:'w'});

socket.on('connect', function(){});

socket.on('broadcast pos', function(data){
  console.log(data)
  var x = (data.x - 0.5) * 2 * multiplier;
  var y = (data.y - 0.5) * 2 * multiplier;
  mystream.write(x+','+y+";");
});

/*
writePos1();
function writePos1() {
  mystream.write(3+','+3+";");
  setInterval(writePos2, 100);
}

function writePos2() {
  mystream.write(0+','+0+";");
  setInterval(writePos1, 100);
}
*/
