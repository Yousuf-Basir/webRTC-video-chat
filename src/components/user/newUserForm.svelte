<script>
  import { Label, Input, Modal, Button, Alert } from "flowbite-svelte";
  import { localStream, localVideo } from "../../stores/store";
  import { onMount } from "svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";

  let permissionModal = true;
  let permissionGranted = false;
  let permissionError = null;

  const loadLocalVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        $localStream = stream;
        $localVideo.srcObject = $localStream;
        permissionModal = false;
        permissionGranted = true;
        permissionError = null;
      })
      .catch((err) => {
        permissionModal = false;
        permissionError = err.message;
      });
  };

  onMount(() => {
    // loadLocalVideo();
  });
</script>

<div class="root">
  <!-- if permission denied then ask the user to reset website permisson -->
  <!-- if permission dismissed then ask the user to try again -->
  {#if permissionError}
    <div class="alert_container">
      <Alert color={permissionError.includes("denied") ? "red" : "yellow"}>
        <div class="flex items-center gap-3">
          <InfoCircleSolid slot="icon" class="w-4 h-4" />
          <span class="text-lg font-medium">{permissionError}</span>
        </div>
        {#if permissionError.includes("denied")}
          <p class="mt-2 mb-4 text-sm">
            Browser has denied the permission.
            Please reset the website permission
            and try again.
          </p>
        {:else}
          <p class="mt-2 mb-4 text-sm">
            You have dismissed the permission. Please try again.
          </p>
          <div class="flex gap-2">
            <Button color="yellow" on:click={() => (permissionModal = true)}>Try again</Button>
          </div>
        {/if}
      </Alert>
    </div>
  {:else}
    <!-- local video -->
    <div class="video_container">
      <video
        bind:this={$localVideo}
        class="local_video"
        autoplay
        muted
        playsinline
      >
        <track kind="captions" />
      </video>
    </div>
  {/if}

  <div class="form_container">
    <div class="user_form_root">
      <h1>What's your name?</h1>
      <form>
        <Label for="username">Your name</Label>
        <Input type="text" id="username" name="username" />

        <Button disabled={!permissionGranted || permissionError} type="submit">
          Join call
        </Button>
      </form>
    </div>
  </div>

  <!-- user camera, mic permission modal -->
  <Modal
    title="Permission required"
    bind:open={permissionModal}
    dismissable={false}
  >
    <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
      Allow access to camera and microphone
    </p>

    <p class="text-sm text-gray-600 dark:text-gray-400">
      We need access to your camera and microphone to start the call. If required, browser
      will ask for your permission. Click allow to start the call.
    </p>

    <svelte:fragment slot="footer">
      <Button on:click={() => loadLocalVideo()}>Allow</Button>
      <Button
        color="alternative"
        on:click={() => {
          permissionModal = false;
          permissionError = "Permission dismissed. Please try again.";
        }}
      >
        Deny
      </Button>
    </svelte:fragment>
  </Modal>
</div>

<style>
  .root {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    padding: 20px;
  }

  .alert_container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .video_container {
    flex: 1;
    margin-right: 20px;
  }

  .form_container {
    flex: 1;
    margin-left: 20px;
  }

  .local_video {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .user_form_root {
    max-width: 300px;
    margin: 0 auto;
  }

  .user_form_root h1 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: 200;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button {
    padding: 10px;
    background-color: #00796b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #005a4c;
  }

  /* mobile responsive */
  @media (max-width: 768px) {
    .root {
      flex-direction: column;
    }

    .video_container {
      margin-right: 0;
    }

    .form_container {
      width: 100%;
    }
  }
</style>
