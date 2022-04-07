const request = 'http://localhost:8080';

let username = null;
let stompClient = null;

function enterRoom(event) {
    username = document.getElementById("username").value;
    fetch(request + "/enter", {
        method: 'POST', body: JSON.stringify({name: username}), headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => connect(event, r)).catch(e => ErrorOccurred);
}

function connect(event, response) {
    if (response.status === 400) {
        alert("이미 존재하는 이름입니다.");
        return
    }
    if (username != null) {
        let socket = new SockJS(request + '/chat-room');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function () {
            connected();
        }, ErrorOccurred);
    }
    event.preventDefault();
}

function connected() {

    stompClient.subscribe('/topic/public', receiver);

    stompClient.send("/app/connection", {}, JSON.stringify({type: 'enter', sender: username}));

}


function receiver(response) {
    let message = JSON.parse(response.body);

    messageRender(message);

}

function ErrorOccurred() {
    alert("에러가 발생하였습니다");
}

function messageRender(message){
    messageContainer.classList.add('message');
    // messageContainer.style.float = 'right';

    if (message.type === 'enter') {
        document.getElementById('enter').classList.add('hidden');
        document.getElementById('room').classList.remove('hidden');
    }

    let room = document.getElementById('room');

    let messageContainer = document.createElement('li');

    let sender= document.createElement('p');
    sender.classList.add('sender');
    sender.appendChild(document.createTextNode(message.sender));
    messageContainer.appendChild(sender);

    let time = document.createElement('span');
    time.classList.add('time');
    time.appendChild(document.createTextNode(new Date().toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })));
    messageContainer.appendChild(time);

    let content = document.createElement('span');
    content.classList.add('content');
    content.appendChild(document.createTextNode(message.content));
    messageContainer.appendChild(content);

    room.appendChild(messageContainer);
}

