<script lang="ts">
  import ToastProvider from '$lib/ToastProvider.svelte';
  import { toast } from '$lib/toast';
</script>

<ToastProvider>
  <button
    on:click={() => {
      toast('Hello');
    }}>Toast</button
  >
</ToastProvider>
