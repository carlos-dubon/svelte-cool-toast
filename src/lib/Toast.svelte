<script lang="ts">
  import { onMount } from 'svelte';
  import { wait } from './helpers/wait';
  import { fade, fly } from 'svelte/transition';

  import type { ToastType } from './toast';

  export let title = '';
  export let message = 'Toast example';
  export let duration = 3000;
  export let type: ToastType = 'normal';

  let visible = true;

  let isHovered = false;

  onMount(async () => {
    await wait(duration);

    if (!isHovered) {
      visible = false;
    }
  });
</script>

{#if visible}
  <div
    in:fly={{ x: 200, duration: 500 }}
    out:fade
    on:mouseenter={() => (isHovered = true)}
    on:mouseleave={async () => {
      isHovered = false;

      await wait(500);
      if (!isHovered) {
        visible = false;
      }
    }}
  >
    Hello
  </div>
{/if}
