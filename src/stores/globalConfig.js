export const SIGNALING_SERVER_URL = import.meta.env.VITE_SIGNALING_SERVER_URL;
export const STUN_SERVER = import.meta.env.VITE_STUN_SERVER;
export const TURN_SERVER_URL = import.meta.env.VITE_TURN_SERVER_URL;
export const TURN_SERVER_USERNAME = import.meta.env.VITE_TURN_SERVER_USERNAME;
export const TURN_SERVER_CREDENTIAL = import.meta.env.VITE_TURN_SERVER_CREDENTIAL;

// rtc configuration
export const peerConnectionConfig = {
  iceServers: [
    { urls: STUN_SERVER },
    {
      urls: TURN_SERVER_URL,
      username: TURN_SERVER_USERNAME,
      credential: TURN_SERVER_CREDENTIAL,
    },
  ],
};

// room id from url
export const socketRoomId = window.location.pathname.split("/")[1];