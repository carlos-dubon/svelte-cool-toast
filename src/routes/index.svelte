<script lang="ts">
  import ToastProvider from '$lib/ToastProvider.svelte';
  import { toast } from '$lib/toast';
  import '$lib/css/theme.css';
</script>

<ToastProvider>
  <button
    on:click={() => {
      toast('Hello', {
        title: 'Title'
      });
    }}>Toast</button
  >
</ToastProvider>
