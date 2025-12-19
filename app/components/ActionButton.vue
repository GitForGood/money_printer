<template>
  <button
    :type="type"
    class="bracketed-base"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <BaseBracketed><slot /></BaseBracketed>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>
