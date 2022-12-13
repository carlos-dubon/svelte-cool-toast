<script lang="ts">
  import Toast from './Toast.svelte';
  import { toasts, type Placement, placement as placementStore } from './store';
  import type { SvelteComponent } from 'svelte';
  import { onMount } from 'svelte';

  export let contentComponent: typeof SvelteComponent | undefined = undefined;
  export let dismissComponent: typeof SvelteComponent | undefined = undefined;
  export let placement: Placement = 'bottom-right';

  onMount(() => {
    placementStore.set(placement);
  });
</script>

<slot />

<div class={`wrapper toast-${placement}`}>
  <div class={`toasts-container ${$toasts.length && 'toast-add-padding'}`}>
    {#each $toasts as toast (toast.id)}
      <Toast
        id={toast.id}
        {contentComponent}
        {dismissComponent}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        usePromise={toast.usePromise}
      />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    position: fixed;
    z-index: 100;
    width: 100%;
    display: flex;
    pointer-events: none;
  }

  .toast-bottom-right {
    bottom: 0;
    right: 0;
    justify-content: end;
  }

  .toast-bottom-left {
    bottom: 0;
    left: 0;
    justify-content: start;
  }

  .toast-bottom-center {
    bottom: 0;
    right: 0;
    justify-content: center;
  }

  .toast-top-left {
    top: 0;
    left: 0;
    justify-content: start;
  }

  .toast-top-right {
    top: 0;
    left: 0;
    justify-content: end;
  }

  .toast-top-center {
    top: 0;
    left: 0;
    justify-content: center;
  }

  .toasts-container {
    pointer-events: all;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
  }

  .toast-add-padding {
    padding: 1.25rem;
  }

  @media (min-width: 570px) {
    .toasts-container {
      width: fit-content;
    }
  }
</style>
