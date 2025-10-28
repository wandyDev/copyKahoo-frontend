// socket.ts libreria
import { io } from "socket.io-client";
// socket de la app
export const Newsocket = io("https://copiakahoo-production.up.railway.app/game_gateway", {
    transports: ["websocket"],
});

