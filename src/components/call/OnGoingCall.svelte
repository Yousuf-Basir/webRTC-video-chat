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
    socketInstance,
    socketRoomMembers,
  } from "../../stores/store.js";
  import {
    endCall,
    joinCall,
    joinSocketCall,
  } from "../../services/callServices.js";
  import { getLocalTracks, leave } from "../../services/agoraService.js";
  import { Alert, Badge, Button, Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { peerConnectionConfig } from "../../stores/globalConfig.js";
  import MicrophoneToggleSvg from "../svg/MicrophoneToggleSvg.svelte";
  import CameraToggleSvg from "../svg/CameraToggleSvg.svelte";
  import OnGoingCallSvg from "../svg/OnGoingCallSvg.svelte";
  import FullscreenToggleSvg from "../svg/FullscreenToggleSvg.svelte";
  import CallEnd from "../svg/CallEnd.svelte";
  import { get } from "svelte/store";
  import { getSessionDataJson } from "../../services/sessionStorageServices.js";

  let onGoingCallRoot;
  let isVideoFullScreen;
  let initializingPeerConnection = true;
  let isWaitingForOther = true;
  let otherMember = null;
  let currentUser = getSessionDataJson("user");
  let timerCount = "00:00:00";

  const initializePeerConnection = async () => {
    initializingPeerConnection = false;
    // initialize the peer connection
    // $peerConnection = new RTCPeerConnection(peerConnectionConfig);
    // get camera and mic from user device

    // todo:
    $localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // todo:
    // joinCall({
    //   peerConnection: $peerConnection,
    //   localStream: $localStream,
    //   localVideo: $localVideo,
    //   remoteVideo: $remoteVideo,
    // });
    joinSocketCall();
  };

  const handleEndCall = async () => {
    // $localVideo.srcObject = null;
    // $remoteVideo.srcObject = null;
    $localStream.getTracks().forEach((track) => track.stop());
    $isCallOngoing = false;

    leave();
    
    endCall(); //notify others by socket event emit
  };

  const handleMicToggle = () => {
    $isMicOn = !$isMicOn;
    // $localStream.getAudioTracks()[0].enabled = $isMicOn;
    console.log("is mic on", $isMicOn);
    if (getLocalTracks().audioTrack) {
      getLocalTracks().audioTrack.setEnabled($isMicOn);
    }
  };

  const handleCameraToggle = () => {
    $isCameraOn = !$isCameraOn;
    // $localStream.getVideoTracks()[0].enabled = $isCameraOn;
    if (getLocalTracks().videoTrack) {
      getLocalTracks().videoTrack.setEnabled($isCameraOn);
    }
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

  socketRoomMembers.subscribe((members) => {
    console.log("members", members);
    if (members && Array.isArray(members) && members.length > 1) {
      isWaitingForOther = false;

      otherMember = members.filter(
        (member) => currentUser.name !== member.name
      )[0];
    } else {
      isWaitingForOther = true;
      otherMember = null;
    }
  });

  // count time. show seconds, minutes and hours
  const countTime = () => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      timerCount = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  };

  onMount(() => {
    initializePeerConnection();
    countTime();
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

      <!-- timer count -->
      <div>
        <span color="none" class="timer_count">
          {timerCount}
        </span>
      </div>
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
    {#if isWaitingForOther}
      <div class="waiting_alert">
        <Alert>Waiting for other party to join the call</Alert>
      </div>
    {/if}

    <div class="status_bar">
      {#if otherMember?.name}
        <div class="other_member_name">{otherMember?.name}</div>
      {/if}
    </div>

    <video
      bind:this={$remoteVideo}
      class="remoteVideo"
      id="remoteVideo"
      autoplay
      playsinline
    >
      <track kind="captions" />
    </video>

    <div class="local_video_container">
      <video
        bind:this={$localVideo}
        class="localVideo"
        id="localVideo"
        autoplay
        muted
        playsinline
      >
        <track kind="captions" />
      </video>

      <div class="current_user_name">{currentUser?.name}</div>
    </div>

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
        id={'end-call-button'}
        pill={true}
        class="w-10 h-10 bg-red-600 hover:bg-red-700 active:bg-red-800 end-call-button"
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

  .timer_count {
    font-size: 14px !important;
    color: #454545;
  }

  .status_bar {
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 6px;
  }

  .other_member_name {
    text-transform: capitalize;
    background-color: #454545;
    padding: 4px 12px;
    border-radius: 6px;
    color: #ffffff;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .video_root {
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: rgb(30, 30, 30);
  }

  .waiting_alert {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgb(30, 30, 30);
    padding: 10px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remoteVideo {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgb(30, 30, 30);
  }

  .local_video_container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 200px;
    height: 150px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    background-color: rgb(45, 45, 45);
    z-index: 100;
    overflow: hidden;
  }

  .localVideo {
    height: 100%;
    width: 100%;
  }

  .current_user_name {
    position: absolute;
    bottom: 0;
    right: 0;
    text-transform: capitalize;
    background-color: #454545;
    padding: 4px 12px;
    border-radius: 6px;
    color: #ffffff;
    margin: 2px;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .controls_root {
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    z-index: 100;
  }

  @media (max-width: 768px) {
    .on_going_call_root {
      border-radius: 0;
    }

    .local_video_container {
      width: 100px;
      height: 150px;
    }

    .current_user_name {
      font-size: 12px;
    }
  }
</style>
