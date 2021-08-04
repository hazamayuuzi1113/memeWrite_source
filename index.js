const socket = io();

SpeechStart();

function SpeechStart(){
    
    if ('SpeechRecognition' || webkitSpeechRecognition in window) {

        SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
    
        const recognition = new SpeechRecognition();
    
        recognition.continuous = true;
    
        recognition.onresult = (event) => {

            recognition.stop();
            SpeechStart()
                    
            var date = new Date();

            var timeData = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
                
            document.getElementById("message_log").insertAdjacentHTML('beforeend',
            '<div class="message_log_text">'+timeData+'　:　'+event.results[0][0].transcript+'</div>');

            socket.emit("soundMessage",event.results[0][0].transcript);
    
        }

        recognition.onaudioend = (event) => {

            // recognition.start();
            recognition.stop();
            SpeechStart()
        }

        recognition.onerror = (event) => {

            // recognition.start();
            recognition.stop();
            SpeechStart()

        }

        recognition.start();

    } else {
        
        alert("このブラウザは音声認識に対応していません。\n Chromeもしくは、Firefoxを利用してください。")

    }
}