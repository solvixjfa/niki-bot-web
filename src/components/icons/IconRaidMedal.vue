<template>
  <svg :class="className" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#60A5FA" stroke="#1D4ED8" stroke-width="2"/>
    <path d="M12 6L13.5 10.5H18L14.5 13.5L15.5 18L12 15L8.5 18L9.5 13.5L6 10.5H10.5L12 6Z" fill="#1D4ED8"/>
  </svg>
</template>
<script setup>
defineProps({ className: { type: String, default: 'w-5 h-5' } })
</script>
