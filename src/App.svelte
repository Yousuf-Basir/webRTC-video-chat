<script>
  import { Alert } from "flowbite-svelte";
  import OnGoingCall from "./components/call/OnGoingCall.svelte";
  import { socketRoomId } from "./stores/globalConfig";
  import { isCallOngoing, isVideoMaximized } from "./stores/store";
  import Chat from "./components/chat/Chat.svelte";
  import EditingSection from "./components/editingSection/EditingSection.svelte";
  import BottomNavigation from "./components/bottomSharePanel/BottomNavigation.svelte";
  import SharedImage from "./components/bottomSharePanel/SharedImage.svelte";
  import ImageUpload from "./components/bottomSharePanel/ImageUpload.svelte";
</script>

<div id="app_root">
  {#if socketRoomId}
    <!-- call components -->
    <div class="call_root">
      <div class:show={$isVideoMaximized}>
        <Chat />
      </div>

      <div>
        {#if $isCallOngoing}
          <OnGoingCall />
        {:else}
          <div class="call_ended_root">
            <Alert color="red">
              <span class="font-medium">Call ended</span>
              <div>Refresh the page to join the call again.</div>
            </Alert>
          </div>
        {/if}
      </div>
      <div class:show={$isVideoMaximized}>
        <EditingSection />
      </div>
    </div>

    <!-- share components -->
    <div class="share_root" class:show={$isVideoMaximized}>
      <div>
        <SharedImage />
      </div>
      <div>
        <BottomNavigation />
      </div>
      <div>
        <ImageUpload />
      </div>
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
  .call_ended_root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    .share_root {
      height: calc(var(--share_root_height) - 40px);
      padding: 10px;
    }

    .share_root > div {
      display: none;
    }

    .share_root > div:nth-child(2) {
      flex: 1;
      display: block;
    }
  }
</style>
