import { io, Socket } from 'socket.io-client';
import vacationService from './VacationService';

class SocketService {
  private socket: Socket;
  public connect(): void {
    this.socket = io('http://localhost:3001');

    //listen to server here
    this.socket.on('vacationUpdated', () => {
      vacationService.getAllVacations();
    });
  }

  public notifyServer(): void {
    this.socket.emit('updateVacation');
  }
}
const socketService = new SocketService();
export default socketService;
