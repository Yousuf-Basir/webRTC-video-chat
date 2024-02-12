<script>
  import { Alert, Button, P } from "flowbite-svelte";
  import OnGoingCall from "./components/call/OnGoingCall.svelte";
  import { socketRoomId } from "./stores/globalConfig";
  import {
    connectedSessionUser,
    isCallOngoing,
    isVideoMaximized,
    socketInstance,
  } from "./stores/store";
  import Chat from "./components/chat/Chat.svelte";
  import EditingSection from "./components/editingSection/EditingSection.svelte";
  import BottomNavigation from "./components/bottomSharePanel/BottomNavigation.svelte";
  import SharedImage from "./components/bottomSharePanel/SharedImage.svelte";
  import ImageUpload from "./components/bottomSharePanel/ImageUpload.svelte";
  import { onMount } from "svelte";
  import { getSessionDataJson } from "./services/sessionStorageServices";
  import NewUserForm from "./components/user/newUserForm.svelte";
  import { get } from "svelte/store";
  import { InfoCircleSolid } from "flowbite-svelte-icons";

  let joiningError = null;

  isCallOngoing.subscribe((value) => {
    console.log("isCallOngoing", value);

    if(!value) {
      // replace the url with "/end"
      window.history.pushState({}, null, "/");
    } else {
      // replace the url with room name
      window.history.pushState({}, null, `/${socketRoomId}`);
    }
  });

  const handleReJoin = () => {
    // rebuild the url with room name
    window.location.href = `/${socketRoomId}`;
  }

  onMount(() => {
    var user = getSessionDataJson("user");

    if (user?.name) {
      // TODO: this same code is also in src/newUserForm.svelte. Refactor it to a function
      const socket = get(socketInstance);
      socket.emit("join", { name: user.name }, (error) => {
        if (error) {
          joiningError = error;
          console.log("JOINING ERROR", error);
          return;
        }
        connectedSessionUser.set(user);
        socket.emit("getMembers");
      });
    }
    console.log("session user: ", user);
    console.log("connected session user", get(connectedSessionUser));
  });
</script>

<div id="app_root">
  {#if joiningError}
    <div class="call_error_root">
      <Alert color="red">
        <InfoCircleSolid slot="icon" />
        <p>{joiningError}</p>
      </Alert>
    </div>
  {:else if socketRoomId}
    <!-- call components -->
    <div class="call_root">
      <div class:show={$isVideoMaximized}>
        <Chat />
      </div>

      <div>
        <!-- default value of isCallOngoing is true -->
        {#if $isCallOngoing}
          {#if $connectedSessionUser?.name}
            <OnGoingCall />
          {:else}
            <NewUserForm />
          {/if}
        {:else}
          <div class="call_ended_root">
            <Alert>
              <div class="flex items-center gap-3">
                <InfoCircleSolid slot="icon" class="w-4 h-4" />
                <span class="text-lg font-medium">Call ended</span>
              </div>
              <p class="mt-2 mb-4 text-sm">
                Other party has ended the call. Click Rejoin to start the call
                again.
              </p>
              <div class="flex gap-2">
                <Button on:click={() => 
                  handleReJoin()
                } outline>
                  Rejoin
                </Button>
              </div>
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
        <span class="text-lg font-medium">meet.myvisitsonline.com</span>
        <p>Please provide a room ID to join a call.</p>
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
