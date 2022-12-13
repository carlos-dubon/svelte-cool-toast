import { writable, type Writable } from 'svelte/store';
import type { ToastType, UsePromise } from './toast';
export type Placement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration: number;
  usePromise?: UsePromise;
}

const toasts: Writable<Toast[]> = writable([]);
const placement: Writable<Placement> = writable('bottom-right');

export { toasts, placement };
