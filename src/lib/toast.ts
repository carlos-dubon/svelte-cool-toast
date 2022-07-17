import { get } from 'svelte/store';
import { toasts } from './store';

export type ToastType = 'normal' | 'success' | 'warning' | 'error';

interface Options {
  title?: string;
  type?: ToastType;
  duration?: number;
}

const toast = (message: string, options?: Options) => {
  const prevToasts = get(toasts);

  const toastId = crypto.randomUUID();

  toasts.set([
    ...prevToasts,
    {
      id: toastId,
      type: options?.type || 'normal',
      title: options?.title,
      message: message,
      duration: options?.duration || 3000
    }
  ]);
};

export { toast };
