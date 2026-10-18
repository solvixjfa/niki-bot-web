import { reactive } from 'vue';

export const toastState = reactive({ visible: false, message: '', type: 'success' });

export function showToast(message, type = 'success') {
  toastState.message = message;
  toastState.type = type;
  toastState.visible = true;
  setTimeout(() => { toastState.visible = false; }, 3000);
}
