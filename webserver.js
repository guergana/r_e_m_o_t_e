const http = require('http').createServer(handler);
const fs = require('fs');
const path = require('path');
const io = require('socket.io')(http);
const OSC = require('osc-js');

const port = process.argv[2] || 8000;

http.listen(parseInt(port, 10));

function  handler(req, res) {
	console.log('request', req.url);

	let filePath = req.url;
	if(filePath == '/'){
		filePath = '/index.html';
	}

	const extname = String(path.extname(filePath)).toLowerCase();
	const mimeTypes = {
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.css': 'text/css',
		'.json': 'application/json'
	};

	const contentType = mimeTypes[extname] || 'application/octet-stream';

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

console.log("--- Static file server running at port: " + port + " ---");

/**** sockets and OSC ***/

const options = {
		open: { host: '127.0.0.1', port: 5432}, 
		send: { host: '127.0.0.1', port: 5433}
};

const osc = new OSC(
	{
		plugin: new OSC.DatagramPlugin(options) 
	});

osc.open();

osc.on('open', () => {
	console.log('--- Node Osc Server started successfully --- ');
});

io.sockets.on('connection', function(socket) {
	console.log('--- Socket connected ---');
	socket.on("connect", function(){
		console.log('--- user connected ---');
	});

	socket.on("disconnect", function() {
		console.log('--- user disconnected ---');
	});

	let lightvalue = 0;
	socket.on("light", function(data){
		lightvalue = data;
		console.log(data);
		osc.send(new OSC.Message('/recurOsc', 'message: '+data ));
	});
});
