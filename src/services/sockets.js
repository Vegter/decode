// export const socket = window.io.connect("http://localhost:5000");
export const socket = window.io.connect("http://192.168.1.105:5000");

export function joinRoom(room) {
  socket.emit("join_room", {
    room: room
  });
}

export const sessionStatus = {
  INITIALIZED: "INITIALIZED",
  GOT_PUB_KEY: "GOT_PUB_KEY",
  GOT_ENCR_DATA: "GOT_ENCR_DATA",
  FINALIZED: "FINALIZED"
};
