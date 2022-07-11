import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

function listen(httpServer: HttpServer): void {
  const socketServer = new SocketServer(httpServer, { cors: { origin: '*' } });

  socketServer.on('connection', (socket: Socket) => {
    socket.on('updateVacation', () => {
      //listen to event from server to update vacations
      socket.broadcast.emit('vacationUpdated');
    });
  });
}

export default {
  listen,
};
