const request = 'http://localhost:8080';

let username = null;
let stompClient = null;
let uid = null;

document.getElementById('enter-form').addEventListener('submit', enterRoom);
document.getElementById('send-form').addEventListener('submit', send);
document.getElementById('message').addEventListener('keyup', block);

    function enterRoom(event) {
        username = document.getElementById("username").value.trim();
        fetch(request + "/enter", {
            method: 'POST', body: JSON.stringify({name: username}), headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => connect(event, r,)).catch(e => ErrorOccurred);
        event.preventDefault();

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
                uid = /\/([^\/]+)\/websocket\/?$/.exec(socket._transport.url)[1];
                connected();
            }, ErrorOccurred);
        }
    }

    function connected() {

        stompClient.subscribe('/topic/public', receiver);

        stompClient.send("/app/connection", {}, JSON.stringify({type: 'enter', sender: username}));

    }


    function receiver(response) {
        let message = JSON.parse(response.body);

        messageRender(message);

        document.getElementById("message").focus();

    }

    function send(event) {

        let data = document.getElementById('message').value.trim();

        let messageTemplate = {
            type: 'chat',
            sender: username,
            content: data
        }

        stompClient.send("/app/send", {}, JSON.stringify(messageTemplate));

        document.getElementById('message').value = '';

        event.preventDefault();
    }

    function ErrorOccurred() {
        alert("에러가 발생하였습니다");
    }

    function messageRender(message) {

        let messageContainer = document.createElement('li');

        messageContainer.classList.add('message');

        let time = document.createElement('span');
        time.classList.add('time');
        time.appendChild(document.createTextNode(new Date().toLocaleString('ko-KR', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })));
        messageContainer.appendChild(time);

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('contentContainer');

        let senderName = document.createElement('p');
        senderName.appendChild(document.createTextNode(message.sender));

        let content = document.createElement('span');
        content.classList.add('content');
        content.appendChild(document.createTextNode(message.content));

        contentContainer.appendChild(senderName);
        contentContainer.appendChild(content);
        messageContainer.appendChild(contentContainer);

        let sender = document.createElement('p');
        sender.classList.add('sender');
        // profile image
        messageContainer.appendChild(sender);

        if (message.type === 'enter' || message.type === 'out') {
            document.getElementById('enter').classList.add('hidden');
            document.getElementById('room').classList.remove('hidden');
            messageContainer.style.float = 'none';
            messageContainer.style.textAlign = 'center';
            content.classList.add('system');
            content.classList.remove('content');
            contentContainer.removeChild(senderName);
            messageContainer.removeChild(sender);
            messageContainer.removeChild(time);
        }

        if (message.uid === uid) {
            messageContainer.style.float = 'right';
            messageContainer.style.flexDirection = 'inherit';
            content.style.backgroundColor = 'yellow';
            contentContainer.removeChild(senderName);
            messageContainer.removeChild(sender);
        }

        document.getElementById('chat').appendChild(messageContainer);
        scrollToBottom('chat');
    }

    const scrollToBottom = (id) => {
        const element = document.getElementById(id);
        element.scrollTop = element.scrollHeight;
    }

window.addEventListener('beforeunload', (event) => {
    stompClient.send("/app//connection", {}, JSON.stringify({
        type: 'out',
    }));
});

function block(){
    document.getElementById('send-btn').disabled = !document.getElementById('message').value;
}
