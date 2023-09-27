<script>
  import { Alert } from "flowbite-svelte";
  import CallError from "./components/call/CallError.svelte";
  import OnGoingCall from "./components/call/OnGoingCall.svelte";
  import { socketRoomId } from "./stores/globalConfig";
</script>

<div id="app_root">
  {#if socketRoomId}
    <!-- call components -->
    <div class="call_root">
      <div />
      <div>
        <OnGoingCall />
      </div>
      <div />
    </div>

    <!-- share components -->
    <div class="share_root">
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
    height: calc(100vh - var(--share_root_height));
  }

  .call_root > div {
    flex: 1;
    height: calc(100vh - var(--share_root_height));
    padding: 10px;
    border: 1px solid green;
  }

  .call_root > div:nth-child(2) {
    flex: 2; /* 2x the size of the other divs */
    border: 1px solid red;
  }

  .share_root {
    height: var(--share_root_height);
    width: 100%;
    border: 1px solid blue;
  }

  @media (max-width: 768px) {
    .call_root > div {
      flex: 1;
      display: none;
      border: 1px solid green;
      padding: 0;
    }

    .call_root > div:nth-child(2) {
      flex: 1;
      display: block;
      border: 1px solid red;
    }
  }
</style>
