import { Server } from "socket.io"

let io;

let messages = [];

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on ('connection', (socketClient) => {
        console.log(`Se ha conectado un nuevo cliente, el Id es ${socketClient.id}`)
        // recibimos el evento enviado por el front
        socketClient.on('new-message', (data) => {
            const {userName, text} = data;
            messages.push({userName, text});
            io.emit('notification', {messages} )
        })
    })


    console.log('Server Socket is running')

}