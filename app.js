"use strict";

var textMessage = '';

var switchBoolean = false;
//_________________electron______________________

const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app  = electron.app;

//_________________express_______________________

//_______index_______

const expressIndex = require("express");
const exIndex  = expressIndex();
var httpIndex = require('http').createServer(exIndex);

//_______window______
const expressWindow = require("express");
const exWindow  = expressWindow();
var httpWindow = require('http').createServer(exWindow);

//_________________serve_________________________

httpIndex.listen(8080, function () {
  console.log('index hosting start');
})
httpWindow.listen(8000, function () {
  console.log('window hosting start');
})

//_____Index_rooting_____

exIndex.get("/", (req, res) =>{
  res.sendFile(`${__dirname}/index.html`);
    console.log("index to acsess");
});

exIndex.get("/index.js", (req, res) =>{
  res.sendFile(`${__dirname}/index.js`);
    console.log("js to access");
});
exIndex.get("/index.css", (req, res) =>{
  res.sendFile(`${__dirname}/style/index.css`);
    console.log("index css to access");
});

//____window_rooting__
exWindow.get("/", (req, res) =>{
  res.sendFile(`${__dirname}/window.html`);
    console.log("window html to access");
});

exWindow.get("/window.js", (req, res) =>{
  res.sendFile(`${__dirname}/window.js`);
    console.log("window js to acsess");
});
exWindow.get("/window.css", (req, res) =>{
  res.sendFile(`${__dirname}/style/window.css`);
    console.log("window css js to acsess");
});

//__________________________________________________

let mainWindow = null;

//______________window_ready_______________________

app.on('ready', () => {


  require('child_process').exec('java -version', (err, stdout, stderr) => {

    console.log(err);
    console.log(stderr);
    
    if( err != null ){

      const { shell } = require('electron')
      shell.openExternal('https://www.java.com/ja/download/ie_manual.jsp')

      const electron = require('electron');
      const dialog = electron.dialog;

      console.log("インストールしてください。");
      　dialog.showErrorBox("java実行環境がありません。", "javaがインストールされていません。 \r\n"+
       "javaをインストールしてください。開いたブラウザからjava runtimeがインストールできます。");

    }else{

    //________clipboard_Shortcut____
    const clipboard = require('electron').clipboard;   
    const globalShortcut = electron.globalShortcut;

    //________________socket.io____________________

    //_index_
    const ioIndex = require('socket.io')(httpIndex);

    ioIndex.sockets.on( 'connection', function (socket) {
      console.log("io to conect");

      socket.on('soundMessage', function ( data ) {

        if(switchBoolean){

          textMessage = data;

          console.log(data);
      
          var ks = require('node-key-sender');
      
          clipboard.writeText(textMessage);
      
          ks.sendCombination(['control', 'v']);
      
        }

      });

    });

    //_window_

    const ioWindow = require('socket.io')(httpWindow);

      ioWindow.sockets.on( 'connection', function (socket) {

        console.log("io to conect");

        socket.on('switchClick', function ( data ) {

          if(switchBoolean){
              
            switchBoolean = false;

          }else{

            switchBoolean = true;
          }

          ioWindow.sockets.emit("switch",switchBoolean);


        });

      });

      //___________________________________________

      globalShortcut.register('F2', function () {

        if(switchBoolean){
          
          switchBoolean = false;

        }else{

          switchBoolean = true;
        }

        ioWindow.sockets.emit("switch",switchBoolean);

      })

      mainWindow = new BrowserWindow({width: 600, height: 300});
      mainWindow.loadURL('http://localhost:8000');


      const { shell } = require('electron')
      shell.openExternal('http://localhost:8080')


      mainWindow.on('closed', function() {
        mainWindow = null;
      });
          
    }

  })


});


