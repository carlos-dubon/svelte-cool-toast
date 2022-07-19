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
    }}
  >
    Normal toast with title
  </button>

  <button
    on:click={() => {
      toast('Hello', {
        title: 'Title',
        type: 'success'
      });
    }}
  >
    Type success
  </button>

  <button
    on:click={() => {
      toast('Hello', {
        title: 'Title',
        type: 'error'
      });
    }}
  >
    Type error
  </button>

  <button
    on:click={() => {
      toast('Hello', {
        title: 'Title',
        type: 'warning'
      });
    }}
  >
    Type warning
  </button>
</ToastProvider>
