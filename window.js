const socket = io();

socket.on("switch",data =>{

    if(data){

        document.getElementById("switch").style.backgroundColor = "#FF0000";

        document.getElementById("switch").innerHTML = "録音中"
    }else{

        document.getElementById("switch").style.backgroundColor = "#0C7CEE";
        document.getElementById("switch").innerHTML = "停止中"
    }
});

function switchChange(){

    socket.emit("switchClick",true);
}
