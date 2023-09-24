<script>
  import { io } from "socket.io-client";
  const socket = io("http://0.0.0.0:3000");

  // html elements
  let localVideo;
  let remoteVideo;
  let startCallBtn;
  let endCallBtn;

  // variables
  let localStream;
  let peerConnection;

  // RTC configuration
  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // Use a public STUN server
    ],
  };

  // function to send message to the signalling server
  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  const startCall = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideo.srcObject = localStream;

      // initialize the peer connection
      peerConnection = new RTCPeerConnection(configuration);

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

      // Send and offer to the signalling server
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      sendMessage({
        offer: offer,
      });
    } catch (error) {
      console.log("Error starting the call: ", error);
    }
  };

  // handle incomming message from the signalling server
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

  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
    }
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    localStream.getTracks().forEach((track) => track.stop());
  };
</script>

<div id="app_root">
  <h1>WebRTC video calling</h1>

  <div id="video_root">
    <!-- local video -->
    <video bind:this={localVideo} id="localVideo" autoplay muted />
    <!-- remote video -->
    <video bind:this={remoteVideo} id="remoteVideo" autoplay muted />
  </div>

  <div id="controls_root">
    <!-- controls -->
    <button bind:this={startCallBtn} on:click={startCall} id="startCallBtn">
      Start call
    </button>
    <button bind:this={endCallBtn} on:click={endCall} id="endCallBtn">
      End call
    </button>
  </div>
</div>

<style>
  #app_root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  #video_root {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  #video_root video {
    width: 500px;
    height: 500px;
    margin: 10px;
    border: 1px solid rgb(7, 152, 255);
  }

  #controls_root {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  #controls_root button {
    margin: 0 10px;
  }
</style>
