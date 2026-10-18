import { reactive } from 'vue';

export const confirmState = reactive({ visible: false, message: '', resolve: null });

export function showConfirm(message) {
  return new Promise((resolve) => {
    confirmState.message = message;
    confirmState.resolve = resolve;
    confirmState.visible = true;
  });
}
