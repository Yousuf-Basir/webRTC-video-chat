import { get } from "svelte/store";
import { peerConnectionConfig, socketRoomId } from "../stores/globalConfig";
import { io } from "socket.io-client";
import { socketInstance } from "../stores/store";

// function to send message to the signaling server
const sendMessage = (message) => {
    const socket = get(socketInstance);
    socket.emit("message", message);
};

export const joinCall = async ({
    localStream, localVideo, remoteVideo, peerConnection
}) => {
    try {
        if (!socketRoomId || !socketRoomId.length) {
            console.log("no socketRoomId");
            return;
        }

        handleSocketEvents(peerConnection);

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
    } catch (error) {
        console.log("Error starting the call: ", error);
    }
};


// handle incomming message from the signaling server
const handleSocketEvents = (peerConnection) => {
    const socket = get(socketInstance);

    socket.on("message", async (message) => {
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
      } else if (message.answer) {
        // handle the incoming answer from the remote server
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(message.answer)
        );
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
  };


  export const endCall = ({
    localStream, localVideo, remoteVideo, peerConnection
  }) => {
    if (peerConnection) {
      peerConnection.close();
    }
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    localStream.getTracks().forEach((track) => track.stop());
  };