import { get } from 'svelte/store';
import { toasts, placement } from './store';

export type ToastType = 'normal' | 'success' | 'warning' | 'error';
export interface PromiseAction {
  message: string;
  action?: () => Promise<void> | void;
}
export interface UsePromise {
  promise: Promise<unknown>;
  success: string | PromiseAction;
  error: string | PromiseAction;
}

interface Options {
  title?: string;
  type?: ToastType;
  duration?: number;
  usePromise?: UsePromise;
}

const toast = (message: string, options?: Options) => {
  const prevToasts = get(toasts);

  const toastId = crypto.randomUUID();

  const newToast = {
    id: toastId,
    type: options?.type || 'normal',
    title: options?.title,
    message: message,
    duration: options?.duration || 3000,
    usePromise: options?.usePromise
  };

  if (get(placement).includes('bottom')) {
    toasts.set([...prevToasts, newToast]);
  } else {
    toasts.set([newToast, ...prevToasts]);
  }
};

export { toast };
