import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

function listen(httpServer: HttpServer): void {
  const socketServer = new SocketServer(httpServer, { cors: { origin: '*' } });

  socketServer.on('connection', (socket: Socket) => {
    // console.log('client connected');
    socket.on('updateVacation', () => {
      socket.broadcast.emit('vacationUpdated');
    });
  });
}

export default {
  listen,
};
