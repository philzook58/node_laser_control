var http = require('http');

var requestTime = 50;
var multiplier = 100;
var port = "/dev/ttyUSB0"

var x = 0;
var y = 0;

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort(port, {
  baudrate: 115200
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
           if (parsed.users > 0) {

             x = (parsed.x - 0.5) *2 * multiplier;
             y = (parsed.y - 0.5) *2 * multiplier;
             console.log(x);
           } else {
             x = x + 10*(Math.random() - 0.5);
             y = y + 10*(Math.random() - 0.5);
             if ((x > multiplier) || (x < -multiplier) || (y > multiplier) || (y < -multiplier)) {
               x = 0
               y = 0;
             }
           }
           serialPort.write(x + "," + y + ";", function(err, results) {


           });
           response.on('error', function(err){ console.log(err);});

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
