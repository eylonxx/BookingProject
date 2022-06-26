import socketService from '../../../../Services/SocketService';

export default function SocketLogic() {
  function connect(): void {
    socketService.connect();
  }
  return (
    <div>
      SocketLogic
      <button onClick={connect}></button>
    </div>
  );
}
