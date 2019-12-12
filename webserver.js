var http = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(http);
//const { Client } = require('node-osc');
const OSC = require('osc-js');

var port = process.argv[2] || 8000;

http.listen(parseInt(port, 10));

function  handler(req, res) {
	console.log('request', req.url);

	var filePath = req.url;
	if(filePath == '/'){
		filePath = '/index.html';
	}

	var extname = String(path.extname(filePath)).toLowerCase();
	var mimeTypes = {
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.css': 'text/css',
		'.json': 'application/json'
	};

	var contentType = mimeTypes[extname] || 'application/octet-stream';

	fs.readFile(__dirname + '/public' + filePath, function(err, content){
		console.log(__dirname + '/public' + filePath);
		if(err){
			if(err.code == 'ENOENT'){
				res.writeHead(404, {"Content-Type": "text/plain"});
				res.write( "404 not found \n");
				res.end();
				return;
			} else {
				res.writeHead(500);
				res.end('Sorry, check with the site admin for error: '+ err.code + '..\n');
			}
		}

		else{
			res.writeHead(200, {'Content-Type': contentType});
			console.log('contentType', contentType);
			return res.end(content);
		}
	});

}

console.log("Static file server running at port: " + port );

/**** sockets and OSC ***/

//const client = new Client('127.0.0.1', 5432);

const options = {
		open: { host: '127.0.0.1', port: 5432}, 
		send: { host: '127.0.0.1', port: 5433}
};

const osc = new OSC(
	{
		plugin: new OSC.DatagramPlugin(options) 
	});

io.sockets.on('connection', function(socket) {
//	client.send('/recurOsc', 'socket: '+ socket);
	osc.open();
	//osc.send(new OSC.Message('/recurOsc', 'connected!'))
	var lightvalue = 0;
	socket.on("light", function(data){
		lightvalue = data;
		console.log(data);
//		client.send('/recurOsc', 'message: '+ data);
		osc.send(new OSC.Message('/recurOsc', 'message: '+data ));
	});
});
