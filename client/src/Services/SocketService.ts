import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;
  public connect(): void {
    this.socket = io('http://localhost:3001');

    //listen to server here
  }
  public send(): void {
    this.socket.emit('msg');
  }
  public updateVacations(): void {
    this.socket.on('update', () => {
      console.log('updated a vacation!!');
    });
  }
}
const socketService = new SocketService();
export default socketService;
