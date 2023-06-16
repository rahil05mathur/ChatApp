const socket = io();

let naam;

let textArea = document.querySelector('#textArea')
let msgArea = document.querySelector(".messageArea")


do {
    naam = prompt("Please enter your name")
} while (!naam);

textArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMsg(e.target.value)
    }
})

function sendMsg(message) {
    let msg = {
        user: naam,
        message: message.trim()
    }

    // append

    appendMsg(msg, 'outgoing')
    textArea.value = '';
    scrossTobtm()

    // send to server

    socket.emit('message', msg);
}

function appendMsg (msg, type) {
    let div = document.createElement('div')
    let className = type
    div.classList.add(className, 'message');
    
    let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>
    `

    div.innerHTML = markup;
    msgArea.appendChild(div)
}

// Receive the message

// its only run on browser
socket.on('message', (msg) => {
    appendMsg(msg, 'incoming')
    textArea.value = '';
    scrossTobtm()
})

function scrossTobtm() {
    msgArea.scrollTop = msgArea.scrollHeight
}
