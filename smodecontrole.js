var http = require('http');

var requestTime = 200;
var multiplier = 30;
var port = "/dev/ttyACM0"
/*
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort(port, {
  baudrate: 19200
});
*/
var fs = require('fs');
var mystream = fs.createWriteStream(port,{flags:'w'});

function sendRequest(){
http.get({
       host: '45.55.243.197',
       path: '/location',
       timeout: 1000
   }, function(response) {
       // Continuously update stream with data
       var body = '';
       response.on('data', function(d) {
           body += d;
       });
       response.on('end', function() {

           // Data reception is done, do whatever with it!
           var parsed = JSON.parse(body);
           //console.log(parsed);
           var x = (parsed.x - 0.5) *2 * multiplier;
           var y = (parsed.y - 0.5) *2 * multiplier;
           //console.log(x);
           //process.stdout.write(x + "," + y + ";");
           mystream.write(x+','+y+";");
           //console.log(x+","+y+";");
       });
   });
 }


setInterval(sendRequest, requestTime);

