import { writable, type Writable } from 'svelte/store';
import type { ToastType } from './toast';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration: number;
}

const toasts: Writable<Toast[]> = writable([]);

export { toasts };
