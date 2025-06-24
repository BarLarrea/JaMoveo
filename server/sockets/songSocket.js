export default function handleSocket(io) {
    let currentSong = null;

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        if (currentSong) {
            socket.emit("song-selected", currentSong);
        }

        socket.on("select-song", (data) => {
            currentSong = data;
            io.emit("song-selected", data);
        });

        socket.on("quit", () => {
            currentSong = null;
            io.emit("quit");
        });

        socket.on("scroll-toggle", (state) => {
            io.emit("scroll-toggle", state);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
}
