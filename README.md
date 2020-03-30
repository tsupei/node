# node
Use node.js to build web server

# Version
```bash
$ node -v
v13.11.0
```

```bash
$ nvm --version
0.35.3
```

```bash
$ npm -v
6.13.7
```

# Required Package
```bash
ffmpeg
multer
```


# Short Explanation

## Front-end Part
1. Record the audio and provide `start`, `stop`, `replay` function
2. Send audio back to `express` server

## Back-end Part
1. Recieving Blob(audio) and use `ffmpeg` to save file in mp3 format
2. upload files to google-storage
 

