<script lang="ts">
  import CloseIcon from './icons/Close.svelte';
  import CheckmarkIcon from './icons/Checkmark.svelte';
  import InformationIcon from './icons/Information.svelte';
  import BanIcon from './icons/Ban.svelte';
  import WarningIcon from './icons/Warning.svelte';

  import { onMount } from 'svelte';
  import type { SvelteComponent } from 'svelte';
  import { wait } from './helpers/wait';
  import { fade, fly } from 'svelte/transition';

  import type { ToastType } from './toast';

  export let title = '';
  export let message = 'Toast example';
  export let duration = 3000;
  export let type: ToastType = 'normal';

  export let contentComponent: typeof SvelteComponent | undefined;
  export let dismissComponent: typeof SvelteComponent | undefined;

  let visible = true;

  let isHovered = false;

  onMount(async () => {
    await wait(duration);

    if (!isHovered) {
      visible = false;
    }
  });

  const dismiss = () => {
    visible = false;
  };
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
    {#if contentComponent}
      <div class="toast-custom-content">
        <svelte:component
          this={contentComponent}
          props={{
            title,
            message,
            type
          }}
        />
      </div>
    {:else}
      <div class="toast-icon">
        {#if type == 'normal'}
          <InformationIcon />
        {:else if type == 'success'}
          <CheckmarkIcon />
        {:else if type == 'error'}
          <BanIcon />
        {:else if type == 'warning'}
          <WarningIcon />
        {/if}
      </div>
      <div class="toast-content">
        {#if title}
          <p class="toast-title">{title}</p>
        {/if}
        <p class="toast-message">
          {message}
        </p>
      </div>
    {/if}

    <div class="toast-dismiss">
      {#if dismissComponent}
        <div on:click={dismiss}>
          <svelte:component this={dismissComponent} />
        </div>
      {:else}
        <div class="toast-dismiss-button" on:click={dismiss}>
          <CloseIcon />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .toast-container {
    width: 100%;
    display: flex;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .toast-container {
      width: 18rem;
    }
  }

  .toast-icon {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
  }

  .toast-custom-content {
    width: 100%;
  }

  .toast-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .toast-content p {
    margin: 0;
  }

  .toast-dismiss {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
  }

  .toast-dismiss .toast-dismiss-button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background-color: #f4f4f4;
    transition: all 0.3s ease-in-out;
  }

  .toast-dismiss .toast-dismiss-button:hover {
    background-color: #f0f0f0;
  }
</style>
