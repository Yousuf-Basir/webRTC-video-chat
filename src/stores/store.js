import { writable } from "svelte/store";
import { io } from "socket.io-client";
import { SIGNALING_SERVER_URL, socketRoomId } from "./globalConfig";

// html elements
export const localVideo = writable(null);
export const remoteVideo = writable(null);

// variables
export const localStream = writable(null);
export const peerConnection = writable(null);

// call states
export const connectedSessionUser = writable(null);
export const isCallOngoing = writable(true);
export const isMicOn = writable(true);
export const isCameraOn = writable(true);
export const isVideoMaximized = writable(true);
export const socketRoomMembers = writable([]);

// socket
export const socketInstance = writable(io(`${SIGNALING_SERVER_URL}?room=${socketRoomId}`))