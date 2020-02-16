var socket = io.connect('http://192.168.0.21:6677', { 'forceNew': true });

socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function(message, index) {
        return (`
            <div class="message">
                <strong>${message.nick}</strong> dice: 
                <p>${message.text}</p>
            </div>    
        `);
    }).join(' ');
    var div_msgs = document.getElementById('messages');

    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(event) {
    console.log('entro', event);
    var message = {
        nick: document.getElementById('nick').value,
        text: document.getElementById('text').value,
    }

    document.getElementById('nick').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}