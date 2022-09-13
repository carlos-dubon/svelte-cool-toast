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
  import { toasts, placement } from './store';

  export let id = '';
  export let title = '';
  export let message = 'Toast example';
  export let duration = 2000;
  export let type: ToastType = 'normal';

  export let contentComponent: typeof SvelteComponent | undefined;
  export let dismissComponent: typeof SvelteComponent | undefined;

  let isPlacementBottom = true;

  $placement.includes('bottom') ? (isPlacementBottom = true) : (isPlacementBottom = false);

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

  let el: HTMLDivElement;

  onMount(() => {
    el.addEventListener('transitionend', () => {
      toasts.set($toasts.filter((t) => t.id != id));
    });
  });
</script>

<div
  class={`toast-container ${
    visible
      ? isPlacementBottom
        ? 'toast-in-bottom'
        : 'toast-in-top'
      : isPlacementBottom
      ? 'toast-out-bottom'
      : 'toast-out-top'
  }`}
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={async () => {
    isHovered = false;

    await wait(400);
    if (!isHovered) {
      visible = false;
    }
  }}
  bind:this={el}
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
    box-sizing: border-box;
    width: 100%;
    gap: 0.5rem;
  }

  .toast-in-bottom {
    display: flex;
    animation-name: in-bottom;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .toast-out-bottom {
    display: flex;
    position: relative;
    z-index: -1;
    animation-name: out-bottom;
    animation-duration: 350ms;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    animation-fill-mode: forwards;
  }

  .toast-in-top {
    display: flex;
    animation-name: in-top;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .toast-out-top {
    display: flex;
    position: relative;
    z-index: -1;
    animation-name: out-top;
    animation-duration: 350ms;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    animation-fill-mode: forwards;
  }

  @media (min-width: 640px) {
    .toast-container {
      width: 16.8rem;
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

  @keyframes in-bottom {
    0% {
      opacity: 0;
      transform: translateY(100%) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes out-bottom {
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

  @keyframes in-top {
    0% {
      opacity: 0;
      transform: translateY(-100%) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes out-top {
    from {
      opacity: 1;
      transform: translateY(0px) scale(1);
      visibility: visible;
      pointer-events: all;
    }
    to {
      opacity: 0;
      transform: translateY(-110%) scale(0.6);
      visibility: hidden;
      pointer-events: none;
    }
  }
</style>
