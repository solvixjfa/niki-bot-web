<template>
  <svg :class="className" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FBBF24" stroke="#B45309" stroke-width="2"/>
    <path d="M12 6L13.5 10.5H18L14.5 13.5L15.5 18L12 15L8.5 18L9.5 13.5L6 10.5H10.5L12 6Z" fill="#B45309"/>
  </svg>
</template>
<script setup>
defineProps({ className: { type: String, default: 'w-5 h-5' } })
</script>
