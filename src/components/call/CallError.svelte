<script>
  import { Alert } from "flowbite-svelte";

  export let errorTitle;
  export let errorDescription;
</script>

<div>
  <Alert>
    <span class="font-medium">{errorTitle}</span>
    {errorDescription}
  </Alert>
</div>
