<template>
  <div class="ascii-divider" aria-hidden="true">
    {{ separator.repeat(300) }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  char: {
    type: String,
    default: '-',
  }
})

import { computed } from 'vue'

const separator = computed(() => {
    // Basic repetition, CSS handles overflow hidden
    return props.char
})

</script>

<style scoped>
.ascii-divider {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: var(--text-color-variant, #b37c49);
  user-select: none;
  margin: 1rem 0;
  font-family: 'Courier New', Courier, monospace;
}
</style>
