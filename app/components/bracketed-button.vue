<template>
  <button :disabled="props.disabled" @click="handleClick">
    <span>[</span>
    <slot></slot>
    <span>]</span>
  </button>
</template>

<script lang="ts" setup>

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'click',
])

function handleClick() {
  emit('click')
}

</script>

<style scoped>
button {
  font-size: 16px;
  font-family:'Courier New', Courier, monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
  padding: 4px 12px;
  border: none;
  cursor: pointer;
  transition: gap 0.2s ease-in-out, padding 0.2s ease-in-out;
}

button:hover, button:focus-visible {
  gap: 8px;
  padding: 4px 4px;
}

button:active {
  gap: 4px;
  padding: 4px 8px;
}

button:disabled {
  cursor: not-allowed;
}
</style>