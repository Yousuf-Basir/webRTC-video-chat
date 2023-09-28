<script>
  import { Button } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
</script>

<div class="image_upload_root">
  <h4>Add files</h4>
  <div class="image_upload_body">
    <Button pill color="alternative" class="w-10 h-10">
        <PlusOutline />
    </Button>
    <Button color="primary" pill>Send</Button>
  </div>
</div>

<style>
    .image_upload_root {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 10px 10px;
    }
    
    .image_upload_root h4 {
        font-size: 1.1rem;
        font-weight: 500;
        color: #1c64f1;
    }
    
    .image_upload_body {
        display: flex;
        flex-direction: row;
        gap: 10px;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>
