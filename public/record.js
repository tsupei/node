navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {handlerFunction(stream)})


function handlerFunction(stream) {
        rec = new MediaRecorder(stream);
        rec.ondataavailable = e => {
            audioChunks.push(e.data);
            if (rec.state == "inactive"){
                let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
			    $("#recordedAudio").attr('src', URL.createObjectURL(blob));
			    $("#recordedAudio").attr('controls', true);
			    $("#recordedAudio").attr('autoplay', true);
                sendData(blob);
            }
        }
}

function sendData(blob) {
		var xhr = new XMLHttpRequest();
		var fd = new FormData();
		fd.append("audio", blob, "record");
		xhr.open('POST', '/sendAudio', true);
		xhr.send(fd);
}

$(function(){
  $("#record").click(function(){
		console.log('I was clicked')
        record.disabled = true;
        record.style.backgroundColor = "blue"
        stopRecord.disabled=false;
        audioChunks = [];
        rec.start();
  });
});
$(function(){
  $("#stopRecord").click(function(){
		console.log("I was clicked")
        record.disabled = false;
        stop.disabled=true;
        record.style.backgroundColor = "red"
        rec.stop();

  });
});



