"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
function listen(httpServer) {
    var socketServer = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
    socketServer.on('connection', function (socket) {
        socket.on('updateVacation', function () {
            //listen to event from server to update vacations
            socket.broadcast.emit('vacationUpdated');
        });
    });
}
exports.default = {
    listen: listen,
};
