<script lang="ts">
  import ToastProvider from '$lib/ToastProvider.svelte';
  import { toast } from '$lib/toast';
  import '$lib/css/theme.css';
  import { wait } from '$lib/helpers/wait';
</script>

<ToastProvider placement="bottom-right">
  <div class="container">
    <button
      on:click={() => {
        toast("Here's your toast");
      }}
    >
      Normal
    </button>

    <button
      on:click={() => {
        toast('Successfully toasted!', {
          title: 'Success',
          type: 'success'
        });
      }}
    >
      Success
    </button>

    <button
      on:click={() => {
        toast("This didn't work.", {
          title: 'Error',
          type: 'error'
        });
      }}
    >
      Error
    </button>

    <button
      on:click={() => {
        toast('Something went wrong.', {
          title: 'Warning',
          type: 'warning'
        });
      }}
    >
      Warning
    </button>

    <button
      on:click={() => {
        toast(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta urna ac quam euismod efficitur. Cras id ante mauris.',
          {
            title: 'Long text'
          }
        );
      }}
    >
      Long text
    </button>

    <button
      on:click={() => {
        toast('Saving data.', {
          usePromise: {
            promise: wait(2000),
            error: 'Something went wrong.',
            success: {
              message: 'Success!',
              action: () => {
                setTimeout(() => {
                  toast('Success from success action!', {
                    type: 'success'
                  });
                }, 1000);
              }
            }
          }
        });
      }}
    >
      Promise
    </button>
  </div>
</ToastProvider>

<style>
  .container {
    display: flex;
    width: fit-content;
    flex-direction: column;
    gap: 0.4rem;
  }
</style>
