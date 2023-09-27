<script>
  import {
    MicrophoneSolid,
    PhoneOutline,
    CameraFotoOutline,
  } from "flowbite-svelte-icons";

  import {
    localVideo,
    remoteVideo,
    localStream,
    peerConnection,
  } from "../../stores/store.js";
  import { endCall, joinCall } from "../../services/callServices.js";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

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

  onMount(() => {
    handleJoinCall();
  });
</script>

<div class="on_going_call_root">
  <div class="call_titlebar">
    <div>
      <PhoneOutline class="text-white bg-blue-600 p-2 rounded-full w-10 h-10" />
      <span>Ongoing call</span>
    </div>

    <div>
      <!-- <MinimizeOutline /> -->
    </div>
  </div>

  <div class="video_root">
    <video bind:this={$remoteVideo} class="remoteVideo" autoplay>
      <track kind="captions" />
    </video>

    <video bind:this={$localVideo} class="localVideo" autoplay muted>
      <track kind="captions" />
    </video>

    <div class="controls_root">
      <!-- mute button -->
      <Button pill={true} class="w-10 h-10">
        <MicrophoneSolid class="w-6 h-6 text-white" />
      </Button>
      <!-- camera button -->
      <Button pill={true} class="w-10 h-10">
        <CameraFotoOutline class="w-6 h-6 text-white" />
      </Button>
      <!-- call end button -->
      <Button on:click={handleEndCall} pill={true} class="w-10 h-10 bg-red-600 rotate-[135deg]">
        <PhoneOutline class="w-6 h-6 text-white" />
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
  }

  .call_titlebar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid rgb(7, 152, 255);
  }

  .call_titlebar > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: #1c64f1;
  }

  .call_titlebar span {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .video_root {
    flex: 1;
    display: flex;
    border: 1px solid green;
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
