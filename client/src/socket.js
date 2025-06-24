import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    autoConnect: false,
    auth: {
        token: null // Token will be set dynamically after login
    }
});

export default socket;
