<h1 align="center">svelte-cool-toast 😎</h1>

<p align="center" style="font-size: 1.2rem">
  Cool toast notifications for Svelte.
</p>

<div align="center">
  <video
    src=".github/readme/svelte-cool-toast-demo.mp4"
    autoplay
    loop
  ></video>
</div>

<div align="center">
  <a
    href="https://svelte.dev/repl/46c3c3c8943e4752a380ce019fb99739?version=3.49.0"
  >
    <b style="font-size: 1.2rem">REPL Demo</b>
  </a>
</div>

<hr />

<img
  src="https://img.shields.io/github/stars/carlos-dubon/svelte-cool-toast?style=flat-square"
  alt="Stars"
/>
<img
  src="https://img.shields.io/github/forks/carlos-dubon/svelte-cool-toast?style=flat-square"
  alt="Forks"
/>
<img
  src="https://img.shields.io/github/issues/carlos-dubon/svelte-cool-toast?style=flat-square"
  alt="Issues"
/>
<img
  src="https://img.shields.io/npm/dt/svelte-cool-toast?style=flat-square"
  alt="NPM downloads"
/>
<img
  src="https://img.shields.io/github/license/carlos-dubon/svelte-cool-toast?style=flat-square"
  alt="License"
/>

## ✨ Features

- 👌 Zero-dependency
- 🪶 Lightweight
- ✏️ Custom components
- 🎨 Easily themable
- 📱 Mobile friendly

## 🔑 License

[MIT](./LICENSE)

## 📦 Installation

```
$ npm install svelte-cool-toast
```

## 🔨 Usage

Wrap your app with the `ToastProvider` component and then use the `toast` helper to create a new notification.

```Svelte
<script>
  import { ToastProvider, toast } from 'svelte-cool-toast';
  import "svelte-cool-toast/css/theme.css";
</script>

<ToastProvider placement="bottom-center">
  <button
    on:click={() => {
      toast('Successfully toasted!', {
        title: 'Title',
        duration: 5000,
        type: 'success'
      });
    }}
  >
    Make me a toast
  </button>
</ToastProvider>

```

With promises:

```Svelte
<script>
  import { ToastProvider, toast } from 'svelte-cool-toast';
  import "svelte-cool-toast/css/theme.css";
  import axios from "axios";
</script>

<ToastProvider placement="bottom-center">
  <button
    on:click={() => {
      toast('Saving data.', {
        usePromise: {
          promise: axios.post('/user', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          }),
          success: 'Success!'
          error: 'Something went wrong.',
        }
      });
    }}
  >
    Make me a toast
  </button>
</ToastProvider>

```

## 🍱 Custom components

If you want to render a custom content component simply pass the `contentComponent` prop to the `ToastProvider`.

```Svelte
<!-- MyContentComponent.svelte -->

<script lang="ts">
  import type { ToastType } from 'svelte-cool-toast';

  export let title = '';
  export let message = '';
  export let type: ToastType = 'normal';
  export let usePromise: UsePromise | null = null;
  export let resolvingPromise = true;
  export let promiseError = false;
</script>

<div>
  <h3>{title}</h3>
  <p>{type}</p>
  <p>{message}</p>
</div>

```

```Svelte
<!-- App.svelte -->

<script>
  import { ToastProvider, toast } from 'svelte-cool-toast';
  import "svelte-cool-toast/css/theme.css";

  import MyContentComponent from './MyContentComponent.svelte';
</script>

<ToastProvider contentComponent={MyContentComponent}>
  <button
    on:click={() => {
      toast("Here's your toast");
    }}
  >
    Make me a toast
  </button>
</ToastProvider>

```

Similarly if you want to change the default dismiss button you can pass your own `dismissComponent` prop to the `ToastProvider`.

```Svelte
<!-- MyDismissButton.svelte -->

<div>
  <p>Close</p>
</div>

```

```Svelte
<!-- App.svelte -->

<script>
  import { ToastProvider, toast } from 'svelte-cool-toast';
  import "svelte-cool-toast/css/theme.css";

  import MyDismissButton from './MyDismissButton.svelte';
</script>

<ToastProvider dismissComponent={MyDismissButton}>
  <button
    on:click={() => {
      toast("Here's your toast");
    }}
  >
    Make me a toast
  </button>
</ToastProvider>
```

## 🎨 Theming

You can use your own styles for the toast container by targeting the `.toast-container` class.

```Svelte
<!-- App.svelte -->

<script>
  import { ToastProvider, toast } from 'svelte-cool-toast';
</script>

<ToastProvider>
  <button
    on:click={() => {
      toast("Here's your toast");
    }}
  >
    Make me a toast
  </button>
</ToastProvider>

<style global>
  .toast-container {
    background-color: #9aeda7;
  }
</style>

```
