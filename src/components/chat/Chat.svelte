<script>
  import { Button } from "flowbite-svelte";
  import { CloseOutline, ArrowRightBigOutline } from "flowbite-svelte-icons";
  import SendSvg from "../svg/SendSvg.svelte";
</script>

<div class="chat_root">
  <div class="title_bar">
    <div>
      <span>Chat</span>
    </div>

    <div>
      <!-- close button -->
      <Button pill={true} color="none" class="w-10 h-10">
        <CloseOutline size="xs" color="#2563eb" />
      </Button>
    </div>
  </div>

  <div class="chat_body">
    <div class="chat_messages_root" />
    <div class="chat_input_root">
      <input type="text" class="message_input" placeholder="Type a message" />
      <Button pill={true} color="blue" class="w-10 h-10">
        <SendSvg size={18} color="#ffffff" />
      </Button>
    </div>
  </div>
</div>

<style>
  .chat_root {
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

  .chat_body {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: #F2F2F2;
  }

  .chat_messages_root {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-y: auto;
  }

  .chat_input_root {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    gap: 10px;
  }

  .message_input {
    flex: 1;
    padding: 14px;
    border-radius: 100px;
    border: none;
    font-size: small;
    outline: none;
    height: 44px;
  }

  .message_input::placeholder {
    color: rgb(127, 127, 127);
  }

  .message_input:focus {
    border: 1px solid rgb(7, 152, 255);
  }
</style>
