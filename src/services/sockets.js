export const socket = window.io.connect(process.env.VUE_APP_API);

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
