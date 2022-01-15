import { io } from "socket.io-client";
const ENDPOINT = "http://192.168.1.51:5000";

const socket = io(ENDPOINT, { transports : ['websocket'] });

export { socket };