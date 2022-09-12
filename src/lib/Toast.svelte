<script lang="ts">
  import CloseIcon from './icons/Close.svelte';
  import CheckmarkIcon from './icons/Checkmark.svelte';
  import InformationIcon from './icons/Information.svelte';
  import BanIcon from './icons/Ban.svelte';
  import WarningIcon from './icons/Warning.svelte';

  import { onMount } from 'svelte';
  import type { SvelteComponent } from 'svelte';
  import { wait } from './helpers/wait';

  import type { ToastType } from './toast';

  export let title = '';
  export let message = 'Toast example';
  export let duration = 2000;
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

  $: visible, console.log(visible);
</script>

<div
  class={`toast-container ${visible ? 'in' : 'out'}`}
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={async () => {
    isHovered = false;

    await wait(400);
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

<style>
  .toast-container {
    width: 100%;
    gap: 0.5rem;
  }

  .in {
    display: flex;
    animation-name: in;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .out {
    display: flex;
    position: relative;
    z-index: -1;
    animation-name: out;
    animation-duration: 350ms;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    animation-fill-mode: forwards;
  }

  @media (min-width: 640px) {
    .toast-container {
      width: 16rem;
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

  @keyframes in {
    0% {
      opacity: 0;
      transform: translateY(100%) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes out {
    from {
      opacity: 1;
      transform: translateY(0px) scale(1);
      visibility: visible;
      pointer-events: all;
    }
    to {
      opacity: 0;
      transform: translateY(110%) scale(0.6);
      visibility: hidden;
      pointer-events: none;
    }
  }
</style>
