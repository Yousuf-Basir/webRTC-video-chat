<script>
  import { Alert } from "flowbite-svelte";
  import CallError from "./components/call/CallError.svelte";
  import OnGoingCall from "./components/call/OnGoingCall.svelte";
  import { socketRoomId } from "./stores/globalConfig";
  import { isCallOngoing, isVideoMaximized } from "./stores/store";
  import Chat from "./components/chat/Chat.svelte";
</script>

<div id="app_root">
  {#if socketRoomId}
    <!-- call components -->
    <div class="call_root">
      <div class:show={$isVideoMaximized}>
        <Chat />
      </div>
        
      <div>
        <OnGoingCall />
      </div>
      <div class:show={$isVideoMaximized} />
    </div>

    <!-- share components -->
    <div class="share_root"  class:show={$isVideoMaximized}>
      <div />
      <div />
      <div />
    </div>

  {:else}
    <div class="call_error_root">
      <Alert>
        <span class="font-medium">No room ID</span>
        Please provide a room ID to join a call.
      </Alert>
    </div>
  {/if}
</div>

<style>
  /* define variable for share root height */
  :root {
    --share_root_height: 120px;
  }
  #app_root {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* overflow: hidden; */
  }
  .call_error_root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .call_root {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .call_root > div {
    flex: 1;
    height: 100%;
    padding: 10px;
  }

  .call_root > div:nth-child(2) {
    flex: 2; /* 2x the size of the other divs */
  }

  .share_root {
    height: var(--share_root_height);
    width: 100%;
  }

  .show {
    display: none;
  }

  @media (max-width: 768px) {
    .call_root > div {
      flex: 1;
      display: none;
      padding: 0;
    }

    .call_root > div:nth-child(2) {
      flex: 1;
      display: block;
    }
  }
</style>
