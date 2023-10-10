<script>
  import {
    localVideo,
    remoteVideo,
    localStream,
    peerConnection,
    isCallOngoing,
    isMicOn,
    isCameraOn,
    isVideoMaximized,
  } from "../../stores/store.js";
  import { endCall, joinCall } from "../../services/callServices.js";
  import { Button, Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { peerConnectionConfig } from "../../stores/globalConfig.js";
  import MicrophoneToggleSvg from "../svg/MicrophoneToggleSvg.svelte";
  import CameraToggleSvg from "../svg/CameraToggleSvg.svelte";
  import OnGoingCallSvg from "../svg/OnGoingCallSvg.svelte";
  import FullscreenToggleSvg from "../svg/FullscreenToggleSvg.svelte";
  import CallEnd from "../svg/CallEnd.svelte";

  let onGoingCallRoot;
  let isVideoFullScreen;
  let initializingPeerConnection = true;

  const initializePeerConnection = async () => {
    initializingPeerConnection = false;
    // initialize the peer connection
    $peerConnection = new RTCPeerConnection(peerConnectionConfig);
    // get camera and mic from user device
    $localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    handleJoinCall();
  };

  const handleJoinCall = async () => {
    joinCall({
      peerConnection: $peerConnection,
      localStream: $localStream,
      localVideo: $localVideo,
      remoteVideo: $remoteVideo,
    });
  };

  const handleEndCall = async () => {
    $localVideo.srcObject = null;
    $remoteVideo.srcObject = null;
    $localStream.getTracks().forEach((track) => track.stop());
    $isCallOngoing = false;

    endCall();
  };

  const handleMicToggle = () => {
    $isMicOn = !$isMicOn;
    $localStream.getAudioTracks()[0].enabled = $isMicOn;
  };

  const handleCameraToggle = () => {
    $isCameraOn = !$isCameraOn;
    $localStream.getVideoTracks()[0].enabled = $isCameraOn;
  };

  const handleMaximizeToggle = () => {
    $isVideoMaximized = !$isVideoMaximized;
  };

  // toggle full screen
  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      onGoingCallRoot.requestFullscreen();
      isVideoFullScreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        isVideoFullScreen = false;
      }
    }
  };

  onMount(() => {
    setTimeout(() => {
      initializePeerConnection();
    }, 5000);
  });
</script>

<div class="on_going_call_root" bind:this={onGoingCallRoot}>
  <div class="title_bar">
    <div>
      <OnGoingCallSvg
        size={24}
        color={$isCallOngoing ? "#1c64f1" : "#ff0000"}
      />
      <span>Ongoing call</span>
    </div>

    <div>
      {#if initializingPeerConnection}
        <Spinner />
      {/if}
    </div>

    <div>
      <!-- maximize button -->
      <Button
        pill={true}
        color="none"
        class="w-10 h-10"
        on:click={handleToggleFullScreen}
      >
        <FullscreenToggleSvg
          size={24}
          color="#1c64f1"
          isMaximized={isVideoFullScreen}
        />
      </Button>
    </div>
  </div>

  <div class="video_root">
    <video bind:this={$remoteVideo} class="remoteVideo" autoplay playsinline>
      <track kind="captions" />
    </video>

    <video
      bind:this={$localVideo}
      class="localVideo"
      autoplay
      muted
      playsinline
    >
      <track kind="captions" />
    </video>

    <div class="controls_root">
      <!-- mute button -->
      <Button
        pill={true}
        color={$isMicOn ? "blue" : "dark"}
        class="w-10 h-10"
        on:click={handleMicToggle}
      >
        <MicrophoneToggleSvg size={24} color="#ffffff" isMicOn={$isMicOn} />
      </Button>
      <!-- camera button -->
      <Button
        pill={true}
        color={$isCameraOn ? "blue" : "dark"}
        class="w-10 h-10"
        on:click={handleCameraToggle}
      >
        <CameraToggleSvg size={24} color="#ffffff" isCameraOn={$isCameraOn} />
      </Button>
      <!-- call end button -->
      <Button
        on:click={handleEndCall}
        pill={true}
        class="w-10 h-10 bg-red-600 hover:bg-red-700 active:bg-red-800"
      >
        <CallEnd size={24} color="#ffffff" />
      </Button>
    </div>
  </div>
</div>

<style>
  .on_going_call_root {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    height: 100%;
    overflow: hidden;
  }

  .title_bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .title_bar > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: #1c64f1;
  }

  .title_bar span {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .video_root {
    flex: 1;
    display: flex;
    position: relative;
  }

  .remoteVideo {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgb(30, 30, 30);
  }

  .localVideo {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 200px;
    height: 150px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    background-color: rgb(45, 45, 45);
  }

  .controls_root {
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .on_going_call_root {
      border-radius: 0;
    }

    .localVideo {
      width: 100px;
      height: 150px;
    }
  }
</style>
