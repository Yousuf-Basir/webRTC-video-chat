<script>
  import { Button } from "flowbite-svelte";
  import VideoSvg from "../svg/VideoSvg.svelte";
  import EditSvg from "../svg/EditSvg.svelte";
  import ChatSvg from "../svg/ChatSvg.svelte";
  import LocationSvg from "../svg/LocationSvg.svelte";
</script>

<div class="bottom_nav_root">
  <div class="bottom_nav_item">
    <Button pill={true} color="none" class="w-10 h-10">
      <LocationSvg size={24} color="#2563eb" />
    </Button>
  </div>

  <div class="bottom_nav_item">
    <Button pill={true} color="none" class="w-10 h-10">
      <EditSvg size={24} color="#2563eb" />
    </Button>
  </div>
  
  <div class="bottom_nav_item">
    <Button pill={true} color="none" class="w-10 h-10">
      <VideoSvg size={24} color="#2563eb" />
    </Button>
  </div>

  <div class="bottom_nav_item">
    <Button pill={true} color="none" class="w-10 h-10">
      <ChatSvg size={24} color="#2563eb" />
    </Button>
  </div>
</div>

<style>
  .bottom_nav_root {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    height: calc(var(--bottom_nav_height) - 20px);
    gap: 40px;
  }
</style>
