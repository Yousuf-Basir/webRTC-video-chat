<script>
  export let size = 24;
  export let color = "#434343";
  export let isMaximized = false;
</script>

<div>
  {#if isMaximized}
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />

      <g id="Complete">
        <g id="minimize">
          <g>
            <path
              d="M8,3V6A2,2,0,0,1,6,8H3"
              fill="none"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />

            <path
              d="M16,21V18a2,2,0,0,1,2-2h3"
              fill="none"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />

            <path
              d="M8,21V18a2,2,0,0,0-2-2H3"
              fill="none"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />

            <path
              d="M16,3V6a2,2,0,0,0,2,2h3"
              fill="none"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </g>
        </g>
      </g>
    </svg>
  {:else}
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 7V2H7"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 7V2H17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 22L2 22L2 17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 22L22 22L22 17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {/if}
</div>
