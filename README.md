![svelte-cool-toast](https://socialify.git.ci/carlos-dubon/svelte-cool-toast/image?description=1&font=Raleway&forks=1&issues=1&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fcarlos-dubon%2Fsvelte-cool-toast%2Fc2af101829d66d624301a972edc63276db362268%2F.github%2Freadme%2Flogo.svg&name=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

<p align="center">
<img src="https://img.shields.io/npm/dt/svelte-cool-toast" alt="NPM downloads">
<img src="https://img.shields.io/bundlephobia/minzip/svelte-cool-toast" alt="Package size">
<img src="https://img.shields.io/github/license/carlos-dubon/svelte-cool-toast" alt="License">
</p>

## ✨ Features

- 👌 Zero-dependency
- 🪶 Lightweight
- ✏️ Custom components
- 🎨 Easily themable
- 📱 Mobile friendly

## ☀️ License

[MIT](./LICENSE)

## 📦 Installation

```
$ npm install svelte-cool-toast
```

## 🔨 Usage

Wrap your app with the `ToastProvider` component and then use the `toast` helper to create a new notification.

```Svelte
<script lang="ts">
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

```
