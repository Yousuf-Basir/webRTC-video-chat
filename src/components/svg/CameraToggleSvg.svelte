<script>
  export let size = 24;
  export let color = "#000000";
  export let isCameraOn = true;
</script>

<div>
  <svg
    style={`
        width: ${size}px; 
        height: ${size}px;
    `}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {#if isCameraOn}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.342 4.985c.422-.724.633-1.085.927-1.348a2.5 2.5 0 0 1 .898-.516C9.542 3 9.96 3 10.797 3h2.405c.838 0 1.256 0 1.631.121a2.5 2.5 0 0 1 .898.516c.294.263.505.624.927 1.348L17.25 6H18c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C22 7.9 22 8.6 22 10v6c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C20.1 20 19.4 20 18 20H6c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 18.1 2 17.4 2 16v-6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 6 4.6 6 6 6h.75l.592-1.015zM12 17.05a4.75 4.75 0 1 0 0-9.5 4.75 4.75 0 0 0 0 9.5zm2.7-4.75a2.7 2.7 0 1 1-5.4 0 2.7 2.7 0 0 1 5.4 0z"
        fill={color}
      />
    {:else}
      <path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m3 3 18 18"
      />
      <path
        fill={color}
        fill-rule="evenodd"
        d="M5.172 6H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14c.35 0 .688-.06 1-.17l-5.087-5.089a4 4 0 1 1-5.654-5.654L5.172 6zm5.502 5.503a2 2 0 1 0 2.823 2.823l-2.823-2.823zM22 17.172V9a3 3 0 0 0-3-3h-.93a1 1 0 0 1-.832-.445l-.812-1.22A3 3 0 0 0 13.93 3h-3.86a3 3 0 0 0-1.708.534L22 17.172z"
        clip-rule="evenodd"
      />
    {/if}
  </svg>
</div>
