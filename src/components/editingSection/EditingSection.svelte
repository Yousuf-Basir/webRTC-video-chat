<script>
  import { Button, SpeedDialButton } from "flowbite-svelte";
  import { CloseOutline, ArrowRightBigOutline, ShareNodesSolid } from "flowbite-svelte-icons";
  import SendSvg from "../svg/SendSvg.svelte";
  import FullscreenToggleSvg from "../svg/FullscreenToggleSvg.svelte";
</script>

<div class="editing_section_root">
  <div class="title_bar">
    <div>
      <span>Editing section</span>
    </div>

    <div>
      <!-- close button -->
      <Button pill={true} color="none" class="w-10 h-10">
        <FullscreenToggleSvg size={24} color="#2563eb" />
      </Button>
    </div>
  </div>

  <div class="editing_section_body">
    
  </div>
</div>

<style>
  .editing_section_root {
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
    padding: 10px 10px 10px 20px;
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

  .editing_section_body {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: #f2f2f2;
  }
</style>
