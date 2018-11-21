export const socket = window.io.connect('http://localhost:5000');

export function joinRoom(room) {
    socket.emit('join_room', {'room': room});
}