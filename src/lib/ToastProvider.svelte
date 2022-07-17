<script lang="ts">
  import Toast from './Toast.svelte';
  import { toasts } from './store';
</script>

<slot />

<div class="wrapper">
  <div class="toasts-container">
    {#each $toasts as toast}
      <Toast
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
    @media (min-width: 640px) {
      .wrapper {
        right: 1.25rem;
      }
    }
  }

  .toasts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    width: 100%;
  }

  @media (min-width: 640px) {
    .toasts-container {
      width: fit-content;
    }
  }
</style>
