import { writable } from "svelte/store";
import { io } from "socket.io-client";
import { SIGNALING_SERVER_URL, socketRoomId } from "./globalConfig";

// html elements
export const localVideo = writable(null);
export const remoteVideo = writable(null);

// variables
export const localStream = writable(null);
export const peerConnection = writable(null);

// socket
export const socketInstance = writable(io(`${SIGNALING_SERVER_URL}?room=${socketRoomId}`))