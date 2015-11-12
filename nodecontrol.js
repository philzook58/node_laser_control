var http = require('http');

var requestTime = 100;
var multiplier = 100;
var port = "/dev/ttyUSB0"

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort(port, {
  baudrate: 9600
});



function sendRequest(){
http.get({
       host: '45.55.243.197',
       path: '/location'
   }, function(response) {
       // Continuously update stream with data
       var body = '';
       response.on('data', function(d) {
           body += d;
       });
       response.on('end', function() {

           // Data reception is done, do whatever with it!
           var parsed = JSON.parse(body);
           console.log(parsed);
           var x = floor((parsed.x - 0.5) * 2 * multiplier);
           var y = floor((parsed.y - 0.5) * 2 * multiplier);
           console.log(x);
           serialPort.write(x + "x\r\n" + y + "y\r\n", function(err, results) {

           });

       });
   });
 }


 serialPort.open(function (error) {
   if ( error ) {
     console.log('failed to open: ' + error);
   } else {
     setInterval(sendRequest, requestTime);
     console.log('open');


   }
 });
