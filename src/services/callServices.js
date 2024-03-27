import { get } from "svelte/store";
import { peerConnectionConfig, socketRoomId } from "../stores/globalConfig";
import { io } from "socket.io-client";
import {
  socketInstance,
  isCallOngoing,
  socketRoomMembers,
} from "../stores/store";
import { initAgora } from "./agoraService";

// function to send message to the signaling server
const sendMessage = (message) => {
  const socket = get(socketInstance);
  socket.emit("message", message);
};

export const getMembers = () => {
  const socket = get(socketInstance);
  socket.emit("getMembers");
};

export const joinCall = async ({
  localStream,
  localVideo,
  remoteVideo,
  peerConnection,
}) => {
  try {
    if (!socketRoomId || !socketRoomId.length) {
      console.log("no socketRoomId");
      return;
    }

    handlePeerConnectionSocketEvents(peerConnection);

    localVideo.srcObject = localStream;

    // add the local stream to the peer connection
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // handle incoming ice candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({
          iceCandidate: event.candidate,
        });
      }
    };

    // handle incoming media stream from the remote peer
    peerConnection.ontrack = (event) => {
      remoteVideo.srcObject = event.streams[0];
    };

    // Send and offer to the signaling server
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendMessage({
      offer: offer,
    });

    getMembers();
  } catch (error) {
    console.log("Error starting the call: ", error);
  }
};

export const joinSocketCall = async () => {
  try {
    if (!socketRoomId || !socketRoomId.length) {
      console.log("no socketRoomId");
      return;
    }

    handleSocketEvents();
    // get channel name from url params
    const channelName = window.location.pathname.split("/")[1]
    initAgora(channelName);

    getMembers();
  } catch (error) {
    console.log("Error starting the call: ", error);
  }
};

// handle incomming message from the signaling server
const handlePeerConnectionSocketEvents = (peerConnection) => {
  const socket = get(socketInstance);

  socket.on("message", async (message) => {
    console.log(message);
    if (!peerConnection) {
      return;
    }
    if (message.offer) {
      // handle the incoming offer from the remote peer
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(message.offer)
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      sendMessage({
        answer: answer,
      });
      isCallOngoing.set(true);
    } else if (message.answer) {
      // handle the incoming answer from the remote server
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(message.answer)
      );

      isCallOngoing.set(true);
    } else if (message.iceCandidate) {
      // handle incoming ice candidates from the remote peer
      try {
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(message.iceCandidate)
        );
      } catch (error) {
        console.log("Error adding ice candidates ", error);
      }
    }
  });

  socket.on("roomData", async (roomData) => {
    if (roomData?.users && Array.isArray(roomData.users)) {
      socketRoomMembers.set(roomData.users);
    }
  });

  socket.on("leave", () => {
    // on remote peer leaving the call, close the call
    isCallOngoing.set(false);
    // close the peer connection
    // peerConnection.close();
  });
};



const handleSocketEvents = () => {
  const socket = get(socketInstance);

  socket.on("message", async (message) => {
    console.log(message);

    if (message.offer) {
      isCallOngoing.set(true);
    } else if (message.answer) {
      isCallOngoing.set(true);
    } else if (message.iceCandidate) {
    }
  });

  socket.on("roomData", async (roomData) => {
    if (roomData?.users && Array.isArray(roomData.users)) {
      socketRoomMembers.set(roomData.users);
    }
  });

  socket.on("leave", () => {
    // on remote peer leaving the call, close the call
    isCallOngoing.set(false);
    // close the peer connection
    // peerConnection.close();
  });
};

export const endCall = () => {
  const socket = get(socketInstance);
  socket.emit("leave");
};
