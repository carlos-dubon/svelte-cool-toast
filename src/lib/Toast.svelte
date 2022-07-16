<script lang="ts">
  import type { ToastType } from './toast';

  export let title = '';
  export let message = 'Toast example';
  export let duration = 3000;
  export let type: ToastType = 'normal';

  let visible = true;

  let isHovered = false;
</script>

{#if visible}{/if}
