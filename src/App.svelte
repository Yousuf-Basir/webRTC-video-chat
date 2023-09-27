<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import {
    localVideo,
    remoteVideo,
    localStream,
    peerConnection,
  } from "./stores/store.js";
  import { endCall, joinCall } from "./services/callServices.js";

  const handleJoinCall = () => {
    joinCall({
      peerConnection: $peerConnection,
      localStream: $localStream,
      localVideo: $localVideo,
      remoteVideo: $remoteVideo,
    });
  };

  const handleEndCall = () => {
    endCall({
      peerConnection: $peerConnection,
      localStream: $localStream,
      localVideo: $localVideo,
      remoteVideo: $remoteVideo,
    });
  };
</script>

<div id="app_root">
  <h1>WebRTC video calling</h1>

  <div id="video_root">
    <!-- local video -->
    <video bind:this={$localVideo} id="localVideo" autoplay muted>
      <track kind="captions" />
    </video>

    <!-- remote video -->
    <video bind:this={$remoteVideo} id="remoteVideo" autoplay>
      <track kind="captions" />
    </video>
  </div>

  <div id="controls_root">
    <!-- controls -->
    <button on:click={handleJoinCall} id="joinCallBtn">Join call</button>

    <button on:click={handleEndCall} id="endCallBtn">End call</button>
  </div>

  <Alert>
    <span class="font-medium">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
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
