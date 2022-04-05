const request = 'http://localhost:8080';

let username = null;
let stompClient = null;
let uid = null;

function enterRoom(event){
    username = document.getElementById("username").value;
    fetch(request+"/enter?sender="+username).then(r => connect(event, r)).catch(e => ErrorOccurred);
}

function connect(event, response){
    if (response.status === 400){
        alert("이미 존재하는 이름입니다.");
        return
    }
    if (username != null) {
        let socket = new SockJS(request+'/chat-room');
        stompClient = Stomp.over(socket);


        stompClient.connect({},function () {
            connected();
            uid = /\/([^\/]+)\/websocket\/?$/.exec(socket._transport.url)[1];
            }, ErrorOccurred);
    }
    event.preventDefault();
}

function connected() {

    stompClient.subscribe('/topic/public', receiver);

    stompClient.send("/app/pub", {}, JSON.stringify({type: 'enter', sender: username}));
    //todo enter message
}


function receiver(response) {
    let message = JSON.parse(response.body);
    console.log(message);
    //todo
}

function ErrorOccurred() {
    alert("에러가 발생하였습니다");
}


