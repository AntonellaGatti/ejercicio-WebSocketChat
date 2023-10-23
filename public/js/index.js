// Config desde el Front 

(function() {
    const socket = io();

    let userName;

 // form-message
 const formMessage = document.getElementById('form-message');
 // input-message
 const inputMessage = document.getElementById('input-message');
 // log-messages
 const logMessages = document.getElementById('log-messages');


 formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = inputMessage.value;
    socket.emit('new-message', { userName, text });
    console.log('Nuevo mensaje enviado', { userName, text });
    inputMessage.value = '';
    inputMessage.focus();
  });

  function updateLogMessages(messages) {
    logMessages.innerText = "",
    messages.forEach((msg) => {
        const p = document.createElement('p');
        p.innerText = `Usuario: ${msg.userName} ---> ${msg.text}`
        logMessages.appendChild(p);
    })
  }

  socket.on('notification', ({messages}) => {
    updateLogMessages(messages)
  })

    Swal.fire({
        title: 'Identificate por favor 👮',
        input: 'text',
        inputLabel: 'Ingresa tu username',
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitamos que ingreses un username para continuar!';
          }
        },
      })
      .then((result) => {
        // el .trim elimina los espacios al principio y al final del string
        userName = result.value.trim();
        console.log(`Hola ${userName}, bienvenid@ 🖐️`);
      });

})();