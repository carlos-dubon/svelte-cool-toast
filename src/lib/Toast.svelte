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
    class="toast-container"
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
    <div class="toast-content">
      {#if title}
        <p class="toast-title">{title}</p>
      {/if}
      <p class="toast-message">
        {message}
      </p>
    </div>
    <div
      class="toast-remove"
      on:click={() => {
        visible = false;
      }}
    >
      x
    </div>
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  .toast-container {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    padding: 1rem;
    display: flex;
    gap: 0.5rem;
    background-color: #ffffff;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  @media (min-width: 640px) {
    .toast-container {
      width: 18rem;
    }
  }

  .toast-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .toast-content p {
    margin: 0;
  }

  .toast-content .toast-title {
    cursor: default;
    margin-bottom: 0.125rem;
  }

  .toast-content .toast-message {
    font-size: 0.875rem;
    color: rgb(55 65 81);
    line-height: 1.15rem;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .toast-remove {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
  }
</style>
