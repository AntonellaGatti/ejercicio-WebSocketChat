// BACKEND
import { Server } from "socket.io"

let io;

let messages = [];

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on ('connection', (socketClient) => {
        console.log(`Se ha conectado un nuevo cliente, el Id es ${socketClient.id}`)

        // te carga el historial incluso antes de ingresar nombre
        socketClient.emit('notification', {messages})


        // informar a todos menos al cliente que lo manda
        socketClient.on('new-client', (newUserName) => {
            socketClient.broadcast.emit('new-client', newUserName);
        })


        // recibimos el evento enviado por el front
        socketClient.on('new-message', (data) => {
            const {userName, text} = data;
            messages.push({userName, text});
            io.emit('notification', {messages} )
        })
    })


    console.log('Server Socket is running')

}