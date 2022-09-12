<script lang="ts">
  import Toast from './Toast.svelte';
  import { toasts } from './store';
  import type { SvelteComponent } from 'svelte';

  export let contentComponent: typeof SvelteComponent | undefined = undefined;
  export let dismissComponent: typeof SvelteComponent | undefined = undefined;
</script>

<slot />

<div class="wrapper">
  <div class="toasts-container">
    {#each $toasts as toast}
      <Toast
        {contentComponent}
        {dismissComponent}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
      />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    position: fixed;
    bottom: 1.25rem;
    z-index: 100;
    width: 100%;
    display: flex;
    justify-content: end;
    pointer-events: none;
    @media (min-width: 640px) {
      .wrapper {
        right: 1.25rem;
      }
    }
  }

  .toasts-container {
    pointer-events: all;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    width: 100%;
  }

  @media (min-width: 570px) {
    .toasts-container {
      width: fit-content;
    }
  }
</style>
