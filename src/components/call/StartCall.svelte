<script lang="ts">
  import { Card, Button, Toggle, Input, Helper } from "flowbite-svelte";
  import { VideoCameraOutline, UserCircleOutline } from "flowbite-svelte-icons";
  import Logo from "../../assets/logo.jpeg";

  let roomName: string = "";

  function handleSubmit() {
    window.location.href = `/${roomName}`;
  }
</script>

<div
  class="flex flex-col gap-4 justify-center items-center min-h-screen bg-[#081122]"
>
  <img src={Logo} alt="Logo" class="w-40" />

  <Card class="w-full max-w-lg bg-gray-800">
    <div class="space-y-6">
      <!-- Room Name Input -->
      <div class="space-y-2">
        <label for="roomName" class="block text-sm font-medium text-gray-300">
          Room Name
        </label>
        <Input
          id="roomName"
          bind:value={roomName}
          placeholder="Type room name here"
          class="bg-gray-700 border-gray-600 text-white"
        />
      </div>

      <!-- Create Button -->
      <Button on:click={handleSubmit} size="lg" class="w-full bg-gray-600 hover:bg-gray-500">
        <VideoCameraOutline class="w-5 h-5 mr-2" />
        CREATE / JOIN ROOM
      </Button>
    </div>
  </Card>
</div>
