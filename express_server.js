var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var multer = require("multer");
var ffmpeg = require("ffmpeg");

// app.use(require('body-parser').urlencoded());
var upload = multer({ dest: 'uploads/' });


app.use('/public', express.static(path.join(__dirname, '/public')));

console.log(path.join(__dirname, '/public'));

app.get('/', function(req, res){
	res.send("Hello World!");
});

app.get('/index.html', function(req, res){
	res.sendFile(__dirname + "/" + "index.html");
});

// idx is a global variable used to distinguish the index of audio
var idx = 0;
app.post('/sendAudio', upload.single('audio'),  function(req, res){
	console.log(req.file);	
	try{
		// where the saved binary file
		let path2bf = __dirname + "/" + req.file.path;
		// where to store mp3 file
		let path2mp3 = __dirname + '/audio/' + req.file.originalname + "-" + idx.toString() + ".mp3"; 
		let process = new ffmpeg(path2bf);
		process.then(function(audio){
			// call ffmpeg to store the file
			audio.fnExtractSoundToMP3(path2mp3, function(error, file){
			if(!error){
				console.log(file);
				idx++;
			}else{
				console.log(error);
			}});
		}, function(err){
			console.log(err);
		});
	}catch(e){
		console.log(e.msg);
	}
});

var server = app.listen(8888, function(){
		var host = server.address().address;
		var port = server.address().port;

		console.log("Server running at http://%s:%s", host, port);
});
