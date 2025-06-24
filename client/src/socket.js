import { io } from "socket.io-client";
import { renderBackendURL } from "./constants/urls.js";

const socket = io(`${renderBackendURL}`, {
    autoConnect: false,
    auth: {
        token: null // Token will be set dynamically after login
    }
});

export default socket;
